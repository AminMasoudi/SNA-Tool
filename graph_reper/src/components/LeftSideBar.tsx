import { Card, CardHeader, HStack, Stack, StackDivider, Tab, TabIndicator, TabList, TabPanel, TabPanels, Tabs } from "@chakra-ui/react"
import { useState } from "react"

function LeftSideBar(){
    const [operation, setOperation] = useState(null)
  return (
    <Card >
    <Tabs isFitted variant="unstyled" >
        <TabList >
            <Tab fontSize={{md:"sm", lg:"sm"}}>Operation</Tab>
            <Tab fontSize={{md:"sm", lg:"sm"}} >Filters</Tab>
            <Tab fontSize={{md:"sm", lg:"sm"}}>Info</Tab>
            <Tab fontSize={{md:"sm", lg:"sm"}} >Analytics</Tab>
        </TabList>
        <TabIndicator mt='-1.5px' height='2px' bg='blue.500' borderRadius='1px' />
        <TabPanels>
            <TabPanel><p>Operation</p></TabPanel>
            <TabPanel><p>Filters</p></TabPanel>
            <TabPanel><p>Info</p></TabPanel>
            <TabPanel><p>Analytic</p></TabPanel>
        </TabPanels>
    </Tabs>
    </Card>
  )
}

export default LeftSideBar
    
{/* <HStack>
<Stack>
<Card >
    <CardHeader>Filters</CardHeader>
</Card>
<Card >
    <CardHeader>Operators</CardHeader>
</Card>
</Stack>
<StackDivider/>

</HStack> */}
