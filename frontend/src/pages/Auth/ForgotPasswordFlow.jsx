import { useState } from "react";
import EmailStep from "../../components/Auth/EmailStep";
import OtpStep from "../../components/Auth/OtpStep";
import DetailsStep from "../../components/Auth/DetailsStep";
import ForgotPasswordDetails from "../../components/Auth/ForgotPasswordDetails";


const ForgotPasswordFlow = () => {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");

  return (
    <div>
      {step === 1 && <EmailStep signupReq={false} setStep={setStep} setEmail={setEmail} />}
      {step === 2 && <OtpStep setStep={setStep} email={email} />}
      {step === 3 && <ForgotPasswordDetails email={email} />}
    </div>
  );
};

export default ForgotPasswordFlow;
