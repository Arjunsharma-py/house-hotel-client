import { Card, CardBody, CardHeader, Center, Divider } from "@chakra-ui/react";
import AuthHeader from "../components/smallComponents/AuthHeader";
import { useState } from "react";
import SignupCard from "../components/signup/SignupCard";
import SignupForm from "../components/signup/SignupForm";
import OTPVerification from "../components/signup/OTPVerification";

const SignupPage = () => {
  const [email, setEmail] = useState("");
  const [step, setStep] = useState("main");

  return (
    <Center>
      <Card variant={"outline"} width={"40rem"} marginY={10}>
        <CardHeader>
          {step === "main" ? (
            <AuthHeader heading={"Login or Sign up"} />
          ) : step === "form" ? (
            <AuthHeader
              heading={"Finish Signup"}
              onBack={() => setStep("main")}
            />
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
            <SignupCard
              onNext={() => setStep("form")}
              onSetEmail={(email) => setEmail(email)}
            />
          ) : step === "form" ? (
            <SignupForm onNext={() => setStep("verify")} email={email} />
          ) : step === "verify" ? (
            <OTPVerification email={email} />
          ) : (
            <></>
          )}
        </CardBody>
      </Card>
    </Center>
  );
};

export default SignupPage;
