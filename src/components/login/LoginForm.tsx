import {
  Button,
  FormControl,
  FormHelperText,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  Link,
  Text,
  useToast,
} from "@chakra-ui/react";
import { Link as ReactRouterLink } from "react-router-dom";
import GradientButton from "../smallComponents/GradientButton";
import { useState } from "react";
import { FieldValues, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import APIClient from "../../services/apiClient";
import axios from "axios";

interface RegisterationPayload {
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

type FormData = z.infer<typeof schema>;

interface Props {
  email: string;
  onNext: () => void;
}

const LoginForm = ({ email, onNext }: Props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [showPass, setShowPass] = useState(false);

  const toast = useToast();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: { email: email },
  });

  const apiClient = new APIClient("/user");

  const submitData = async (data: FieldValues) => {
    const payload: RegisterationPayload = {
      email: data.email,
      password: data.password,
    };
    console.log(data);
    setIsLoading(true);
    try {
      const response = await apiClient.post<RegisterationPayload>(payload);
      toast({
        title: "Success",
        description: response.message,
        status: "success",
      });
      setIsLoading(false);
      onNext();
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
      <FormControl marginY={10} isRequired>
        <FormLabel htmlFor="email" fontSize={"md"} fontWeight={"600"}>
          Email
        </FormLabel>
        <Input
          id="email"
          type="email"
          placeholder="Email"
          {...register("email")}
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
      <FormControl marginY={10} isRequired>
        <FormLabel htmlFor="password" fontSize={"md"} fontWeight={"600"}>
          Password
        </FormLabel>
        <InputGroup>
          <Input
            id="password"
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
    </>
  );
};

export default LoginForm;
