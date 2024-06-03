import {
  Button,
  Center,
  FormControl,
  FormHelperText,
  HStack,
  Heading,
  PinInput,
  PinInputField,
  Text,
  VStack,
  useToast,
} from "@chakra-ui/react";
import GradientButton from "../smallComponents/GradientButton";
import APIClient from "../../services/apiClient";
import { useContext, useState } from "react";
import axios from "axios";
import { UserContext } from "../../contexts/UserProvider";
import { useNavigate } from "react-router-dom";
import User from "../../interfaces/User";

interface Props {
  email: string;
}

interface ResendEmail {
  email: string;
}

interface VerifyEmail {
  email: string;
  otp: string;
}

const OTPVerification = ({ email }: Props) => {
  const [otp, setOtp] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string>("");
  1;

  const userContext = useContext(UserContext);
  const navigate = useNavigate();
  const toast = useToast();

  const handleResendOTP = async () => {
    try {
      const apiClient = new APIClient("user/send-otp");
      const response = await apiClient.post<ResendEmail>({ email: email });
      toast({
        status: "success",
        title: "Success",
        description: response.message,
        isClosable: true,
        duration: 5000,
      });
    } catch (err) {
      console.log(err);
      toast({
        status: "success",
        title: "Success",
        description: "Something Went wrong",
        isClosable: true,
        duration: 5000,
      });
    }
  };

  const handleSubmit = async () => {
    if (!otp || otp.length !== 6) {
      setError("Please enter valid otp");
      return;
    }
    setIsLoading(true);
    try {
      const apiClient = new APIClient<User>("user/verify-otp");
      const response = await apiClient.post<VerifyEmail>({
        email: email,
        otp: otp,
      });
      toast({
        status: "success",
        title: "Success",
        description: response.message,
        isClosable: true,
        duration: 5000,
      });
      sessionStorage.setItem("HouseHotelUser", JSON.stringify(response.result));
      userContext.setUser(response.result);
      navigate("/");
    } catch (err) {
      setIsLoading(false);
      if (axios.isAxiosError(err)) {
        setError(err.response?.data.error.message);
      }
      console.log(err);
    }
  };

  const handlePinChange = (value: string) => {
    setOtp(value);
    setError("");
  };

  return (
    <>
      <VStack marginY={10}>
        <Heading as={"h3"} size={"lg"}>
          Verification
        </Heading>
        <Text>An OTP has been send to your provided email address.</Text>
      </VStack>
      <FormControl marginY={10}>
        <Center>
          <HStack>
            <PinInput id="otp" onChange={handlePinChange} size={"lg"} otp>
              <PinInputField />
              <PinInputField />
              <PinInputField />
              <PinInputField />
              <PinInputField />
              <PinInputField onKeyDown={handleSubmit} />
            </PinInput>
          </HStack>
        </Center>
        {error && (
          <FormHelperText textAlign={"center"} color={"red.500"}>
            {error}
          </FormHelperText>
        )}
      </FormControl>
      <Text textAlign={"center"}>
        Didn't recieved an email{" "}
        <Button variant={"link"} color={"blue.500"} onClick={handleResendOTP}>
          Resend
        </Button>
      </Text>
      <GradientButton
        text="Verify"
        width={"100%"}
        marginY={10}
        onClick={handleSubmit}
        isLoading={isLoading}
      />
    </>
  );
};

export default OTPVerification;
