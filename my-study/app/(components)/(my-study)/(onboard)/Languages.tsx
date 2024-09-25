import React, { useContext } from 'react';
import languages from "@/public/languageList.js";
import LanguageButton from './LanguageButton';
import { OnboardContext } from "@/app/(my-study)/(need-topbar)/onboard/page";

function Languages({ lastStep, nextStep }: { lastStep: () => void; nextStep: () => void }) {
  const onboardContext = useContext(OnboardContext);
  
  if (!onboardContext) {
    throw new Error("OnboardContext not found");
  }
  
  const { formData, setFormData } = onboardContext;

  // Handle language selection change
  const handleLanguageChange = (code: string) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      languages: prevFormData.languages.includes(code)
        ? prevFormData.languages.filter((lang: string) => lang !== code)
        : [...prevFormData.languages, code],
    }));
  };

  // Handle next step
  const handleNextStep = () => {
    if (!formData.languages || formData.languages.length === 0) {
      alert("Please select at least one language.");
      return;
    }

    nextStep(); // Proceed to the next step
  };

  return (
    <div className="text-center py-24 w-full h-full flex flex-col gap-8 items-center">
      <div className="space-y-4 w-1/2">
        <h1>What languages do you use?</h1>
        <p>
          Tell us the languages in which you will write or read so we can
          send your letter to the right person!
        </p>
      </div>
      <div className="h-2/3 aspect-video gap-8 grid grid-cols-4 align-center rounded-lg border border-gray-200 overflow-y-auto p-4">
        {languages.map((lang) => (
          <LanguageButton
            key={lang.code}
            uri={lang.uri}
            name={lang.name}
            isSelected={formData.languages.includes(lang.code)} // Use formData.languages
            onChange={() => handleLanguageChange(lang.code)}
          />
        ))}
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

export default Languages;
