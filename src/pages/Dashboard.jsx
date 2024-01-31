import { Grid, GridItem, Show } from "@chakra-ui/react";
import Navbar from "../components/Navbar";
import DashboardGrid from "../components/DashboardGrid";

function Dashboard() {
  return (
    <Grid
      templateAreas={{
        base: `"nav" "main"`,
        lg: `"nav nav" "main aside"`,
      }}
    >
      <GridItem area="nav">
        <Navbar />
      </GridItem>
      <Show above="lg">
        <GridItem area="aside" width="200px">
          aside
        </GridItem>
      </Show>
      <GridItem area="main">
        <DashboardGrid />
      </GridItem>
    </Grid>
  );
}

export default Dashboard;
