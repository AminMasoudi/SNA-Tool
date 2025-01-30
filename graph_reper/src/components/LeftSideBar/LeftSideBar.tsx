import {
  Box,
  Divider,
  Flex,
  HStack,
  Tab,
  TabIndicator,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
} from "@chakra-ui/react";
import { useState } from "react";
import OperationForm from "./OperationForm";

function LeftSideBar() {
  const [operation, setOperation] = useState(null);
  return (
    <>
      <Box
        marginBottom="10px"
        h={{ base: "40px", lg: "calc(100vh - 64px)" }}
        borderRight={"solid 1px teal"}
      >
        <Tabs isFitted variant="unstyled">
          <TabList>
            <Tab fontSize={{ md: "sm", lg: "sm" }}>Operation</Tab>
            <Tab fontSize={{ md: "sm", lg: "sm" }}>Filters</Tab>
            <Tab fontSize={{ md: "sm", lg: "sm" }}>Info</Tab>
            <Tab fontSize={{ md: "sm", lg: "sm" }}>Analytics</Tab>
          </TabList>
          <TabIndicator
            mt="-1.5px"
            height="2px"
            bg="teal"
            borderRadius="1px"
          />
          <TabPanels>
            <TabPanel>
              <OperationForm />
            </TabPanel>
            <TabPanel>
              <p>Filters</p>
            </TabPanel>
            <TabPanel>
              <p>Info</p>
            </TabPanel>
            <TabPanel>
              <p>Analytic</p>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </>
  );
}

export default LeftSideBar;

{
  /* <HStack>
<HStack>
<Card >
    <CardHeader>Filters</CardHeader>
</Card>
<Card >
    <CardHeader>Operators</CardHeader>
</Card>
</HStack>
<StackDivider/>

</HStack> */
}
