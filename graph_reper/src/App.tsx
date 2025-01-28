import { Grid, GridItem, Show } from "@chakra-ui/react";
import "./App.css";
import ForceDirectedGraph from "./ForceDirectedGraph";

function App() {
  return (
    <Grid
      templateAreas={{
        base: `"main"`,
        lg: `"left-sidebar main right-sidebar"`,
      }}
    >
      <Show above="lg">
        <GridItem area={"left-sidebar"} bg={"coral"}>
          Left
        </GridItem>
      </Show>
      
      <GridItem area={"main"}>
  {/* <div className="App"> */}
    <ForceDirectedGraph />
  {/* </div> */}

      </GridItem>
      <Show above="lg">
        <GridItem area={"right-sidebar"} bg={"gold"}>
          Right
        </GridItem>
      </Show>
    </Grid>
  );
}

export default App;
