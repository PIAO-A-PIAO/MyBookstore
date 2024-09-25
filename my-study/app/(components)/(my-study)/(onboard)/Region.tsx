"use client";
import React, { useContext } from "react";
import Map from "./Map";
import { OnboardContext } from "@/app/(my-study)/(need-topbar)/onboard/page";

function Region({
  lastStep,
  nextStep,
}: {
  lastStep: () => void;
  nextStep: () => void;
}) {
  const onboardContext = useContext(OnboardContext);

  if (!onboardContext) {
    throw new Error("OnboardContext not found");
  }

  const { formData, setFormData } = onboardContext;
  
  // Function to handle location selection from the Map
  const handleSelectRegion = (selectedRegion: string) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      region: selectedRegion, // Update region in formData
    }));
  };

  // Handle next step
  const handleNextStep = () => {
    if (!formData.region) {
      alert("Please select a region on the map.");
      return;
    }

    nextStep();
  };

  return (
    <div className="text-center py-24 w-full h-full flex flex-col gap-8 items-center">
      <div className="space-y-4 w-1/2">
        <h1>Where are you?</h1>
        <p>
          Tell us your location on the map so we can estimate how long it takes
          to deliver your letters to other users.
        </p>
      </div>
      <div className="h-2/3 aspect-video">
        <Map
          onSelectRegion={handleSelectRegion}
          selectedRegion={formData.region} // Use region from formData
        />
      </div>
      <div className="flex justify-between w-full px-16 py-6 fixed bottom-0">
        <button
          onClick={lastStep}
          className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
        >
          Back
        </button>
        <button
          onClick={handleNextStep}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default Region;
