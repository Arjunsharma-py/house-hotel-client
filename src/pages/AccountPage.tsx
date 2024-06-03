import { Button, Center, Heading, Text } from "@chakra-ui/react";
import { Link as ReactRouterLink } from "react-router-dom";

const AccountPage = () => {
  return (
    <Center height={"550px"} flexDirection={"column"}>
      <Heading as={"h2"} size={"2xl"} marginY={5}>
        Page Under Development
      </Heading>
      <Text>Explore places on Home page</Text>
      <Button
        as={ReactRouterLink}
        rounded={"full"}
        variant={"outline"}
        marginY={10}
        to={"/"}
      >
        Back to Home
      </Button>
    </Center>
  );
};

export default AccountPage;
