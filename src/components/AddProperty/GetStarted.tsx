import {
  Box,
  Center,
  Divider,
  Flex,
  HStack,
  Heading,
  Image,
  Text,
} from "@chakra-ui/react";
import GradientButton from "../smallComponents/GradientButton";

interface Props {
  onNext: () => void;
}

const GetStarted = ({ onNext }: Props) => {
  return (
    <>
      {/* <AddPropertyHeader /> */}
      <Center height={"85vh"} justifyContent={"center"} alignItems={"center"}>
        <Flex w={"45%"}>
          <Heading as={"h2"} size={"2xl"}>
            It’s easy to get started on HouseHotel
          </Heading>
        </Flex>
        <Box w={"45%"}>
          <Flex
            flexDirection={"row"}
            marginY={5}
            justifyContent={"space-between"}
          >
            <Heading as={"h4"} size={"md"} marginRight={3}>
              1
            </Heading>
            <Flex flexDirection={"column"}>
              <Heading as={"h4"} size={"md"}>
                Tell us about your place
              </Heading>
              <Text>
                Share some basic info, such as where it is and how many guests
                can stay.
              </Text>
            </Flex>
            <Image
              src={
                "https://a0.muscache.com/4ea/air/v2/pictures/bfc0bc89-58cb-4525-a26e-7b23b750ee00.jpg"
              }
              width={"120px"}
            />
          </Flex>
          <Divider />
          <Flex
            flexDirection={"row"}
            marginY={5}
            justifyContent={"space-between"}
          >
            <Heading as={"h4"} size={"md"} marginRight={3}>
              2
            </Heading>
            <Flex flexDirection={"column"}>
              <Heading as={"h4"} size={"md"}>
                Make it stand out
              </Heading>
              <Text>
                Add 5 or more photos plus a title and description – we’ll help
                you out.
              </Text>
            </Flex>
            <Image
              src={
                "https://a0.muscache.com/4ea/air/v2/pictures/c0634c73-9109-4710-8968-3e927df1191c.jpg"
              }
              width={"120px"}
            />
          </Flex>
          <Divider />
          <Flex
            flexDirection={"row"}
            marginY={5}
            justifyContent={"space-between"}
          >
            <Heading as={"h4"} size={"md"} marginRight={3}>
              3
            </Heading>
            <Flex flexDirection={"column"}>
              <Heading as={"h4"} size={"md"}>
                Finish up and publish
              </Heading>
              <Text>
                Choose if you'd like to start with an experienced guest, set a
                starting price and publish your listing.
              </Text>
            </Flex>
            <Image
              src={
                "	https://a0.muscache.com/4ea/air/v2/pictures/da2e1a40-a92b-449e-8575-d8208cc5d409.jpg"
              }
              width={"120px"}
            />
          </Flex>
        </Box>
      </Center>
      <HStack
        width={"100%"}
        justifyContent={"space-between"}
        bg={"gray.50"}
        padding={5}
        position={"fixed"}
        bottom={0}
      >
        <div></div>
        <GradientButton text="Get Started" onClick={onNext} />
      </HStack>
    </>
  );
};

export default GetStarted;
