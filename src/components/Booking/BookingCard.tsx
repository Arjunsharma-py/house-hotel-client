import { Box, Heading, Text, VStack } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import Booking from "../../interfaces/Booking";

const formatDate = (date: Date): string => {
  console.log(date);
  const day = date.getDate();
  const month = date.getMonth() + 1; // JavaScript months are 0-based.
  const year = date.getFullYear();

  return `${month}/${day}/${year}`;
};

interface Props {
  booking: Booking;
}

const BookingCard = ({ booking }: Props) => {
  const bookingDetails = {
    name: booking.name,
    houseName: booking.house_name,
    check_in_date: booking.check_in_date,
    check_out_date: booking.check_out_date,
    house_name: booking.house_name,
  };
  return (
    <>
      <Link to={`/booking/${booking._id}`}>
        <Box
          maxW="sm"
          borderWidth="1px"
          borderRadius="lg"
          overflow="hidden"
          boxShadow="md"
          p={5}
          m={4}
        >
          <VStack align="stretch" spacing={3}>
            <Heading as="h3" size="lg" color={"red.300"}>
              {bookingDetails.houseName}
            </Heading>
            <Text>
              <strong>Name:</strong> {bookingDetails.name}
            </Text>
            <Text>
              <strong>place:</strong> {bookingDetails.houseName}
            </Text>
            <Text>
              <strong>Check-In Date:</strong>{" "}
              {formatDate(new Date(bookingDetails.check_in_date))}
            </Text>
            <Text>
              <strong>Check-Out Date:</strong>{" "}
              {formatDate(new Date(bookingDetails.check_out_date))}
            </Text>
          </VStack>
        </Box>
      </Link>
    </>
  );
};

export default BookingCard;
