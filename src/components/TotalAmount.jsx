import {
  Box,
  Button,
  Center,
  Divider,
  HStack,
  Stack,
  Text,
} from "@chakra-ui/react";
import { FaTimes } from "react-icons/fa";

function TotalAmount() {
  return (
    <>
      <Stack marginTop={8} paddingRight={4}>
        <Center>
          <Text as="b" fontSize={"md"}>
            Cart
          </Text>
        </Center>
        <Divider />
        <HStack gap={8} mt={2}>
          <Box>
            <HStack>
              <FaTimes />
              <Text as="b" fontSize={"small"}>
                2x
              </Text>
              <Text fontSize={"small"}>Paha Atas</Text>
            </HStack>
          </Box>
          <Text>20.000</Text>
        </HStack>
        <Divider />
        <HStack justifyContent={"space-between"}>
          <Text>Total:</Text>
          <Text>Rp. 20.000</Text>
        </HStack>
        <Button size={"sm"} marginTop={4}>
          Submit Order
        </Button>
      </Stack>
    </>
  );
}

export default TotalAmount;
