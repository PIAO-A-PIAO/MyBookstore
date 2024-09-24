import React from "react";

const LanguageButton = ({
  uri,
  name,
  isSelected,
  onChange,
}: {
  uri: string;
  name: string;
  isSelected: Boolean;
  onChange: () => void;
}) => {
  return (
    <button
      onClick={onChange}
      className={`flex flex-col w-24 h-24 items-center justify-center gap-2 cursor-pointer
      rounded-lg  ${
        isSelected ? "outline outline-blue-400 bg-blue-100" : "bg-gray-50"
      }`}
    >
      <img src={uri} alt={name} className={`w-12 h-12 rounded-md`} />
      <p className="text-sm font-semibold">{name}</p>
    </button>
  );
};

export default LanguageButton;
