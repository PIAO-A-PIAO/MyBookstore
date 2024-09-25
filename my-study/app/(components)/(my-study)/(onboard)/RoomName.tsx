"use client";
import React, { useContext, useState } from "react";
import { OnboardContext } from "@/app/(my-study)/(need-topbar)/onboard/page";

function RoomName({
  lastStep,
  finish,
}: {
  lastStep: () => void;
  finish: () => void;
}) {
  const onboardContext = useContext(OnboardContext);

  if (!onboardContext) {
    throw new Error("OnboardContext not found");
  }

  const { formData, setFormData } = onboardContext;
  const [roomName, setRoomName] = useState<string>(formData.roomName || "");

  // Handle input change
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRoomName(event.target.value);
  };

  // Handle next step and submit data
  async function handleNextStep() {
    // Update the formData with the room name
    setFormData((prevFormData) => ({
      ...prevFormData,
      roomName,
    }));

    // Submit the complete form data
    const response = await fetch(`/api/Users/onboard`, {
      method: "POST",
      body: JSON.stringify({ ...formData, roomName }), // Send updated formData
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      console.error("Submit form failed");
      return;
    } else {
      finish(); // Finish onboarding
    }
  }

  return (
    <div className="text-center py-24 w-full h-full flex flex-col gap-8 items-center">
      <div className="space-y-4 w-1/2">
        <h1>How would you like to name your study room?</h1>
        <p>Name your study room.</p>
      </div>
      <div className="h-2/3 aspect-video">
        <input
          type="text"
          placeholder="Enter study room name"
          value={roomName}
          onChange={handleInputChange}
          className="border border-gray-300 rounded py-2 px-4 my-4"
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

export default RoomName;
