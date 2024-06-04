import {
  Button,
  Center,
  Heading,
  SimpleGrid,
  Text,
  useToast,
} from "@chakra-ui/react";
import { useContext, useEffect, useState } from "react";
import BookingCardContainer from "./BookingCardContainer";
import BookingCardSkeleton from "./BookingCardSkeleton";
import BookingCard from "./BookingCard";
import User from "../../interfaces/User";
import APIClient from "../../services/apiClient";
import { UserContext } from "../../contexts/UserProvider";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const BookingGrid = () => {
  const userContext = useContext(UserContext);
  const toast = useToast();
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState<User>({} as User);

  useEffect(() => {
    if (!userContext.user) return;
    const apiClient = new APIClient<User>(`/user/${userContext.user?._id}`);
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const response = await apiClient.get({});
        setUser(response.result);
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
          // console.log(err.response);
        }
        setIsLoading(false);
      }
    };

    fetchData();
  }, [userContext.user]);

  const skeletons = [1, 2, 3, 4, 5, 6, 7, 8];

  return (
    <>
      <SimpleGrid
        columns={3}
        spacing={6}
        paddingY={10}
        paddingX={{ base: "10px", md: "50px", lg: "100px" }}
      >
        {isLoading &&
          skeletons.map((skeleton) => (
            <BookingCardContainer key={skeleton}>
              <BookingCardSkeleton />
            </BookingCardContainer>
          ))}
        {user?.bookings?.map((booking) => (
          <BookingCardContainer key={booking._id}>
            <BookingCard booking={booking} />
          </BookingCardContainer>
        ))}
        {!user?.bookings?.length && (
          <Center height={"550px"} flexDirection={"column"}>
            <Heading as={"h2"} size={"2xl"} marginY={5}>
              No Booking yet!
            </Heading>
            <Text>Hotel Your own House at HouseHotel</Text>
            <Button
              rounded={"full"}
              variant={"outline"}
              marginY={10}
              onClick={() => navigate("/")}
            >
              Book house now
            </Button>
          </Center>
        )}
      </SimpleGrid>
    </>
  );
};

export default BookingGrid;
