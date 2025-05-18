from fastapi import FastAPI
from typing import Union


def main():
    print("Hello from backend!")


app = FastAPI()


def gen_output(text: str):
    # EDIT THIS RACHIT
    return text


@app.get("/request")
def request(text: Union[str, None] = None):
    response = gen_output(text)
    return {"response": response}
