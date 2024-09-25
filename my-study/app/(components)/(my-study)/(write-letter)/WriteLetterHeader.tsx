"use client";
import React, { useState } from "react";
import BackButton from "./BackButton";
import LetterTitle from "./LetterTitle";
import DraftsDropdown from "./DraftsDropdown";

function WriteLetterHeader() {
  const [showDropdown, setShowDropdown] = useState(false);
  const switchDropdown = () => setShowDropdown((prev) => !prev);
  return (
    <div id="header" className="w-full border-b grid grid-cols-3 py-4 px-8">
      <BackButton />
      <LetterTitle switchDropdown={switchDropdown} />
      {showDropdown && <DraftsDropdown/>}
      <div className="flex"></div>
    </div>
  );
}

export default WriteLetterHeader;
