import {
  Card,
  CardBody,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Text,
  VStack,
  List,
  ListItem,
  InputGroup,
  InputLeftElement,
  HStack,
  useColorModeValue,
  FormHelperText,
} from "@chakra-ui/react";
import { ChangeEvent, useState } from "react";
import { FaLocationDot } from "react-icons/fa6";
import DateInput from "../smallComponents/DateInput";
import GradientButton from "../smallComponents/GradientButton";
import { getDateAfterDays } from "../BookingPlacePage/BookingCard";
import { useNavigate } from "react-router-dom";

const disabledDates = [new Date("2024-05-10"), new Date("2024-05-20")];

interface Error {
  location: string;
  date: string;
}

interface FormValues {
  location: string;
  check_in_date: Date;
  check_out_date: Date;
}

const SearchCard = () => {
  const [formValues, setFormValues] = useState<FormValues>({
    location: "",
    check_in_date: new Date(),
    check_out_date: getDateAfterDays(7),
  });
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [error, setError] = useState<Error>({
    location: "",
    date: "",
  });

  const navigate = useNavigate();

  const updateSuggestions = (value: string) => {
    const allSuggestions = ["apple", "banana", "orange", "mango"];
    const filteredSuggestions = allSuggestions.filter((suggestion) =>
      suggestion.toLowerCase().includes(value.toLowerCase())
    );
    setSuggestions(filteredSuggestions);
  };

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setFormValues({ ...formValues, location: value });

    if (value.trim() === "") {
      setSuggestions([]);
    } else {
      updateSuggestions(value);
    }
  };

  const handleItemClick = (suggestion: string) => {
    setFormValues({ ...formValues, location: suggestion });
    setSuggestions([]);
  };

  const handleCheckInDate = (date: Date) => {
    if (date > formValues.check_out_date) {
      setError({ ...error, date: "Check in date must be before out date" });
      return;
    }
    setError({ ...error, date: "" });
    setFormValues({
      ...formValues,
      check_in_date: date,
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
    });
  };

  const handleSearch = () => {
    setError({ location: "", date: "" });
    if (formValues.location.length < 3) {
      setError({ ...error, location: "Type atleast 3 characters" });
      return;
    }
    console.log(formValues);
    navigate("/");
  };

  return (
    <Card
      maxW={{ base: "sm", lg: "md" }}
      boxShadow="searchCard"
      zIndex={1}
      position="relative"
      marginLeft={{ base: "20%", lg: "5%" }}
      // maxWidth={{ base: "full", lg: "30%" }}
      paddingY={5}
      // paddingX={4}
      rounded="2xl"
    >
      <CardBody>
        <VStack>
          <Heading size="lg" w="100%">
            Find places to stay on <Text color="red.300">HouseHotel</Text>
          </Heading>
          <Text color={useColorModeValue("gray.500", "gray.100")}>
            Discover entire homes and rooms perfect for any trip.
          </Text>
          <FormControl marginTop={3}>
            <FormLabel>Location</FormLabel>
            <InputGroup>
              <InputLeftElement children={<FaLocationDot />} />
              <Input
                placeholder="Anywhere"
                value={formValues.location}
                onChange={handleInputChange}
                focusBorderColor="black"
              />
            </InputGroup>

            {error.location && (
              <FormHelperText color={"red.500"}>{error.date}</FormHelperText>
            )}
          </FormControl>
          {suggestions.length > 0 && (
            <List>
              {suggestions.map((suggestion, index) => (
                <ListItem
                  key={index}
                  cursor="pointer"
                  onClick={() => handleItemClick(suggestion)}
                >
                  {suggestion}
                </ListItem>
              ))}
            </List>
          )}
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
                disabled_dates={disabledDates}
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
                disabled_dates={disabledDates}
                date={formValues.check_out_date}
                checkInDate={formValues.check_in_date}
                checkOutDate={formValues.check_out_date}
                onSetDate={handleCheckOutDate}
              />
            </FormControl>
          </HStack>

          {error.date && <Text color={"red.500"}>{error.date}</Text>}
          <GradientButton text={"Check"} width="100%" onClick={handleSearch} />
        </VStack>
      </CardBody>
    </Card>
  );
};

export default SearchCard;
