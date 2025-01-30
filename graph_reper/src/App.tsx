import { Grid, GridItem, Show } from "@chakra-ui/react";
import "./App.css";
import ForceDirectedGraph from "./ForceDirectedGraph";
import Graph from "./components/Graph";
import LeftSideBar from "./components/LeftSideBar";
import NavBar from "./components/NavBar";
import Main from "./components/Main";

function App() {
  return (
    <Grid paddingX="10px" paddingY="10px" gap={"10px"}
      templateAreas={{
        base: `"main"`,
        lg: `"left-sidebar main"`,
      }}
      templateColumns={{
        base: "1fr",
        lg: "30% 1fr"
      }}
    >
      {/* <GridItem area={"nav"}>
        <NavBar/>
      </GridItem> */}
      <Show above="lg">
        <GridItem  area={"left-sidebar"} >
          <LeftSideBar/>
        </GridItem>
      </Show>
      
      <GridItem area={"main"}>
    {/* <ForceDirectedGraph /> */}
      <Main/>
      </GridItem>
    </Grid>
  );
}

export default App;
