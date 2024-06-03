import { Button, Divider, HStack, Image, Link, Text } from "@chakra-ui/react";
import { Link as ReactRouterLink } from "react-router-dom";
import logo from "../../assets/HouseHotelLogo.png";

const AddPropertyHeader = () => {
  return (
    <>
      <HStack
        justifyContent="space-between"
        paddingX={[5, 10, 20]}
        paddingY={[1, 2, 2]}
      >
        <Link as={ReactRouterLink} to="/">
          <Image src={logo} boxSize={["40px", "50px", "55px"]} />
        </Link>
        <HStack>
          <Button
            as={ReactRouterLink}
            variant={"outline"}
            rounded={"3xl"}
            to="/"
          >
            <Text fontWeight={600}>Questions?</Text>
          </Button>
          <Button
            as={ReactRouterLink}
            variant={"outline"}
            rounded={"3xl"}
            to="/"
          >
            <Text fontWeight={600}>Exit</Text>
          </Button>
        </HStack>
      </HStack>
      <Divider />
    </>
  );
};

export default AddPropertyHeader;
