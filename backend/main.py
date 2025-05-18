from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from transformers import pipeline
from fastapi.middleware.cors import CORSMiddleware

generator = pipeline("text-generation", model="gpt2")


# Define the input schema
class PromptRequest(BaseModel):
    prompt: str
    max_length: int = 4096
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
@app.post("/generate")
def generate_text(request: PromptRequest):
    #  if not request.prompt.strip():
    #      raise HTTPException(status_code=400, detail="Prompt cannot be empty")

    result = generator(
        request.prompt,
        max_length=request.max_length,
        temperature=request.temperature,
        do_sample=True,
    )

    return {"response": result[0]["generated_text"]}
