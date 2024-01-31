import { SimpleGrid } from "@chakra-ui/react";
import MenuCard from "./MenuCard";

function DashboardGrid() {
  return (
    <SimpleGrid
      columns={{
        sm: 1,
        md: 2,
        lg: 3,
        xl: 5,
      }}
      spacing={10}
      padding={10}
    >
      <MenuCard />
      <MenuCard />
      <MenuCard />
      <MenuCard />
      <MenuCard />
    </SimpleGrid>
  );
}

export default DashboardGrid;
