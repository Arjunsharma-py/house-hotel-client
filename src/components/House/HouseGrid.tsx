import {
  Button,
  Center,
  Heading,
  SimpleGrid,
  Spinner,
  Text,
} from "@chakra-ui/react";
import React from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import HouseCardContainer from "./HouseCardContainer";
import HouseCardSkeleton from "./HouseCardSkeleton";
import HouseCard from "./HouseCard";
import useHouses from "../../hooks/useHouses";
import { useNavigate } from "react-router-dom";

const HouseGrid = () => {
  const navigate = useNavigate();
  const { data, error, isLoading, fetchNextPage, hasNextPage } = useHouses();

  const skeletons = [1, 2, 3, 4, 5, 6, 7, 8];

  console.log(error);
  if (error)
    if (error?.message === "Network Error")
      return (
        <Center height={"550px"} flexDirection={"column"}>
          <Heading as={"h2"} size={"2xl"} marginY={5}>
            Your are not connected
          </Heading>
          <Text>Looks like you are not connected to internet</Text>
          <Button
            rounded={"full"}
            variant={"outline"}
            marginY={10}
            onClick={() => navigate(0)}
          >
            Refresh
          </Button>
        </Center>
      );

  const fetchedHouseCount =
    data?.pages.reduce((total, page) => total + page.results.length, 0) || 0;

  return (
    <>
      <InfiniteScroll
        dataLength={fetchedHouseCount}
        hasMore={hasNextPage}
        next={() => fetchNextPage()}
        loader={<Spinner />}
      >
        {!fetchedHouseCount && (
          <Center height={"550px"} flexDirection={"column"}>
            <Heading as={"h2"} size={"2xl"} marginY={5}>
              No Houses yet!
            </Heading>
            <Text>Hotel Your own House at HouseHotel</Text>
            <Button
              rounded={"full"}
              variant={"outline"}
              marginY={10}
              onClick={() => navigate("/add-property")}
            >
              Hotel your house now
            </Button>
          </Center>
        )}
        <SimpleGrid
          columns={{ sm: 1, md: 2, lg: 3, xl: 4 }}
          spacing={6}
          paddingY={10}
          paddingX={{ base: "10px", md: "50px", lg: "100px" }}
        >
          {isLoading &&
            skeletons.map((skeleton) => (
              <HouseCardContainer key={skeleton}>
                <HouseCardSkeleton />
              </HouseCardContainer>
            ))}
          {data?.pages.map((page, index) => (
            <React.Fragment key={index}>
              {page.results.map((house) => (
                <HouseCardContainer key={house._id}>
                  <HouseCard house={house} />
                </HouseCardContainer>
              ))}
            </React.Fragment>
          ))}
        </SimpleGrid>
      </InfiniteScroll>
    </>
  );
};

export default HouseGrid;
