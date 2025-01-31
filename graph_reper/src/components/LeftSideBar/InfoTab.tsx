import { Box, Stack, Text } from "@chakra-ui/react";
import { Node } from "../../services/node-service";

interface Props {
  selectedNode: Node | null;
}

function InfoTab({ selectedNode }: Props) {

    if (!selectedNode){
        return(
            <Box p={4} borderRadius="md">
            <Text>No Node Selected.</Text>
          </Box>
        )
    }
    
  return (
    <Stack>
      {Object.entries(selectedNode).map(([key, value]) => (
        <Box key={key}>
          <Text as="strong" textTransform="capitalize">
            {key}:
          </Text>{" "}
          {value}
        </Box>
      ))}
    </Stack>
  );
}

export default InfoTab;
