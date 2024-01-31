import { Avatar, HStack, Text } from "@chakra-ui/react";
import { ColorModeSwitch } from "./ColorModeSwitch";

function Navbar() {
  return (
    <HStack justifyContent="space-between" padding="15px">
      <h1>Logo</h1>
      <HStack justifyContent="space-between">
        <ColorModeSwitch />
        <HStack marginLeft="40px">
          <Avatar size="sm" />
          <Text>Nama User</Text>
        </HStack>
      </HStack>
    </HStack>
  );
}

export default Navbar;
