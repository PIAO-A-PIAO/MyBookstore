"use client";
import { useAppDispatch } from "@/app/api/store/store";

import React, { useState, useRef, useEffect, useContext } from "react";
import { LetterContext } from "@/app/(my-study)/(letter)/layout";
import DraftsDropdown from "./DraftsDropdown";

function LetterTitle({ switchDropdown }: { switchDropdown: () => void }) {
  const inputRef = useRef<HTMLInputElement | null>(null); // Create a ref to access the input element

  const letterContext = useContext(LetterContext);
  if (!letterContext) {
    throw new Error("Invalid context");
  }
  const { formData, setFormData, setEdited } = letterContext;

  const [focused, setFocused] = useState(false);
  // Automatically focus on the input when it becomes editable
  useEffect(() => {
    if (focused && inputRef.current) {
      inputRef.current.focus();
    }
  }, [focused]);

  return (
    <>
      {focused ? (
        <div className="w-full flex">
          <input
            ref={inputRef} // Assign the ref to the input element
            value={formData.title}
            onChange={(e) => {
              setEdited(true);
              setFormData((prevData) => ({
                ...prevData,
                title: e.target.value,
              }));
            }}
            onBlur={() => {
              setFocused(false);
            }} // Blur event to switch back to non-editable state
          />
        </div>
      ) : (
        <div className="w-full flex-col">
          <div className="flex">
            <div onClick={() => setFocused(true)}>{formData.title}</div>
            <button onClick={switchDropdown}>
              <img src="./assets/icons/down.svg" />
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default LetterTitle;
