import { useEffect, useRef } from "react";
import * as d3 from "d3";

interface Node {
  id: number;
  name: string;
  color?: string;
  x?: number;
  y?: number;
  fx?: number | null;
  fy?: number | null;
}

interface Edge {
  source: number;
  target: number;
  color?: string;
}

interface props {
  nodes: Node[];
  edges: Edge[];
  dimensions: { width: number; height: number };
  onNodeClick: (node: Node) => void;
}

function graphSimulation({
  nodes,
  edges,
  dimensions: { width, height },
  onNodeClick,
}: props) {
  const svgRef = useRef<SVGSVGElement | null>(null);

  useEffect(() => {
    if (!nodes || !edges || !svgRef.current) return;

    const svg = d3.select(svgRef.current);

    svg.selectAll("*").remove();

    const simulation = d3
      .forceSimulation<Node>(nodes)
      .force(
        "links",
        d3
          .forceLink<Node, Edge>(edges)
          .id((d) => d.id)
          .distance(100)
      )
      .force("charge", d3.forceManyBody().strength(-100))
      .force("center", d3.forceCenter(width / 2, height / 2))
      .force("x", d3.forceX(width / 2))
      .force("y", d3.forceY(height / 2));

    const node = svg
      .append("g")
      .selectAll("circle")
      .data(nodes)
      .enter()
      .append("circle")
      .attr("stroke", "#008080")
      .attr("stroke-width", 2)
      .attr("r", 5)
      .on("click", (event, d) => onNodeClick(d))
      .call(
        d3
          .drag<SVGCircleElement, Node>()
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
            d.fx = null;
            d.fy = null;
          })
      );

    const links = svg
      .append("g")
      .selectAll("line")
      .data(edges)
      .enter()
      .append("line")
      .attr("stroke", (d) => d.color || "#fff")
      .attr("stroke-opacity", 0.6);
    // .attr("stroke-width", 1)

    const label = svg
      .append("g")
      .selectAll("text")
      .data(nodes)
      .enter()
      .append("text")
      .text((d) => d.name)
      .attr("fill", "#fff")
      .attr("font-size", 12)
      .attr("dx", 15)
      .attr("dy", 4);

    simulation.on("tick", () => {
      links
        .attr("x1", (d) => (d.source as any).x || 0)
        .attr("y1", (d) => (d.source as any).y || 0)
        .attr("x2", (d) => (d.target as any).x || 0)
        .attr("y2", (d) => (d.target as any).y || 0);

      node.attr("cx", (d) => d.x || 0).attr("cy", (d) => d.y || 0);
      label.attr("x", (d) => d.x!).attr("y", (d) => d.y!);
    });
  }, [nodes, edges, width, height]);

  return { svgRef };
}

export default graphSimulation;
