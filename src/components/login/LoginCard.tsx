import OtherLogin from "../login/OtherLogin";
import { Link as ReactRouterLink, useNavigate } from "react-router-dom";
import GradientButton from "../smallComponents/GradientButton";
import { useContext, useState } from "react";
import { FieldValues, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import APIClient from "../../services/apiClient";
import axios from "axios";
import {
  Button,
  Divider,
  Flex,
  FormControl,
  FormHelperText,
  FormLabel,
  Heading,
  Input,
  InputGroup,
  InputRightElement,
  Link,
  Text,
  useToast,
} from "@chakra-ui/react";
import User from "../../interfaces/User";
import { UserContext } from "../../contexts/UserProvider";
import { GoogleOAuthProvider } from "@react-oauth/google";

interface Props {
  onNext: () => void;
  onSetEmail: (email: string) => void;
}
interface LoginPayload {
  email: string;
  password: string;
}
const schema = z.object({
  email: z.string().email(),
  password: z
    .string()
    .regex(
      /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@#$%^&+=]).{8,}$/,
      "Password must be complex"
    )
    .min(8, "Enter your password with length 8"),
});

interface ResendEmail {
  email: string;
}

type FormData = z.infer<typeof schema>;

const LoginCard = ({ onNext, onSetEmail }: Props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [showPass, setShowPass] = useState(false);

  const userContext = useContext(UserContext);
  const navigate = useNavigate();
  const toast = useToast();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const apiClient = new APIClient<User>("auth/login");

  const submitData = async (data: FieldValues) => {
    const payload: LoginPayload = {
      email: data.email,
      password: data.password,
    };
    setIsLoading(true);
    try {
      const response = await apiClient.post<LoginPayload>(payload);
      if (response.error?.code === "USER_NOT_VERIFIED") {
        const apiClient = new APIClient("user/send-otp");
        const response = await apiClient.post<ResendEmail>({
          email: payload.email,
        });
        toast({
          status: "success",
          title: "Success",
          description: response.message,
          isClosable: true,
          duration: 5000,
        });
        onSetEmail(payload.email);
        onNext();
      } else {
        sessionStorage.setItem(
          "HouseHotelUser",
          JSON.stringify(response.result)
        );
        userContext.setUser(response.result);
        toast({
          status: "success",
          title: "Success",
          description: response.message,
          isClosable: true,
          duration: 5000,
        });
        navigate("/");
      }
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
      setIsLoading(false);
    }
  };

  return (
    <>
      <Flex flexDir={"column"}>
        <Heading as={"h3"} size={"md"} marginY={5}>
          Welcome to HouseHotel
        </Heading>
        <FormControl marginY={5} isRequired>
          <FormLabel htmlFor="email" fontSize={"md"} fontWeight={"600"}>
            Email
          </FormLabel>
          <Input
            id="email"
            type="email"
            placeholder="Email"
            {...register("email")}
            focusBorderColor="black"
          />
          {errors.email && (
            <FormHelperText color="red.500">
              {errors.email.message}
            </FormHelperText>
          )}
          <FormHelperText>
            We'll email you trip confirmations and receipts.
          </FormHelperText>
        </FormControl>
        <FormControl marginY={5} isRequired>
          <FormLabel htmlFor="password" fontSize={"md"} fontWeight={"600"}>
            Password
          </FormLabel>
          <InputGroup>
            <Input
              id="password"
              focusBorderColor="black"
              type={showPass ? "text" : "password"}
              placeholder="Password"
              {...register("password")}
            />
            <InputRightElement h={"full"}>
              <Button
                variant={"ghost"}
                onClick={() => setShowPass((showPass) => !showPass)}
              >
                {showPass ? <ViewIcon /> : <ViewOffIcon />}
              </Button>
            </InputRightElement>
          </InputGroup>
          {errors.password && (
            <FormHelperText color="red.500">
              {errors.password.message}
            </FormHelperText>
          )}
        </FormControl>

        <Text fontSize={"xs"} color="gray.700" marginY={5}>
          By selecting <strong>Agree and continue</strong>, I agree to
          HouseHotel’s
          <Link
            as={ReactRouterLink}
            textDecoration={"underline"}
            color={"blue.500"}
          >
            Terms of Service, Payments Terms of Service
          </Link>
          , and{" "}
          <Link
            as={ReactRouterLink}
            textDecoration={"underline"}
            color={"blue.500"}
          >
            Nondiscrimination Policy
          </Link>{" "}
          and acknowledge the{" "}
          <Link
            as={ReactRouterLink}
            textDecoration={"underline"}
            color={"blue.500"}
          >
            Privacy Policy
          </Link>
          .
        </Text>
        <GradientButton
          text={"Login"}
          width={"100%"}
          paddingY={6}
          onClick={handleSubmit(submitData)}
          isLoading={isLoading}
        />
      </Flex>
      <Flex marginY={3} alignItems={"center"}>
        <Divider />
        <Text paddingX={5}>or</Text>
        <Divider />
      </Flex>

      <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_SECRET}>
        <OtherLogin text="Sign Up" endpoint="signup" />
      </GoogleOAuthProvider>
    </>
  );
};

export default LoginCard;
