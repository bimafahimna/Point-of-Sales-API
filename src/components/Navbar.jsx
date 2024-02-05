import {
  Avatar,
  HStack,
  MenuButton,
  Text,
  Menu,
  MenuList,
  MenuItem,
  MenuDivider,
} from "@chakra-ui/react";
import { IoPeople } from "react-icons/io5";
import { PiGearSixFill } from "react-icons/pi";
import { IoIosLogOut } from "react-icons/io";

import { ColorModeSwitch } from "./ColorModeSwitch";

function Navbar() {
  return (
    <HStack justify="space-between" margin="12px">
      <h1>Logo</h1>
      <Menu>
        <MenuButton as="button">
          <HStack marginLeft="40px" justify="space-between">
            <Avatar size="sm" />
            <Text>Nama User</Text>
          </HStack>
        </MenuButton>

        <MenuList>
          <MenuItem>
            {" "}
            <ColorModeSwitch />
          </MenuItem>
          <MenuDivider />
          <MenuItem gap="8px">
            <IoPeople />
            Profile
          </MenuItem>

          <MenuItem gap="8px">
            <PiGearSixFill /> Settings
          </MenuItem>
          <MenuItem gap="8px">
            {" "}
            <IoIosLogOut />
            Logout
          </MenuItem>
        </MenuList>
      </Menu>
    </HStack>
  );
}

export default Navbar;
