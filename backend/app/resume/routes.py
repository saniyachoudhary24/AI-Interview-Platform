from fastapi import (
    APIRouter,
    Depends,
    UploadFile,
    File,
    HTTPException,
    status
)
from sqlalchemy.orm import Session
from pypdf import PdfReader
from io import BytesIO

from app.database import get_db
from app.models.user import User
from app.auth.security import get_current_user_id


router = APIRouter(
    prefix="/resume",
    tags=["Resume"]
)


@router.post("/upload")
async def upload_resume(
    file: UploadFile = File(...),
    user_id: int = Depends(get_current_user_id),
    db: Session = Depends(get_db)
):
    # --------------------------------------------------------
    # 1. Check file type
    # --------------------------------------------------------

    if file.content_type != "application/pdf":
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Only PDF files are allowed"
        )

    # --------------------------------------------------------
    # 2. Read uploaded file
    # --------------------------------------------------------

    file_bytes = await file.read()

    if not file_bytes:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Uploaded file is empty"
        )

    # --------------------------------------------------------
    # 3. Extract text from PDF
    # --------------------------------------------------------

    try:
        pdf_file = BytesIO(file_bytes)
        reader = PdfReader(pdf_file)

        extracted_text = ""

        for page in reader.pages:
            page_text = page.extract_text()

            if page_text:
                extracted_text += page_text + "\n"

    except Exception:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Could not read the PDF file"
        )

    # --------------------------------------------------------
    # 4. Check extracted text
    # --------------------------------------------------------

    if not extracted_text.strip():
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Could not extract text from the PDF"
        )

    # --------------------------------------------------------
    # 5. Find logged-in user
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
    # 6. Save resume text in database
    # --------------------------------------------------------

    user.resume_text = extracted_text

    db.commit()
    db.refresh(user)

    # --------------------------------------------------------
    # 7. Return response
    # --------------------------------------------------------

    return {
        "message": "Resume uploaded successfully",
        "filename": file.filename,
        "user_id": user.id,
        "text_length": len(extracted_text),
        "resume_text": extracted_text
    }