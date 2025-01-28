import React, { useEffect, useRef, useState } from "react";
import * as d3 from "d3";

type Node = {
  id: number;
  color?: string;
  name: string;
};

type Link = {
  source: number | Node;
  target: number | Node;
  value?: number;
};

type GraphData = {
  nodes: Node[];
  links: Link[];
};

const ForceDirectedGraph: React.FC = () => {
  const svgRef = useRef<SVGSVGElement | null>(null);
  const [data, setData] = useState<GraphData | null>(null);
  const [dimensions, setDimensions] = useState({ width: 800, height: 600 });

  // Update dimensions based on window size
  useEffect(() => {
    const updateDimensions = () => {
      setDimensions({
        width: window.innerWidth ,
        height: window.innerHeight,
      });
    };

    window.addEventListener("resize", updateDimensions);
    updateDimensions(); // Set initial dimensions

    return () => {
      window.removeEventListener("resize", updateDimensions);
    };
  }, []);

  // Fetch the nodes and edges data
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Replace with your actual API endpoint
        const response = await fetch("http://127.0.0.1:8000/api/graph-data");
        const json = await response.json();

        const nodes: Node[] = json.nodes.map((node: { color: string; name: string }, index: number) => ({
          id: index,
          ...node,
        }));

        const links: Link[] = json.edges.map(([source, target]: [number, number]) => ({
          source,
          target,
        }));

        setData({ nodes, links });
      } catch (error) {
        console.error("Error fetching graph data:", error);
      }
    };

    fetchData();
  }, []);

  // Draw the graph using D3.js
  useEffect(() => {
    if (!data || !svgRef.current) return;

    const svg = d3.select(svgRef.current);
    svg.selectAll("*").remove(); // Clear any existing content

    const { width, height } = dimensions;

    const simulation = d3
      .forceSimulation<Node>(data.nodes)
      .force("link", d3.forceLink<Node, Link>(data.links).id(d => d.id).distance(100))
      .force("charge", d3.forceManyBody().strength(-200))
      .force("center", d3.forceCenter(width / 2, height / 2))
      .force("x", d3.forceX(width / 2).strength(0.07))
      .force("y", d3.forceY(height / 2).strength(0.07));

    // Draw links
    const link = svg
      .append("g")
      .attr("stroke", "#999")
      .attr("stroke-opacity", 0.6)
      .selectAll("line")
      .data(data.links)
      .join("line")
      .attr("stroke-width", d => Math.sqrt(d.value || 1));

    // Draw nodes
    const node = svg
      .append("g")
      .attr("stroke", "#fff")
      .attr("stroke-width", 0.3)
      .selectAll<SVGCircleElement, Node>("circle")
      .data(data.nodes)
      .join("circle")
      .attr("r", 5)
      .attr("fill", d => d.color || "steelblue")
      .call(
        d3.drag<SVGCircleElement, Node>()
          .on("start", (event, d) => {
            if (!event.active) simulation.alphaTarget(0.3).restart();
            d.fx = d.x;
            d.fy = d.y;
          })
          .on("drag", (event, d) => {
            d.fx = event.x;
            d.fy = event.y;
          })
          .on("end", (event, d) => {
            if (!event.active) simulation.alphaTarget(0);
            d.fx = null;
            d.fy = null;
          })
      );

    node.append("title").text(d => d.name);

    simulation.on("tick", () => {
      link
        .attr("x1", d => (d.source as Node).x || 0)
        .attr("y1", d => (d.source as Node).y || 0)
        .attr("x2", d => (d.target as Node).x || 0)
        .attr("y2", d => (d.target as Node).y || 0);

      node.attr("cx", d => d.x || 0).attr("cy", d => d.y || 0);
    });

    return () => {
      simulation.stop();
    };
  }, [data, dimensions]);

  return <svg ref={svgRef} width={dimensions.width} height={dimensions.height}></svg>;
};

export default ForceDirectedGraph;
