import { Box, Stack, StackDivider } from "@chakra-ui/react";
import { IoAdd } from "react-icons/io5";
import BtnDrawer from "./BtnDrawer";
import { useRef } from "react";
import AddNodeForm from "./AddNodeForm";

function OperationForm() {
    const addNodeRef = useRef(null)
  return (
    <>
      <Stack justifyContent="space-between">
        <Box>
          <BtnDrawer
            header="Add a new Node"
            name="Add Node"
            leftIcon={<IoAdd />}
            colorScheme="teal"
            initialFocusRef={addNodeRef}
            onSubmit={()=>console.log("Submit")}
          >
            <AddNodeForm firstField={addNodeRef}/>
          </BtnDrawer>
        </Box>
        <StackDivider />
        <Box>Colorize settings</Box>
      </Stack>
    </>
  );
}

export default OperationForm;
