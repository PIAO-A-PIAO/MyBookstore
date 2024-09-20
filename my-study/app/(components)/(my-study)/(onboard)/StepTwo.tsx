"use client";
import React, { useState, useEffect } from "react";
import defaultProfile from "@/public/assets/profile.jpg"; // Ensure this path is correct

function StepTwo({ lastStep, nextStep }: { lastStep: () => void; nextStep: () => void }) {
  const [image, setImage] = useState<string>(defaultProfile.src); // Initialize with default image source
  const [userName, setUserName] = useState<string>("");

  // Load initial data from sessionStorage
  useEffect(() => {
    const formData = JSON.parse(sessionStorage.getItem("formData") || "{}");
    if (formData) {
      // Set image from sessionStorage or use the default image
      setImage(formData.image || defaultProfile.src);
      setUserName(formData.userName || "");
    }
  }, []);

  // Handle image upload
  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  // Handle username change
  const handleUserNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUserName(event.target.value);
  };

  // Handle next step
  const handleNextStep = () => {
    if (!userName) {
      alert("Please provide a username.");
      return;
    }

    // Save image and username to sessionStorage when "Next" is clicked
    const formData = JSON.parse(sessionStorage.getItem("formData") || "{}");
    formData.image = image === defaultProfile.src ? defaultProfile.src : image; // Keep selected or default image
    formData.userName = userName; // Save username
    sessionStorage.setItem("formData", JSON.stringify(formData));

    nextStep();
  };

  return (
    <div className="text-center py-24 w-full h-full flex flex-col items-center gap-8">
      <div className="space-y-4 w-1/2">
        <h1>Let us know who you are!</h1>
        <p>Please select your profile image and pseudonym. This will be shown to all your recipients!</p>
      </div>
      <div className="flex flex-col items-center">
        <label htmlFor="image-upload" className="cursor-pointer">
          <img
            className="h-32 w-32 rounded-full border-2 border-gray-300"
            src={image}
            alt="Profile"
          />
          <input
            id="image-upload"
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="hidden"
          />
        </label>
        <input
          type="text"
          placeholder="Enter your name"
          value={userName}
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

export default StepTwo;
