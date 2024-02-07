import { Box, Text, Button } from "@chakra-ui/react";
import { HiSortDescending } from "react-icons/hi";
import { MdFilterAlt } from "react-icons/md";
import { PiExport } from "react-icons/pi";
import { FaPlus } from "react-icons/fa";

import EmployeeTable from "../components/EmployeeTable";

const EmployeeList = () => {
  return (
    <Box h={"100vh"} bgColor={"gray.50"} p={"2rem"}>
      <Box mb={"2rem"} display={"flex"} justifyContent={"space-between"}>
        <Text fontSize={"2xl"} fontWeight={"semibold"}>
          Employee List
        </Text>
        <Button variant={"solid"} bgColor={"blue.600"} color={"white"}>
          <FaPlus style={{ marginRight: "0.25rem" }} /> Add New Employee
        </Button>
      </Box>
      <Box bgColor={"white"} p={"2rem"} overflow={"auto"}>
        <Box display={"flex"} justifyContent={"space-between"} mb={"1rem"}>
          <Text
            fontSize={"xl"}
            display={"flex"}
            alignItems={"center"}
            fontWeight={"bold"}
          >
            Employee
          </Text>
          <Box my={2} display={"flex"} gap={2}>
            <Button>
              Sort <HiSortDescending style={{ marginLeft: "0.25rem" }} />
            </Button>
            <Button>
              Filter <MdFilterAlt style={{ marginLeft: "0.25rem" }} />
            </Button>
            <Button>
              Export <PiExport style={{ marginLeft: "0.25rem" }} />
            </Button>
          </Box>
        </Box>
        <EmployeeTable />
      </Box>
    </Box>
  );
};

export default EmployeeList;
