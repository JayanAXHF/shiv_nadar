from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from transformers import pipeline
from fastapi.middleware.cors import CORSMiddleware
from fastapi import FastAPI
from typing import Union
from llm import eval_circular, eval_ncert


# Define the input schema
class PromptRequest(BaseModel):
    prompt: str
    max_length: int = 128
    temperature: float = 0.7


# Create FastAPI app
app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Or ["http://localhost:3000"] to restrict
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Load the generator model


# Define a route
@app.post("/generate/ncert")
def generate_text(request: PromptRequest):
    if not request.prompt.strip():
        raise HTTPException(status_code=400, detail="Prompt cannot be empty")

    result = eval_ncert(
        request.prompt,
        max_length=request.max_length,
        temperature=request.temperature,
    )
    return result


@app.post("/generate/circular")
def ncert_text(request: PromptRequest):
    if not request.prompt.strip():
        raise HTTPException(status_code=400, detail="Prompt cannot be empty")

    result = eval_circular(
        request.prompt,
        max_length=request.max_length,
        temperature=request.temperature,
    )

    return result
