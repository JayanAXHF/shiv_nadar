from transformers import AutoTokenizer, AutoModelForCausalLM
import torch
from huggingface_hub import login


login(token="xxx")
test = "Describe the economic conditions in France that led to the turmoil during the French Revolution."

# Load the tokenizer (ensure it is saved in the main directory)
base_model_name = "Qwen/Qwen3-0.6B"
tokenizer = AutoTokenizer.from_pretrained(base_model_name)
tokenizer.save_pretrained(
    "./llama-3_2Instruct-science-finetuned"
)  # Save tokenizer to the main directory

# Load the fine-tuned model from the latest checkpoint
model_ncert = AutoModelForCausalLM.from_pretrained(
    "llama-3_2Instruct-science-finetuned/checkpoint-4992",
    torch_dtype=torch.float16,
    # use_safetensors=True,
)

model_circular = AutoModelForCausalLM.from_pretrained(
    "llama-3_2Instruct-science-finetuned/checkpoint-4992"
)

# Set the model to evaluation mode
model_ncert.eval()
model_ncert.to("cuda" if torch.cuda.is_available() else "mps")

model_circular.eval()
model_circular.to("cuda" if torch.cuda.is_available() else "cpu")


def eval_ncert(prompt, max_length=128, temperature=0.6):
    input_text = f"Q: {prompt}\nA:"
    input_ids = tokenizer(input_text, return_tensors="pt").input_ids.to(
        model_ncert.device
    )

    # Generate the answer
    with torch.no_grad():
        output_ids = model_ncert.generate(
            input_ids,
            max_length=max_length,
            num_return_sequences=1,
            temperature=temperature,  # Controls randomness (0.7 is balanced)
            top_p=0.9,  # Nucleus sampling
            do_sample=True,  # Enable sampling for creativity
        )

    # Decode and display the answer
    answer = tokenizer.decode(output_ids[0], skip_special_tokens=True)

    return {"response": answer.split("A:")[-1].strip()}


def eval_circular(prompt, max_length=128, temperature=0.6):
    input_text = f"Q: {prompt}\nA:"
    input_ids = tokenizer(input_text, return_tensors="pt").input_ids.to(
        model_circular.device
    )

    # Generate the answer
    with torch.no_grad():
        output_ids = model_circular.generate(
            input_ids,
            max_length=max_length,
            num_return_sequences=1,
            temperature=temperature,  # Controls randomness (0.7 is balanced)
            top_p=0.9,  # Nucleus sampling
            do_sample=True,  # Enable sampling for creativity
        )

    # Decode and display the answer
    answer = tokenizer.decode(output_ids[0], skip_special_tokens=True)
    return {"response": answer.split("A:")[-1].strip()}
