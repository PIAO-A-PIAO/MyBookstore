"use client";

import FinishOnboard from "@/app/(components)/(my-study)/(onboard)/FinishOnboard";
import Languages from "@/app/(components)/(my-study)/(onboard)/Languages";
import Region from "@/app/(components)/(my-study)/(onboard)/Region";
import RoomName from "@/app/(components)/(my-study)/(onboard)/RoomName";
import UserProfile from "@/app/(components)/(my-study)/(onboard)/UserProfile";
import WelcomeOnboard from "@/app/(components)/(my-study)/(onboard)/WelcomeOnboard";
import React, { createContext, useEffect, useState } from "react";

interface OnboardFormDataProps {
  profile: string;
  userName: string;
  languages: string[];
  region: string;
  roomName: string;
}

interface OnboardContextProps {
  stepNumber: number;
  setStepNumber: React.Dispatch<React.SetStateAction<number>>;
  formData: OnboardFormDataProps; // this should not be undefined anymore
  setFormData: React.Dispatch<React.SetStateAction<OnboardFormDataProps>>;
}

export const OnboardContext = createContext<OnboardContextProps | undefined>(
  undefined
);

const Onboard = () => {
  const [stepNumber, setStepNumber] = useState(0);
  const [formData, setFormData] = useState<OnboardFormDataProps>({
    profile: '',
    userName: '',
    languages: [],
    region: '',
    roomName: ''
  });

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
    setStepNumber(stepNumber + 1);
  };

  return (
    <OnboardContext.Provider
      value={{ stepNumber, setStepNumber, formData, setFormData }}
    >
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
        {stepNumber === 1 && <WelcomeOnboard nextStep={nextStep} />}
        {stepNumber === 2 && (
          <UserProfile lastStep={lastStep} nextStep={nextStep} />
        )}
        {stepNumber === 3 && (
          <Languages lastStep={lastStep} nextStep={nextStep} />
        )}
        {stepNumber === 4 && <Region lastStep={lastStep} nextStep={nextStep} />}
        {stepNumber === 5 && <RoomName lastStep={lastStep} finish={finish} />}
        {stepNumber === 6 && <FinishOnboard />}
      </div>
    </OnboardContext.Provider>
  );
};

export default Onboard;
