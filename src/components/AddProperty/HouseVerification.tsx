import { Button, Center, Heading, Image, Text, VStack } from "@chakra-ui/react";
import { Link as ReactRouterLink } from "react-router-dom";

const HouseVerification = () => {
  return (
    <>
      {/* <AddPropertyHeader /> */}
      <Center h="90vh">
        <VStack spacing={4} align="center">
          <Image
            src={"https://icon-library.com/images/dda8522d9c_92246.png"}
            boxSize="150px"
            objectFit="cover"
            alt="Centered Image"
          />
          <Heading>Verification</Heading>
          <Text fontSize="lg" fontWeight="semibold">
            Verification pending
          </Text>
          <Text>Soon Our agent will connect you for the verification</Text>
          <Button as={ReactRouterLink} colorScheme="whiteAlpha" to={"/"}>
            Home
          </Button>
        </VStack>
      </Center>
    </>
  );
};

export default HouseVerification;
