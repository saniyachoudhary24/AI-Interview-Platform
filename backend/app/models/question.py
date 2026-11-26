from sqlalchemy import (
    Column,
    Integer,
    String,
    Float,
    Text,
    DateTime,
    ForeignKey
)

from sqlalchemy.orm import relationship
from datetime import datetime

from app.database import Base


class Question(Base):
    __tablename__ = "questions"

    id = Column(
        Integer,
        primary_key=True,
        index=True
    )

    interview_id = Column(
        Integer,
        ForeignKey("interviews.id"),
        nullable=False
    )

    question_number = Column(
        Integer,
        nullable=False
    )

    question_text = Column(
        Text,
        nullable=False
    )

    difficulty = Column(
        String(50),
        nullable=True
    )

    topic = Column(
        String(100),
        nullable=True
    )

    answer_text = Column(
        Text,
        nullable=True
    )

    technical_score = Column(
        Float,
        nullable=True
    )

    relevance_score = Column(
        Float,
        nullable=True
    )

    completeness_score = Column(
        Float,
        nullable=True
    )

    communication_score = Column(
        Float,
        nullable=True
    )

    overall_score = Column(
        Float,
        nullable=True
    )

    feedback = Column(
        Text,
        nullable=True
    )

    created_at = Column(
        DateTime,
        default=datetime.utcnow
    )

    interview = relationship(
        "Interview",
        back_populates="questions"
    )