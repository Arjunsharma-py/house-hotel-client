import { HStack, Image, Link, Text } from "@chakra-ui/react";
import { Link as ReactRouterLink } from "react-router-dom";
import logo from "../../assets/react.svg";
import ColorModeSwitch from "../smallComponents/ColorModeSwitch";

const Header = () => {
  return (
    <>
      <HStack
        justifyContent="space-between"
        paddingX={[5, 10, 20]}
        paddingY={[1, 2, 2]}
        boxShadow={"md"}
      >
        <Link as={ReactRouterLink} to="/">
          <Image src={logo} boxSize={["40px", "50px", "55px"]} />
        </Link>
        <HStack>
          <ColorModeSwitch />
          <Link as={ReactRouterLink} to="/add-property">
            <Text fontWeight={500} textDecoration="underline">
              Hotel your House
            </Text>
          </Link>
          <Link as={ReactRouterLink} to="/signup">
            <Text fontWeight={500} textDecoration="underline">
              Sign up
            </Text>
          </Link>
        </HStack>
      </HStack>
    </>
  );
};

export default Header;
