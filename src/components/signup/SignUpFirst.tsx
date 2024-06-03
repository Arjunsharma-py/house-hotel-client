import { Flex, FormControl, FormLabel, Heading, Input } from "@chakra-ui/react";
import GradientButton from "../smallComponents/GradientButton";

const SignUpFirst = () => {
  return (
    <Flex flexDir={"column"}>
      <Heading as={"h3"} size={"md"} marginY={5}>
        Welcome to HouseHotel
      </Heading>
      <FormControl marginY={3}>
        <FormLabel htmlFor={"email"}>Email</FormLabel>
        <Input id={"email"} placeholder={"Email"} />
      </FormControl>
      <GradientButton
        text="Continue"
        width={"100%"}
        marginY={3}
        onClick={() => {}}
      />
    </Flex>
  );
};

export default SignUpFirst;
