import { Flex, HStack, Link, Text, useColorModeValue } from "@chakra-ui/react";
import { Link as ReactRouterLink } from "react-router-dom";
import { FaInstagramSquare, FaLinkedin, FaYoutube } from "react-icons/fa";
import { FaSquareXTwitter } from "react-icons/fa6";

const Footer = () => {
  return (
    <Flex
      paddingX={10}
      justifyContent={"space-between"}
      paddingY={5}
      bg={useColorModeValue("gray.50", "gray.700")}
      boxShadow={"2xl"}
    >
      <HStack>
        <Text>© 2024 HouseHotel, Inc.</Text>
        <Link as={ReactRouterLink} to="/">
          Privacy
        </Link>
        <Link as={ReactRouterLink} to="/">
          Terms
        </Link>
        <Link as={ReactRouterLink} to="/">
          Sitemap
        </Link>
        <Link as={ReactRouterLink} to="/">
          Company Details
        </Link>
      </HStack>
      <HStack fontSize={25}>
        <FaLinkedin />
        <FaSquareXTwitter />
        <FaInstagramSquare />
        <FaYoutube />
      </HStack>
    </Flex>
  );
};

export default Footer;
