import { Button, Center, Heading, Text } from "@chakra-ui/react";
import { Link as ReactRouterLink } from "react-router-dom";
import MainHeader from "../components/header/MainHeader";
import Footer from "../components/footer/Footer";
import MainFooter from "../components/footer/MainFooter";

const ErrorPage = () => {
  return (
    <>
      <MainHeader />
      <Center height={"550px"} flexDirection={"column"}>
        <Heading as={"h2"} size={"2xl"} marginY={5}>
          No Place found
        </Heading>
        <Text>Explore other places on Home page</Text>
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
      <MainFooter />
      <Footer />
    </>
  );
};

export default ErrorPage;
