from transformers import AutoTokenizer, AutoModelForCausalLM, Trainer, TrainingArguments
from datasets import load_dataset
import torch

# Load the dataset
dataset = load_dataset("KadamParth/NCERT_Science_9th")

if "validation" not in dataset:
    dataset = dataset["train"].train_test_split(test_size=0.1)
    print("Dataset split into 90% train and 10% validation.")
# Load GPT-2 Medium model and tokenizer
model_name = "meta-llama/Llama-3.2-1B"
tokenizer = AutoTokenizer.from_pretrained(model_name)
model = AutoModelForCausalLM.from_pretrained(
    model_name,
    device_map="auto",  # Use GPU if available
    torch_dtype=torch.float16 if torch.cuda.is_available() else torch.float32
)
tokenizer.pad_token = tokenizer.eos_token
model.config.pad_token_id = tokenizer.eos_token_id
# Tokenize the dataset (using Explanation column)
def tokenize_function(examples):
    tokens = tokenizer(examples["Explanation"], 
                       truncation=True, 
                       padding="max_length", 
                       max_length=128)
    tokens["labels"] = tokens["input_ids"].copy()  # Set labels as a copy of input_ids
    return tokens

tokenized_datasets = dataset.map(tokenize_function, batched=True, remove_columns=["Explanation"])
# Set training arguments
training_args = TrainingArguments(
    output_dir=".llama-finetuned",
    # evaluation_strategy="epoch",
    per_device_train_batch_size=4,  # Adjust for your system
    per_device_eval_batch_size=4,
    learning_rate=5e-5,
    weight_decay=0.01,
    num_train_epochs=3,
    fp16=torch.cuda.is_available(),  # Mixed precision training if GPU available
    save_strategy="epoch",
    logging_dir="./logs",
    push_to_hub=False,
)

# Trainer setup
trainer = Trainer(
    model=model,
    args=training_args,
    train_dataset=tokenized_datasets["train"],
    eval_dataset=tokenized_datasets["test"],  # The split test is used as validation
)

# Start training
trainer.train()
