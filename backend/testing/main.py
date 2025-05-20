# Load model directly
from transformers import AutoModel

model = AutoModel.from_pretrained("ParthKadam2003/Gemma-9B-NCERT-lora_model")
tokenizer = AutoModel.from_pretrained(
    "ParthKadam2003/Gemma-9B-NCERT-lora_model"
).tokenizer

# use model
question = "What is plasmolysis?"
input_ids = tokenizer(question, return_tensors="pt").input_ids
output = model(input_ids)
print(output)
