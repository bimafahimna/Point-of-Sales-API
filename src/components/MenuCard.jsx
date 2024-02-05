import {
  Card,
  CardBody,
  CardFooter,
  HStack,
  Heading,
  Image,
  Stack,
  Text,
  Button,
  Input,
} from "@chakra-ui/react";
import { useState } from "react";

function MenuCard() {
  const [isOpen, setIsOpen] = useState(false);

  console.log(isOpen);

  return (
    <Card borderRadius="10" overflow="hidden" maxHeight="500" maxWidth="500">
      <Image
        maxHeight="200"
        objectFit="cover"
        src="https://images.freshop.com/2108264/70341b9edeff6a63dac3156f35d38b60_large.png"
      />
      <CardBody>
        <Stack mt="2px" spacing="2">
          <Heading fontSize="lg">Paha Atas</Heading>
          <Text fontSize="small">
            Ayam enak bagian paha atas Lorem ipsum dolor sit amet consectetur
            adipisicing elit.
          </Text>
        </Stack>
      </CardBody>

      {isOpen ? (
        <CardFooter>
          <Stack>
            <HStack>
              <Button size={"sm"}>-</Button>
              <Input size={"sm"} borderRadius={20} />
              <Button size={"sm"}>+</Button>
            </HStack>
          </Stack>
        </CardFooter>
      ) : (
        <Button
          marginX={2}
          size={"sm"}
          marginBottom={2}
          onClick={() => setIsOpen((prevValue) => !prevValue)}
        >
          Add to Cart
        </Button>
      )}
    </Card>
  );
}

export default MenuCard;
