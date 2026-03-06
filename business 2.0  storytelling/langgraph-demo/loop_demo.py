from typing import TypedDict
from langgraph.graph import StateGraph, START, END

class State(TypedDict, total=False):
    n: int
    done: bool

def step(state: State) -> State:
    n = state.get("n", 0) + 1
    return {"n": n, "done": n >= 3}

def decide(state: State) -> str:
    return "end" if state["done"] else "repeat"

builder = StateGraph(State)
builder.add_node("step", step)

builder.add_edge(START, "step")
builder.add_conditional_edges("step", decide, {"repeat": "step", "end": END})

graph = builder.compile()
print(graph.invoke({"n": 0}))