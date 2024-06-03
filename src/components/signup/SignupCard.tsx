import {
  Divider,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Text,
  useToast,
} from "@chakra-ui/react";
import OtherLogin from "../login/OtherLogin";
import GradientButton from "../smallComponents/GradientButton";
import { useState } from "react";
import { GoogleOAuthProvider } from "@react-oauth/google";

interface Props {
  onNext: () => void;
  onSetEmail: (email: string) => void;
}

const SignupCard = ({ onNext, onSetEmail }: Props) => {
  const [email, setEmail] = useState("");
  // const [error, setError] = useState();
  const [isLoading, setIsLoading] = useState(false);

  const toast = useToast();

  const handleSubmit = async () => {
    setIsLoading(true);
    try {
      onSetEmail(email);
      onNext();
    } catch (err) {
      console.log(err);
      toast({
        title: "Failed",
        description: "Something went wrong!",
        isClosable: true,
        duration: 5000,
        status: "error",
      });
    }
    setIsLoading(false);
  };

  return (
    <>
      <Flex flexDir={"column"}>
        <Heading as={"h3"} size={"md"} marginY={5}>
          Welcome to HouseHotel
        </Heading>
        <FormControl marginY={3}>
          <FormLabel htmlFor={"email"}>Email</FormLabel>
          <Input
            id={"email"}
            type="email"
            placeholder={"Email"}
            focusBorderColor="black"
            padding={6}
            onChange={(e) => setEmail(e.target.value)}
          />
        </FormControl>
        <GradientButton
          text="Continue"
          width={"100%"}
          marginY={3}
          onClick={handleSubmit}
          isLoading={isLoading}
        />
      </Flex>
      <Flex marginY={3} alignItems={"center"}>
        <Divider />
        <Text paddingX={5}>or</Text>
        <Divider />
      </Flex>

      <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_SECRET}>
        <OtherLogin />
      </GoogleOAuthProvider>
    </>
  );
};

export default SignupCard;
