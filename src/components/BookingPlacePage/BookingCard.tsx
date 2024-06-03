import {
  Card,
  CardBody,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Text,
  VStack,
  InputGroup,
  InputLeftElement,
  HStack,
  useColorModeValue,
  FormHelperText,
  useToast,
} from "@chakra-ui/react";
import { useContext, useState } from "react";
import DateInput from "../smallComponents/DateInput";
import GradientButton from "../smallComponents/GradientButton";
import { FaPhoneAlt, FaUser } from "react-icons/fa";
import Booking from "../../interfaces/Booking";
import House from "../../interfaces/House";
import axios from "axios";
import APIClient from "../../services/apiClient";
import { UserContext } from "../../contexts/UserProvider";
import { useNavigate } from "react-router-dom";

export const getExcludedDates = (bookings: Booking[]) => {
  const excludedDates: Date[] = [];

  bookings.forEach((booking) => {
    const checkInDate = new Date(booking.check_in_date);
    const checkOutDate = new Date(booking.check_out_date);

    const currentDate = new Date(checkInDate);
    while (currentDate <= checkOutDate) {
      excludedDates.push(new Date(currentDate));
      currentDate.setDate(currentDate.getDate() + 1);
    }
  });

  return excludedDates;
};

export const getDateAfterDays = (numDays: number) => {
  const currentDate = new Date();
  const futureDate = new Date(currentDate);
  futureDate.setDate(currentDate.getDate() + numDays);
  return futureDate;
};

export const getDaysBetween = (start: Date, end: Date) => {
  const oneDay = 1000 * 60 * 60 * 24; // One day in milliseconds
  const delta = new Date(end).getTime() - new Date(start).getTime();
  const days = delta / oneDay; // Assuming 'oneDay' is defined as above

  return Math.round(days);
};

interface Props {
  house: House | undefined;
}

interface FormValues {
  name: string;
  contact_number: string;
  check_in_date: Date;
  check_out_date: Date;
  price: number;
}

interface Error {
  name: string;
  contact_number: string;
  date: string;
}

interface BookingPayload {
  userId: string;
  name: string;
  contact_number: string;
  check_in_date: Date;
  check_out_date: Date;
  price: number;
}

interface BookingResponse {
  url: string;
}

const BookingCard = ({ house }: Props) => {
  if (house === undefined) return;
  const { user } = useContext(UserContext);
  const navigate = useNavigate();

  const disabled_dates = getExcludedDates(house.bookings);

  const [formValues, setFormValues] = useState<FormValues>({
    name: "",
    contact_number: "",
    check_in_date: new Date(),
    check_out_date: getDateAfterDays(7),
    price: house.price.original_price * 7,
  });
  const [isLoading, setIsLoading] = useState(false);

  const [error, setError] = useState<Error>({
    name: "",
    contact_number: "",
    date: "",
  });
  const toast = useToast();

  const handleCheckInDate = (date: Date) => {
    if (date > formValues.check_out_date) {
      setError({ ...error, date: "Check in date must be before out date" });
      return;
    }
    setError({ ...error, date: "" });
    setFormValues({
      ...formValues,
      check_in_date: date,
      price:
        house.price.original_price *
        getDaysBetween(date, formValues.check_out_date),
    });
  };

  const handleCheckOutDate = (date: Date) => {
    if (date < formValues.check_in_date) {
      setError({ ...error, date: "Check out date must be after in date" });
      return;
    }

    setError({ ...error, date: "" });
    setFormValues({
      ...formValues,
      check_out_date: date,
      price:
        house.price.original_price *
        getDaysBetween(formValues.check_in_date, date),
    });
  };

  const apiClient = new APIClient<BookingResponse>("/booking");

  const handleBooking = async () => {
    if (!user) {
      navigate("/login");
      return;
    }
    setError({ ...error, name: "", contact_number: "" });
    if (formValues.name.length < 4) {
      setError({ ...error, name: "Name must be atleast 4 characters" });
      return;
    }
    if (
      formValues.contact_number.length < 10 ||
      formValues.contact_number.length > 13
    ) {
      setError({
        ...error,
        contact_number: "Please enter correct contact number",
      });
      return;
    }
    const payload: BookingPayload = {
      userId: "string",
      name: formValues.name,
      contact_number: formValues.contact_number,
      check_in_date: formValues.check_in_date,
      check_out_date: formValues.check_out_date,
      price: formValues.price,
    };
    console.log(payload);
    setIsLoading(true);
    try {
      const response = await apiClient.post<BookingPayload>(payload);
      toast({
        title: "Success",
        description: response.message,
        status: "success",
      });
      console.log(response.result.url);
      setIsLoading(false);
    } catch (err) {
      if (axios.isAxiosError(err)) {
        toast({
          title: "Failed",
          description: err.response?.data.error.message,
          status: "error",
          duration: 5000,
          isClosable: true,
        });
        console.log(err.response);
      }
    }
    setIsLoading(false);
  };

  return (
    <Card
      minW={{ base: "sm", lg: "md" }}
      boxShadow="searchCard"
      zIndex={1}
      position="relative"
      // maxWidth={{ base: "full", lg: "30%" }}
      paddingY={5}
      // paddingX={4}
      rounded="2xl"
    >
      <CardBody>
        <VStack>
          <Heading
            size="lg"
            w="100%"
            display={"flex"}
            justifyContent={"center"}
          >
            Book now at{" "}
            <Text marginX={2} color="red.300">
              HouseHotel
            </Text>
          </Heading>
          <Text color={useColorModeValue("gray.500", "gray.100")}>
            Book now to stay at place. Tax is included in price.
          </Text>
          <HStack marginY={2}>
            <Heading size={"md"} display={"flex"}>
              Price :{" "}
              <Text marginX={1} fontWeight={100}>
                {" "}
                ₹{house.price.original_price}
                /day
              </Text>
            </Heading>
          </HStack>
          <FormControl marginTop={3}>
            <FormLabel htmlFor="full_name">Full Name</FormLabel>
            <InputGroup>
              <InputLeftElement children={<FaUser />} />
              <Input
                id="full_name"
                placeholder="Full Name"
                value={formValues.name}
                onChange={(e) =>
                  setFormValues({ ...formValues, name: e.target.value })
                }
                focusBorderColor="black"
              />
            </InputGroup>
            {error.name && (
              <FormHelperText color={"red.500"}>{error.name}</FormHelperText>
            )}
          </FormControl>
          <FormControl marginTop={3}>
            <FormLabel htmlFor="phone">Contact Number</FormLabel>
            <InputGroup>
              <InputLeftElement children={<FaPhoneAlt />} />
              <Input
                id="phone"
                placeholder="Your phone number"
                value={formValues.contact_number}
                onChange={(e) =>
                  setFormValues({
                    ...formValues,
                    contact_number: e.target.value,
                  })
                }
                focusBorderColor="black"
              />
            </InputGroup>
            {error.contact_number && (
              <FormHelperText color={"red.500"}>
                {error.contact_number}
              </FormHelperText>
            )}
          </FormControl>
          <HStack
            display={"flex"}
            justifyContent={"space-between"}
            w={"100%"}
            marginY={2}
          >
            <FormControl
              border="1px"
              borderColor="gray.200"
              borderRadius="lg"
              p={2}
              className={useColorModeValue("date-form-light", "date-form-dark")}
            >
              <FormLabel htmlFor="check_in">Check In</FormLabel>
              <DateInput
                date_picker_id="check_in"
                disabled_dates={disabled_dates}
                date={formValues.check_in_date}
                checkInDate={formValues.check_in_date}
                checkOutDate={formValues.check_out_date}
                onSetDate={handleCheckInDate}
              />
            </FormControl>
            <FormControl
              border="1px"
              borderColor="gray.200"
              borderRadius="lg"
              _focus={{
                borderColor: "gray.500",
              }}
              p={2}
              marginLeft={2}
              className={useColorModeValue("date-form-light", "date-form-dark")}
            >
              <FormLabel htmlFor="check_out">Check out</FormLabel>
              <DateInput
                date_picker_id="check_out"
                disabled_dates={disabled_dates}
                date={formValues.check_out_date}
                checkInDate={formValues.check_in_date}
                checkOutDate={formValues.check_out_date}
                onSetDate={handleCheckOutDate}
              />
            </FormControl>
          </HStack>
          {error.date && <Text color={"red.500"}>{error.date}</Text>}

          <GradientButton
            text={`Book this place for ${
              getDaysBetween(
                formValues.check_in_date,
                formValues.check_out_date
              ) + " "
            }days at ₹ ${formValues.price}`}
            width="100%"
            marginY={2}
            isLoading={isLoading}
            onClick={handleBooking}
          />
        </VStack>
      </CardBody>
    </Card>
  );
};

export default BookingCard;
