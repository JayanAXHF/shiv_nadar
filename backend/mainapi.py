from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from transformers import pipeline

# Define the input schema
class PromptRequest(BaseModel):
    prompt: str
    max_length: int = 50
    temperature: float = 0.7

# Create FastAPI app
app = FastAPI()

# Load the generator model
generator = pipeline("text-generation", model="gpt2")

# Define a route
@app.post("/generate")
def generate_text(request: PromptRequest):
    if not request.prompt.strip():
        raise HTTPException(status_code=400, detail="Prompt cannot be empty")

    result = generator(
        request.prompt,
        max_length=request.max_length,
        temperature=request.temperature,
        do_sample=True,
    )

    return {"response": result[0]["generated_text"]}
