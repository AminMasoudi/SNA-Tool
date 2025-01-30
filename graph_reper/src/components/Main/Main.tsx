import { Alert, Box, Center, Heading, Spinner } from "@chakra-ui/react";
import { useRef, useState } from "react";
import Graph from "./Graph";
import { Node } from "../../services/node-service";

interface MainProps{
  setSelectedNode: (d: Node) => void;
}

function Main({setSelectedNode}: MainProps) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const svgRef = useRef<SVGSVGElement | null>(null);

  return (
    <>
      <Box paddingX="10px" height={window.innerHeight * 0.9}>
        <Box>
          <Heading>Graph View</Heading>
        </Box>
        <Box padding={0}>
          {error && (
            <Alert variant="solid" status="error">
              Error fetching data
            </Alert>
          )}
          {loading && (
            <Center h="calc(100vh - 64px)" marginX="auto">
              <Spinner
                thickness="4px"
                speed="0.65s"
                emptyColor="gray.200"
                color="blue.500"
                size="xl"
              />
            </Center>
          )}
          <Graph setSelectedNode={setSelectedNode} setError={setError} setLoading={setLoading} />
        </Box>
      </Box>
    </>
  );
}

export default Main;
