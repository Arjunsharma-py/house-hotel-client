import { Box, HStack, Image, Text, useColorModeValue } from "@chakra-ui/react";
import { FaChevronRight } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

interface Props {
  imgSrc: string;
  heading: string;
  text: string;
  onClick?: () => void;
}

const BigCards = ({ imgSrc, heading, text, onClick }: Props) => {
  const navigate = useNavigate();

  return (
    <Box
      w={{ base: "80%", lg: "400px" }}
      marginY={5}
      cursor={"pointer"}
      onClick={onClick}
    >
      <Box
        width={{ base: "full", lg: "100%" }}
        height={{ base: "full", lg: "100%" }}
        margin={"auto"}
        overflow="hidden"
      >
        <Image
          src={imgSrc}
          alt="Background"
          objectFit="cover"
          width="100%"
          height="100%"
          // borderRadius={"lg"}
          rounded={"2xl"}
        />
      </Box>
      <HStack marginTop={5} onClick={() => navigate("/")}>
        <Text fontWeight={800}>{heading}</Text>
        <FaChevronRight />
      </HStack>
      <Text color={useColorModeValue("gray.700", "gray.100")}>{text}</Text>
    </Box>
  );
};

export default BigCards;
