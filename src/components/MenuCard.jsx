import {
  Card,
  CardBody,
  CardFooter,
  Heading,
  Image,
  Stack,
  Text,
} from "@chakra-ui/react";

function MenuCard() {
  return (
    <Card borderRadius="10" overflow="hidden" maxHeight="360" maxWidth="300">
      <Image
        maxHeight="200"
        objectFit="cover"
        src="https://images.freshop.com/2108264/70341b9edeff6a63dac3156f35d38b60_large.png"
      />
      <CardBody>
        <Stack mt="2" spacing="3">
          <Heading fontSize="lg">Paha Atas</Heading>
          <Text fontSize="small">
            Ayam enak bagian paha atas Lorem ipsum dolor sit amet consectetur
            adipisicing elit.
          </Text>
        </Stack>
      </CardBody>
      <CardFooter></CardFooter>
    </Card>
  );
}

export default MenuCard;
