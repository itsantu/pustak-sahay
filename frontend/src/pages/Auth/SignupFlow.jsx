import { useState } from "react";
import EmailStep from "../../components/Auth/EmailStep";
import OtpStep from "../../components/Auth/OtpStep";
import DetailsStep from "../../components/Auth/DetailsStep";

const SignupFlow = () => {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");

  return (
    <div>
      {step === 1 && <EmailStep signupReq={true} setStep={setStep} setEmail={setEmail} />}
      {step === 2 && <OtpStep setStep={setStep} email={email} />}
      {step === 3 && <DetailsStep email={email} />}
    </div>
  );
};

export default SignupFlow;
