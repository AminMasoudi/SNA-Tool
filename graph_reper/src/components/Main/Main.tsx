import {
    Box,
    Center,
    Heading,
    Spinner,
  } from "@chakra-ui/react";
  import useNodes from '../../hooks/useNodes'
  import useEdges from "../../hooks/useEdges";
  import { useRef } from "react";
  import ForceDirectedGraph from "../../ForceDirectedGraph";
  
  function Main() {
    const { nodes, error: nodeError, loading: nodeLoading } = useNodes();
    const { edges, error: edgeError, loading: edgeLoading } = useEdges();
    const svgRef = useRef<SVGSVGElement | null>(null);
  
    return (
      <>
        <Box paddingX="10px" height={window.innerHeight * 0.9}>
          <Box>
            <Heading>Graph View</Heading>
          </Box>
          <Box padding={0}>
            {nodeLoading && edgeLoading ? (
              <Center h="calc(100vh - 64px)" marginX="auto">
              <Spinner
                thickness="4px"
                speed="0.65s"
                emptyColor="gray.200"
                color="blue.500"
                size="xl"
                />
                </Center>
            ) : (
              <ForceDirectedGraph />
            )}
          </Box>
        </Box>
      </>
    );
  }
  
  export default Main;
  