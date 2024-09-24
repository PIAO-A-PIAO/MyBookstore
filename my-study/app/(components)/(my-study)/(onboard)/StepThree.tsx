import React, { useState, useEffect } from 'react';
import languages from "@/public/languageList.js";
import LanguageButton from './LanguageButton';

function StepThree({ lastStep, nextStep }: { lastStep: () => void; nextStep: () => void }) {
  const [selectedLanguages, setSelectedLanguages] = useState<string[]>([]);

  // Load initial selected languages from sessionStorage
  useEffect(() => {
    const formData = JSON.parse(sessionStorage.getItem("formData") || "{}");
    if (formData.languages) {
      setSelectedLanguages(formData.languages);
    }
  }, []);

  const handleLanguageChange = (code: string) => {
    setSelectedLanguages((prev) => 
      prev.includes(code) 
        ? prev.filter(lang => lang !== code) 
        : [...prev, code]
    );
  };

  const handleNextStep = () => {
    // Save selected languages to sessionStorage when "Next" is clicked
    const formData = JSON.parse(sessionStorage.getItem("formData") || "{}");
    formData.languages = selectedLanguages;
    sessionStorage.setItem("formData", JSON.stringify(formData));

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
            isSelected={selectedLanguages.includes(lang.code)}
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

export default StepThree;
