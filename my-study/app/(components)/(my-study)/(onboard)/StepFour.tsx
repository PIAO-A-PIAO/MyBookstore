"use client";
import React, { useEffect, useState } from "react";
import Map from "./Map";

function StepFour({
  lastStep,
  nextStep,
}: {
  lastStep: () => void;
  nextStep: () => void;
}) {
  const [region, setRegion] = useState<string | null>(null); // State for selected location

  useEffect(() => {
    const formData = JSON.parse(sessionStorage.getItem("formData") || "{}");
    // Set the location from formData if it exists
    setRegion(formData.location || null);
  }, []);

  // Function to handle location selection from the Map
  const handleSelectRegion = (selectedRegion: string) => {
    setRegion(selectedRegion);
  };

  // Handle next step and save location to sessionStorage
  const handleNextStep = () => {
    if (!region) {
      alert("Please select a region on the map.");
      return;
    }

    // Save the selected region to sessionStorage
    const formData = JSON.parse(sessionStorage.getItem("formData") || "{}");
    formData.region = region; // Save selected region
    sessionStorage.setItem("formData", JSON.stringify(formData));

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
          selectedRegion={region}
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

export default StepFour;
