"use client";
import StepOne from "@/app/(components)/(my-study)/(onboard)/StepOne";
import StepTwo from "@/app/(components)/(my-study)/(onboard)/StepTwo";
import StepThree from "@/app/(components)/(my-study)/(onboard)/StepThree";
import StepFour from "@/app/(components)/(my-study)/(onboard)/StepFour";
import StepFive from "@/app/(components)/(my-study)/(onboard)/StepFive";
import StepSix from "@/app/(components)/(my-study)/(onboard)/StepSix";
import React, { useEffect, useState } from "react";
const Onboard = () => {
  const [stepNumber, setStepNumber] = useState(0);
  useEffect(() => {
    const res = JSON.parse(sessionStorage.getItem("stepNumber") || "{}");
    if (typeof res === "number") {
      setStepNumber(res);
    } else {
      sessionStorage.setItem("stepNumber", "1");
      setStepNumber(1);
    }
  }, []);

  const lastStep = () => {
    sessionStorage.setItem("stepNumber", (stepNumber - 1).toString());
    setStepNumber(stepNumber - 1);
  };

  const nextStep = () => {
    sessionStorage.setItem("stepNumber", (stepNumber + 1).toString());
    setStepNumber(stepNumber + 1);
  };

  const finish = () => {
    sessionStorage.removeItem("stepNumber");
    setStepNumber(stepNumber+1)
  }

  return (
    <div className="flex flex-col items-center justify-center w-full h-full bg-white">
      {stepNumber >= 2 && stepNumber <= 5 && (
        <div className="w-1/2">
          <div className="w-full bg-gray-200 rounded-full">
            <div
              className="bg-blue-600 h-2 rounded-full"
              style={{ width: `${((stepNumber - 1) / 4) * 100}%` }}
            />
          </div>
          <div className="flex justify-between">
            <span>{stepNumber - 1}/4</span>
            <span>4/4</span>
          </div>
        </div>
      )}
      {stepNumber === 1 && <StepOne nextStep={nextStep} />}
      {stepNumber === 2 && <StepTwo lastStep={lastStep} nextStep={nextStep} />}
      {stepNumber === 3 && (
        <StepThree lastStep={lastStep} nextStep={nextStep} />
      )}
      {stepNumber === 4 && <StepFour lastStep={lastStep} nextStep={nextStep} />}
      {stepNumber === 5 && <StepFive lastStep={lastStep} finish={finish} />}
      {stepNumber === 6 && <StepSix/>}
    </div>
  );
};

export default Onboard;
