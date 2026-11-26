from sqlalchemy import (
    Column,
    Integer,
    String,
    Float,
    DateTime,
    ForeignKey
)

from sqlalchemy.orm import relationship
from datetime import datetime

from app.database import Base


class Interview(Base):
    __tablename__ = "interviews"

    id = Column(
        Integer,
        primary_key=True,
        index=True
    )

    user_id = Column(
        Integer,
        ForeignKey("users.id"),
        nullable=False
    )

    role = Column(
        String(100),
        nullable=False
    )

    status = Column(
        String(50),
        default="in_progress"
    )

    overall_score = Column(
        Float,
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

    started_at = Column(
        DateTime,
        default=datetime.utcnow
    )

    completed_at = Column(
        DateTime,
        nullable=True
    )

    user = relationship(
        "User",
        back_populates="interviews"
    )

    questions = relationship(
        "Question",
        back_populates="interview",
        cascade="all, delete-orphan"
    )