from typing import TypedDict, Literal
from langgraph.graph import StateGraph, START, END

class State(TypedDict, total=False):
    user_input: str
    route: Literal["short", "long"]
    output: str

def router(state: State) -> State:
    txt = state["user_input"]
    return {"route": "long" if len(txt) > 10 else "short"}

def short_answer(state: State) -> State:
    return {"output": f"SHORT: {state['user_input']}"}

def long_answer(state: State) -> State:
    return {"output": f"LONG: {state['user_input']} (more detail here...)"}

def pick_next(state: State) -> str:
    return state["route"]

builder = StateGraph(State)
builder.add_node("router", router)
builder.add_node("short", short_answer)
builder.add_node("long", long_answer)

builder.add_edge(START, "router")
builder.add_conditional_edges("router", pick_next, {"short": "short", "long": "long"})
builder.add_edge("short", END)
builder.add_edge("long", END)

graph = builder.compile()

print(graph.invoke({"user_input": "hi"}))
print(graph.invoke({"user_input": "explain langgraph routing"}))