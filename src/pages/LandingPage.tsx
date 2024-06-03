import {
  Box,
  Flex,
  Heading,
  Image,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import SearchCard from "../components/landingPage/SearchCard";
import frontImage from "../assets/landing_page/frontImage.webp";
import houseImage from "../assets/landing_page/house.webp";
import flatImage from "../assets/landing_page/flat.webp";
import roomImage from "../assets/landing_page/room.webp";
import category1Image from "../assets/landing_page/category1.webp";
import category2Image from "../assets/landing_page/category2.webp";
import category3Image from "../assets/landing_page/category3.webp";
import { GoShieldCheck } from "react-icons/go";
import { RxDesktop, RxMixerHorizontal } from "react-icons/rx";
import { BsHouses } from "react-icons/bs";
import BigCards from "../components/landingPage/BigCards";
import AmenitiesButtons from "../components/landingPage/AmenitiesButtons";
import { FaSwimmingPool } from "react-icons/fa";
import { LuParkingCircle } from "react-icons/lu";
import { PiWashingMachine } from "react-icons/pi";
import { TbAirConditioning } from "react-icons/tb";
import { MdFireplace } from "react-icons/md";
import { CiTempHigh } from "react-icons/ci";
import { GiBarbecue } from "react-icons/gi";
import Accordians from "../components/landingPage/Accordians";

const LandingPage = () => {
  return (
    <>
      <Flex height={"90vh"} position="relative" alignItems="center">
        <Box
          position="absolute"
          right={{ base: 0, lg: "80px" }}
          width={{ base: "full", lg: "70%" }}
          height={{ base: "full", lg: "85%" }}
          overflow="hidden"
        >
          <Image
            src={frontImage}
            alt="Background"
            objectFit="cover"
            width="100%"
            height="100%"
            rounded={"2xl"}
          />
        </Box>
        <SearchCard />
      </Flex>

      <Flex
        width={"100%"}
        paddingX={10}
        marginY={10}
        justifyContent={"space-around"}
        flexWrap={"wrap"}
      >
        <Box w={{ base: "100%", md: "100%", lg: "380px" }} marginY={5}>
          <GoShieldCheck fontSize={"30px"} />
          <Heading size={"md"} paddingTop={8}>
            Enjoy some flexibility
          </Heading>
          <Text paddingTop={2}>
            Stays with flexible cancellation make it easy to rebook if your
            plans change.
          </Text>
        </Box>
        <Box w={{ base: "100%", lg: "380px" }} marginY={5}>
          <BsHouses fontSize={"30px"} />
          <Heading size={"md"} paddingTop={8}>
            More than 7M active listings
          </Heading>
          <Text paddingTop={2}>
            Join more than 1 billion guests who’ve found getaways in over 220
            countries and destinations.
          </Text>
        </Box>
        <Box w={{ base: "100%", lg: "380px" }} marginY={5}>
          <RxMixerHorizontal fontSize={"30px"} />
          <Heading size={"md"} paddingTop={8}>
            100+ filters for tailored stays
          </Heading>
          <Text paddingTop={2}>
            Pick your price range, the number of rooms you want and other key
            amenities to find the stay that fits your needs.
          </Text>
        </Box>
      </Flex>

      <Box paddingX={10} marginY={10}>
        <Heading as="h2" size={"lg"} marginBottom={5}>
          Big, small, we have it all
        </Heading>
        <Flex
          justifyContent={{ base: "space-around", lg: "space-between" }}
          flexWrap={"wrap"}
          alignItems={"center"}
        >
          <BigCards
            imgSrc={houseImage}
            heading="Houses"
            text="If you need extra space, get an entire place all to yourself."
          />
          <BigCards
            imgSrc={flatImage}
            heading="Flats"
            text="If you need extra space, get an entire place all to yourself."
          />
          <BigCards
            imgSrc={roomImage}
            heading="Rooms"
            text="If you need extra space, get an entire place all to yourself."
          />
        </Flex>
      </Box>

      <Box
        paddingX={10}
        marginY={10}
        paddingY={{ base: "40px", lg: "80px" }}
        bg={useColorModeValue("gray.50", "gray.700")}
      >
        <Heading as="h2" size={"lg"}>
          Get specific with your favourite amenities
        </Heading>
        <Text marginBottom={5}>
          Choose from top features like these – and more – for a personalised
          stay.
        </Text>
        <Flex
          justifyContent={{ base: "space-around", lg: "space-between" }}
          alignItems={"center"}
          flexWrap={"wrap"}
        >
          <AmenitiesButtons title="Pool" icon={FaSwimmingPool} />
          <AmenitiesButtons title="Free Parking" icon={LuParkingCircle} />
          <AmenitiesButtons title="Washing machine" icon={PiWashingMachine} />
          <AmenitiesButtons title="AC" icon={TbAirConditioning} />
          <AmenitiesButtons title="Fireplace" icon={MdFireplace} />
          <AmenitiesButtons title="TV" icon={RxDesktop} />
          <AmenitiesButtons title="Heating" icon={CiTempHigh} />
          <AmenitiesButtons title="Barbecue" icon={GiBarbecue} />
        </Flex>
      </Box>

      <Box paddingX={10} marginY={10}>
        <Heading as="h2" size={"lg"}>
          Explore 60+ Airbnb Categories
        </Heading>
        <Text marginBottom={5}>
          These are just a few collections grouped by style, location and nearby
          activities.
        </Text>
        <Flex
          justifyContent={"space-around"}
          flexWrap={"wrap"}
          alignItems={"center"}
        >
          <BigCards
            imgSrc={category1Image}
            heading="Cabins"
            text="Cozy hideaways close to mother nature."
          />
          <BigCards
            imgSrc={category2Image}
            heading="OMG!"
            text="Find anything from UFOs to submarines."
          />
          <BigCards
            imgSrc={category3Image}
            heading="Beach Front"
            text="Sought-after properties by the water's edge."
          />
        </Flex>
      </Box>

      <Flex
        paddingX={10}
        marginY={10}
        flexDirection={{ base: "column", md: "row", lg: "row" }}
      >
        <Box
          w={{ base: "100%", md: "45%", lg: "45%" }}
          display={"flex"}
          justifyContent={"center"}
        >
          <Heading as={"h1"} paddingY={5} size={"2xl"}>
            Your questions, answered
          </Heading>
        </Box>
        <Box w={{ base: "100%", md: "45%", lg: "45%" }}>
          <Accordians />
        </Box>
      </Flex>
    </>
  );
};

export default LandingPage;
