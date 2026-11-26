import os

from dotenv import load_dotenv
from google import genai
from google.genai import types


# Load variables from .env
load_dotenv()


# Get Gemini API key
GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")

if not GEMINI_API_KEY:
    raise ValueError("GEMINI_API_KEY is not set in .env")


# Create Gemini client
client = genai.Client(
    api_key=GEMINI_API_KEY
)


def generate_text(prompt: str) -> str:
    """
    Send a text prompt to Gemini and return the generated response.
    """

    response = client.models.generate_content(
        model="gemini-3.6-flash",
        contents=prompt,
        config=types.GenerateContentConfig(
            automatic_function_calling=types.AutomaticFunctionCallingConfig(
                disable=True
            ),
            temperature=0.2,
            max_output_tokens=1000
        )
    )

    return response.text


def analyze_resume(resume_text: str) -> str:
    """
    Analyze resume text using Gemini.
    """

    prompt = f"""
Analyze this resume and provide a concise candidate profile.

Include:

- Education
- Technical skills
- Programming languages
- Frameworks and libraries
- Projects
- Experience
- Suitable job roles

Resume:
{resume_text}
"""

    return generate_text(prompt)