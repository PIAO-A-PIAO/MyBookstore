"use client";
import React, { useContext } from "react";
import defaultProfile from "@/public/assets/profile.jpg"; // Ensure this path is correct
import { OnboardContext } from "@/app/(my-study)/(need-topbar)/onboard/page";

function UserProfile({
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

  // Handle profile upload
  const handleProfileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData((prevFormData) => ({
          ...prevFormData,
          profile: reader.result as string, // Update the profile field in formData
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  // Handle username change
  const handleUserNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      userName: event.target.value, // Update the userName field in formData
    }));
  };

  // Handle next step
  const handleNextStep = () => {
    if (!formData.userName) {
      alert("Please provide a username.");
      return;
    }

    nextStep(); // Move to the next step
  };

  return (
    <div className="text-center py-24 w-full h-full flex flex-col items-center gap-8">
      <div className="space-y-4 w-1/2">
        <h1>Let us know who you are!</h1>
        <p>
          Please select your profile and pseudonym. This will be shown
          to all your recipients!
        </p>
      </div>
      <div className="flex flex-col items-center">
        <label htmlFor="profile-upload" className="cursor-pointer">
          <img
            className="h-32 w-32 rounded-full border-2 border-gray-300"
            src={formData.profile || defaultProfile.src} // Use formData.profile or default profile
            alt="Profile"
          />
          <input
            id="profile-upload"
            type="file"
            accept="image/*"
            onChange={handleProfileUpload}
            className="hidden"
          />
        </label>
        <input
          type="text"
          placeholder="Enter your name"
          value={formData.userName || ""} // Use formData.userName
          onChange={handleUserNameChange}
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

export default UserProfile;
