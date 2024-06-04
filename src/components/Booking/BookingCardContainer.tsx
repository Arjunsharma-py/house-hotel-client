import { Box } from "@chakra-ui/react";
import { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

const BookingCardContainer = ({ children }: Props) => {
  return (
    <Box
      _hover={{
        transform: "scale(1.03)",
        transition: "transform 0.15s ease-in",
      }}
      borderRadius={10}
      overflow="hidden"
      width="100%"
    >
      {children}
    </Box>
  );
};

export default BookingCardContainer;
