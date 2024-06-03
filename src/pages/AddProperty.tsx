import { useState } from "react";
import GetStarted from "../components/AddProperty/GetStarted";
import PropertyForm from "../components/AddProperty/PropertyForm";
import HouseVerification from "../components/AddProperty/HouseVerification";

const AddProperty = () => {
  const [step, setStep] = useState("getstarted");

  return (
    <>
      {step === "getstarted" ? (
        <GetStarted onNext={() => setStep("form")} />
      ) : step === "form" ? (
        <PropertyForm
          onBack={() => setStep("getstarted")}
          onNext={() => setStep("verify")}
        />
      ) : (
        <HouseVerification />
      )}
    </>
  );
};

export default AddProperty;
