from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import random

app = FastAPI()

# def random_color():
#     # Blue component is between 0 (darkest) and 255 (brightest)
#     blue = random.randint(0, 255)
#     # Red and Green components are always 0
#     return f"#{0:02x}{0:02x}{blue:02x}"

# Allow requests from your React app
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],  # Update with your React app's URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# Generate 100 nodes
# nodes = [{"name": f"Node {i}", "color": random_color()} for i in range(20)]
# nodes += [{"name": f"Node {20+i}", "color": random_color()} for i in range(20)]
# nodes += [{"name": f"Node {40+i}", "color": random_color()} for i in range(20)]

# Generate 3000 random edges
# edges = [(random.randint(0, 19), random.randint(0, 19)) for _ in range(300)]
# edges += [(random.randint(20, 39), random.randint(20, 39)) for _ in range(300)]
# edges += [(random.randint(40, 59), random.randint(40, 59)) for _ in range(300)]
# edges += [(1,20), (2,21), (40, 1), (41, 20)]
import json
with open("edges.json", "r") as e:
    d = e.read()
    edges = json.loads(d)
    edges = list(map(lambda x: x["nodes"], edges))

with open("nodes.json", "r") as e:
    d = e.read()
    nodes = json.loads(d)

graph_data = {
    "nodes": nodes,
    "edges": edges,
}
# Mock data for the graph

@app.get("/api/graph-data")
async def get_graph_data():
    return graph_data
