import { useEffect, useState } from "react";
import edgeService, { Edge } from "../services/edge-service";
import { buffer } from "d3";
import { CanceledError } from "axios";

const useEdges = () => {
  const [edges, setEdges] = useState<Edge[]>([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const { request, cancel } = edgeService.getAllEdges();
    request
      .then((res) => {
        console.log(res.data);
        const edges: Edge[] = res.data.map(
          ([source, target]:[number, number]) => ({ source, target })
        );
        setEdges(edges);
      })
      .catch((err) => {
        if (err instanceof CanceledError) return

        setError(err);
      })
      .finally(() => setLoading(false));

      return cancel
  }, []);
  return { edges, error, loading };
};

export default useEdges;
