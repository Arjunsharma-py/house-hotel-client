import { Box, Button, Flex, Heading } from "@chakra-ui/react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

interface Props {
  heading: string;
  onBack?: () => void;
  onNext?: () => void;
}

const AuthHeader = ({ heading, onBack, onNext }: Props) => {
  return (
    <Flex justifyContent={"space-between"} alignItems={"center"}>
      {onBack ? (
        <Button onClick={onBack} variant={"ghost"} rounded={"3xl"} padding={0}>
          <FaChevronLeft />
        </Button>
      ) : (
        <Box paddingX={5} />
      )}
      <Heading as={"h5"} size={"sm"}>
        {heading}
      </Heading>
      {onNext ? (
        <Button onClick={onBack} variant={"ghost"} rounded={"3xl"} padding={0}>
          <FaChevronRight />
        </Button>
      ) : (
        <Box paddingX={5} />
      )}
    </Flex>
  );
};

export default AuthHeader;
