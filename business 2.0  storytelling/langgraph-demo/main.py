from typing import TypedDict
from langgraph.graph import StateGraph, START, END

class State(TypedDict):
    text: str

def add_a(state: State) -> State:
    return {"text": state["text"] + "a"}

def add_b(state: State) -> State:
    return {"text": state["text"] + "b"}

builder = StateGraph(State)
builder.add_node("add_a", add_a)
builder.add_node("add_b", add_b)

builder.add_edge(START, "add_a")
builder.add_edge("add_a", "add_b")
builder.add_edge("add_b", END)

graph = builder.compile()

result = graph.invoke({"text": ""})
print(result)  # expected: {'text': 'ab'}