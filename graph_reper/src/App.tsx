import { Grid, GridItem, Show } from "@chakra-ui/react";
import "./App.css";
import LeftSideBar from "./components/LeftSideBar";
import { Node } from "./services/node-service";
import Main from "./components/Main";
import { useState } from "react";

function App() {
  const [selectedNode, setSelectedNode] = useState<Node | null>(null);


  return (
    <Grid  paddingY="10px" gap={"10px"}
      templateAreas={{
        base: `"main"`,
        lg: `"left-sidebar main"`,
      }}
      templateColumns={{
        base: "1fr",
        lg: "30% 1fr"
      }}
    >
      <Show above="lg">
        <GridItem  area={"left-sidebar"} >
          <LeftSideBar/>
        </GridItem>
      </Show>
      
      <GridItem area={"main"}>
      <Main setSelectedNode={ d =>{
        setSelectedNode(d)
      }}/>
      </GridItem>
    </Grid>
  );
}

export default App;
