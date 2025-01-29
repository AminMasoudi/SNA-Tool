import {
  Card,
  CardBody,
  CardHeader,
  Heading,
  ListItem,
  Spinner,
  UnorderedList,
} from "@chakra-ui/react";
import useNodes from "../hooks/useNodes";
import useEdges from "../hooks/useEdges";
import { useRef } from "react";
import ForceDirectedGraph from "../ForceDirectedGraph";

function Graph() {
  const { nodes, error: nodeError, loading: nodeLoading } = useNodes();
  const { edges, error: edgeError, loading: edgeLoading } = useEdges();
  const svgRef = useRef<SVGSVGElement | null>(null);

  return (
    <>
      <Card  paddingX="10px" height={(window.innerHeight) *0.7}>
        <CardHeader>
          <Heading>Graph View</Heading>
        </CardHeader>
        <CardBody padding={0}>
          <ForceDirectedGraph/>
          {nodeLoading && edgeLoading && (
            <Spinner
            thickness="4px"
            speed="0.65s"
            emptyColor="gray.200"
            color="blue.500"
            size="xl"
            />
          )}
          {/* <UnorderedList>
            {nodes.slice(0,10).map((node) => (
              <ListItem key={node.id}>{node.name}</ListItem>
            ))}
          </UnorderedList>
          <UnorderedList>
            {edges.slice(0,10).map((edge, index) => (
              <ListItem key={index}>
                {edge.source} {"\t"}to {"\t"} {edge.target}
              </ListItem>
            ))}
          </UnorderedList> */}
            </CardBody>
      </Card>
    </>
  );
}

export default Graph;
