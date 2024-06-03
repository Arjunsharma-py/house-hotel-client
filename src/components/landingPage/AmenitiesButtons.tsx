import { Box, HStack, Text, useColorModeValue } from "@chakra-ui/react";
import React from "react";
import { BiChevronRight } from "react-icons/bi";
import { useNavigate } from "react-router-dom";

interface IconTypeProps {
  width: number;
  height: number;
  color: string;
}

type IconType = (props: IconTypeProps) => JSX.Element;

interface Props {
  title: string;
  icon: IconType;
}

const AmenitiesButtons = ({ title, icon }: React.PropsWithChildren<Props>) => {
  const navigate = useNavigate();
  return (
    <Box
      as="button"
      width={{ base: "100%", md: "40%", lg: "22%" }}
      paddingX={3}
      paddingY={6}
      marginY={2}
      bg={useColorModeValue("white", "gray.900")}
      rounded={"lg"}
      border={"1px"}
      borderColor={useColorModeValue("borColor.800", "borColor.500")}
      onClick={() => navigate("/")}
    >
      <HStack fontWeight={600} fontSize={35}>
        {React.createElement(icon)}
        <Text marginLeft={1} fontSize={16}>
          {title}
        </Text>
        <BiChevronRight />
      </HStack>
    </Box>
  );
};

export default AmenitiesButtons;
