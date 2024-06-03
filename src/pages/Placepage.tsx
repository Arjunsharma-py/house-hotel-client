import {
  Button,
  Center,
  Flex,
  Grid,
  GridItem,
  HStack,
  Heading,
  Image,
  Spinner,
  Stack,
  Text,
  VStack,
} from "@chakra-ui/react";
import {
  useNavigate,
  useParams,
  Link as ReactRouterLink,
} from "react-router-dom";
import useHouse from "../hooks/useHouse";
import { FaLocationDot } from "react-icons/fa6";
import { IoImagesOutline } from "react-icons/io5";
import BookingCard from "../components/BookingPlacePage/BookingCard";

const Placepage = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  if (id === undefined) {
    navigate("/");
    return;
  }
  const { data, isLoading, error } = useHouse(id);

  const house = data?.result;

  if (isLoading)
    return (
      <Center height={"550px"}>
        <Spinner color={"red.300"} width={"100px"} height={"100px"} />
      </Center>
    );

  if (error) {
    return (
      <Center height={"550px"} flexDirection={"column"}>
        <Heading as={"h2"} size={"2xl"} marginY={5}>
          No Place found
        </Heading>
        <Text>Explore other places on Home page</Text>
        <Button
          as={ReactRouterLink}
          rounded={"full"}
          variant={"outline"}
          marginY={10}
          to={"/"}
        >
          Back to Home
        </Button>
      </Center>
    );
  }

  return (
    <Flex marginX={20} flexDirection={"column"}>
      <VStack alignItems={"flex-start"} marginY={5}>
        <Heading as={"h3"} size={"lg"} fontWeight={600}>
          {house?.details.name}
        </Heading>
        <HStack>
          <Text>
            <FaLocationDot />
          </Text>
          <Text size={"sm"} fontWeight={600} textDecoration={"underline"}>
            <a href={`https://maps.google.com/?q=${house?.address.full}`}>
              {house?.address.full}
            </a>
          </Text>
        </HStack>
      </VStack>
      <Grid
        templateRows="repeat(2, 1fr)"
        templateColumns={{ base: "repeat(1, 1fr)", lg: "repeat(4, 1fr)" }}
        gap={2}
        marginBottom={5}
        position={"relative"}
      >
        <GridItem
          rowSpan={2}
          colSpan={2}
          // h={{ base: "250px", md: "300px", lg: "450px" }}
          // w={{ base: "350px", md: "450px", lg: "100%" }}
        >
          <Image
            src={house?.images[0].src}
            alt="Large Image"
            objectFit="cover"
            width="100%"
            height="100%"
            borderLeftRadius={"lg"}
          />
        </GridItem>
        <GridItem
          colSpan={1}
          h={{ base: "250px", md: "145px", lg: "221px" }}
          w={{ base: "280px", md: "100%", lg: "100%" }}
        >
          <Image
            src={house?.images[1].src}
            alt="Small Image 1"
            objectFit="cover"
            width="100%"
            height="100%"
          />
        </GridItem>
        <GridItem
          colSpan={1}
          h={{ base: "250px", md: "145px", lg: "221px" }}
          w={{ base: "280px", md: "100%", lg: "100%" }}
        >
          <Image
            src={house?.images[2].src}
            alt="Small Image 2"
            objectFit="cover"
            width="100%"
            height="100%"
            borderTopRightRadius={"lg"}
          />
        </GridItem>
        <GridItem
          colSpan={1}
          h={{ base: "250px", md: "145px", lg: "221px" }}
          w={{ base: "280px", md: "100%", lg: "100%" }}
        >
          <Image
            src={house?.images[3].src}
            alt="Small Image 3"
            objectFit="cover"
            width="100%"
            height="100%"
          />
        </GridItem>
        <GridItem
          colSpan={1}
          h={{ base: "250px", md: "145px", lg: "221px" }}
          w={{ base: "280px", md: "100%", lg: "100%" }}
        >
          <Image
            src={house?.images[4].src}
            alt="Small Image 4"
            objectFit="cover"
            width="100%"
            height="100%"
            borderBottomRightRadius={"lg"}
          />
        </GridItem>
        <Button
          position={"absolute"}
          bottom={3}
          right={3}
          fontWeight={100}
          rounded={"lg"}
          bg={"white"}
          leftIcon={<IoImagesOutline />}
        >
          show all
        </Button>
      </Grid>
      <Flex width={"100%"} justifyContent={"space-between"} marginY={10}>
        <Stack>
          <Heading size={"lg"} fontWeight={100} marginY={2}>
            Description
          </Heading>
          <Text fontWeight={600} width={"90%"}>
            {house?.details.description} Lorem ipsum dolor sit amet consectetur
            adipisicing elit. Blanditiis odio doloremque exercitationem
            molestiae dolor vitae veritatis facilis porro, ducimus alias magni
            est dolores ipsum laborum natus perspiciatis, delectus repellat
            libero!
          </Text>
        </Stack>
        <BookingCard house={house} />
      </Flex>
    </Flex>
  );
};

export default Placepage;
