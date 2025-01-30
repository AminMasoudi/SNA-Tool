import useNodes from "../../hooks/useNodes";
import useEdges from "../../hooks/useEdges";
import graphSimulation from "../../hooks/graphSimulation";
import { useEffect, useState } from "react";
import { Node } from "../../services/node-service";

interface GraphProps {
  setError: (err: string) => void;
  setLoading: (l: boolean) => void;
  setSelectedNode: (d: Node) => void;
}

function Graph({ setError, setLoading, setSelectedNode }: GraphProps) {
  const { nodes, error: nodeError, loading: nodeLoading } = useNodes();
  const { edges, error: edgeError, loading: edgeLoading } = useEdges();

  setError(nodeError || edgeError);
  setLoading(nodeLoading || edgeLoading);

  const [dimensions, setDimensions] = useState({ width: 900, height: 600 });
  const { svgRef } = graphSimulation({
    nodes,
    edges,
    dimensions,
    onNodeClick: setSelectedNode,
  });
  useEffect(() => {
    const updateDimensions = () => {
      setDimensions({
        width: 0.6 * window.innerWidth,
        height: 0.9 * window.innerHeight,
      });
    };

    window.addEventListener("resize", updateDimensions);
    updateDimensions(); // Set initial dimensions

    return () => {
      window.removeEventListener("resize", updateDimensions);
    };
  }, []);
  return <svg ref={svgRef} height={dimensions.height} width="100%"></svg>;
}

export default Graph;
