from fastapi import FastAPI

from app.auth.routes import router as auth_router
from app.resume.routes import router as resume_router
from app.interview.routes import router as interview_router


app = FastAPI(
    title="AI Interview Platform API",
    description="Backend API for AI-powered interview preparation",
    version="1.0.0"
)


app.include_router(auth_router)
app.include_router(resume_router)
app.include_router(interview_router)


@app.get("/")
def root():
    return {
        "message": "AI Interview Platform API is running!"
    }


@app.get("/health")
def health_check():
    return {
        "status": "healthy"
    }