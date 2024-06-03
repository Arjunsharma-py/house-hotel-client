import { Card, CardBody, CardHeader, Center, Divider } from "@chakra-ui/react";
import AuthHeader from "../components/smallComponents/AuthHeader";
import { useState } from "react";
import OTPVerification from "../components/signup/OTPVerification";
import LoginCard from "../components/login/LoginCard";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [step, setStep] = useState<string>("main");

  return (
    <Center>
      <Card variant={"outline"} width={"40rem"} marginY={10}>
        <CardHeader>
          {step === "main" ? (
            <AuthHeader heading={"Login or Sign up"} />
          ) : (
            <AuthHeader
              heading={"Verify email address"}
              onBack={() => setStep("form")}
            />
          )}
        </CardHeader>
        <Divider />
        <CardBody>
          {step === "main" ? (
            <LoginCard
              onNext={() => setStep("form")}
              onSetEmail={(email) => setEmail(email)}
            />
          ) : (
            <OTPVerification email={email} />
          )}
        </CardBody>
      </Card>
    </Center>
  );
};

export default LoginPage;
