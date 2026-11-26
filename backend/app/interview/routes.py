

from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from app.database import get_db
from app.models import User, Interview, Question
from app.auth.security import get_current_user_id
from app.ai.gemini import generate_text


router = APIRouter(
    prefix="/interview",
    tags=["Interview"]
)


@router.post("/start")
def start_interview(
    user_id: int = Depends(get_current_user_id),
    db: Session = Depends(get_db)
):
    # --------------------------------------------------------
    # 1. Find the logged-in user
    # --------------------------------------------------------

    user = (
        db.query(User)
        .filter(User.id == user_id)
        .first()
    )

    if not user:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="User not found"
        )

    # --------------------------------------------------------
    # 2. Check whether resume exists
    # --------------------------------------------------------

    if not user.resume_text:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Please upload your resume before starting an interview"
        )

    # --------------------------------------------------------
    # 3. Create a new interview
    # --------------------------------------------------------

    interview = Interview(
        user_id=user.id,
        role=user.target_role or "Software Engineer",
        status="in_progress"
    )

    db.add(interview)
    db.commit()
    db.refresh(interview)

    # --------------------------------------------------------
    # 4. Create prompt for Gemini
    # --------------------------------------------------------

    prompt = f"""
You are an AI technical interviewer.

Analyze the candidate's resume below and generate ONE
personalized interview question.

Candidate target role:
{user.target_role or "Software Engineer"}

Candidate resume:
{user.resume_text}

Requirements:
- Ask exactly ONE interview question.
- The question should be relevant to the candidate's resume.
- Focus on technical skills, projects, education, or experience.
- Do not provide the answer.
- Do not provide explanations.
- Return only the interview question.
"""

    # --------------------------------------------------------
    # 5. Ask Gemini to generate the question
    # --------------------------------------------------------

    try:
        question_text = generate_text(prompt).strip()

        if not question_text:
            raise ValueError("Gemini returned an empty question")

    except Exception as e:
        # Remove the interview if Gemini fails
        db.delete(interview)
        db.commit()

        print("GEMINI ERROR:", repr(e))

        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Gemini error: {str(e)}"
        )

    # --------------------------------------------------------
    # 6. Save question in database
    # --------------------------------------------------------

    question = Question(
        interview_id=interview.id,
        question_number=1,
        question_text=question_text,
        difficulty="medium",
        topic="resume_based"
    )

    db.add(question)
    db.commit()
    db.refresh(question)

    # --------------------------------------------------------
    # 7. Return interview information
    # --------------------------------------------------------

    return {
        "message": "Interview started successfully",
        "interview_id": interview.id,
        "question_id": question.id,
        "question_number": question.question_number,
        "question": question.question_text,
        "difficulty": question.difficulty,
        "topic": question.topic
    }
