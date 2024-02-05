import { Grid, GridItem, Input, Show } from "@chakra-ui/react";
import Navbar from "../components/Navbar";
import DashboardGrid from "../components/DashboardGrid";
import TotalAmount from "../components/TotalAmount";

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
          <TotalAmount />
        </GridItem>
      </Show>
      <GridItem area="main">
        <Input
          marginTop={8}
          marginLeft={10}
          width="93%"
          placeholder="Search For Menu..."
          borderRadius={20}
        />
        <DashboardGrid />
      </GridItem>
    </Grid>
  );
}

export default Dashboard;
