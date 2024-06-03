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
  name: string;
  dob: Date;
  email: string;
  password: string;
}

const schema = z.object({
  firstname: z
    .string()
    .min(3, { message: "Enter your first name with atleast 3 characters." }),
  lastname: z.string(),
  dob: z.string().date(),
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

const SignupForm = ({ email, onNext }: Props) => {
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
      name: data.firstname + (data.lastname ? ` ${data.lastname}` : ""),
      email: data.email,
      dob: data.dob,
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
        <FormLabel htmlFor="firstname" fontSize={"md"} fontWeight={"600"}>
          Full Name
        </FormLabel>
        <Input
          id="firstname"
          type="text"
          placeholder="Firstname on Govt. ID"
          paddingY={6}
          focusBorderColor="black"
          {...register("firstname")}
        />
        {errors.firstname && (
          <FormHelperText color="red.500">
            {errors.firstname.message}
          </FormHelperText>
        )}
        <Input
          id="lastname"
          type="text"
          paddingY={6}
          focusBorderColor="black"
          placeholder="Lastname on Govt. ID"
          {...register("lastname")}
        />
        {errors.lastname && (
          <FormHelperText color="red.500">
            {errors.lastname.message}
          </FormHelperText>
        )}
        <FormHelperText>
          Make sure this matches the name on your government ID. If you go by
          another name, you can add a preferred first name.
        </FormHelperText>
      </FormControl>
      <FormControl marginY={10} isRequired>
        <FormLabel htmlFor="dob" fontSize={"md"} fontWeight={"600"}>
          DOB
        </FormLabel>
        <Input
          id="dob"
          type="date"
          placeholder="Date of Birth"
          paddingY={6}
          focusBorderColor="black"
          {...register("dob")}
        />
        {errors.dob && (
          <FormHelperText color="red.500">{errors.dob.message}</FormHelperText>
        )}
        <FormHelperText>
          To sign up, you need to be at least 18. Your birthday won’t be shared
          with other people who use HouseHotel.
        </FormHelperText>
      </FormControl>
      <FormControl marginY={10} isRequired>
        <FormLabel htmlFor="email" fontSize={"md"} fontWeight={"600"}>
          Contact info
        </FormLabel>
        <Input
          id="email"
          type="email"
          placeholder="Email"
          paddingY={6}
          focusBorderColor="black"
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
            paddingY={6}
            focusBorderColor="black"
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
        <FormHelperText>
          We'll email you trip confirmations and receipts.
        </FormHelperText>
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
        text={"Agree and continue"}
        width={"100%"}
        paddingY={6}
        onClick={handleSubmit(submitData)}
        isLoading={isLoading}
      />
    </>
  );
};

export default SignupForm;
