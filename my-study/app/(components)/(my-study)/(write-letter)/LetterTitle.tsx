"use client";
import { useAppDispatch } from "@/app/api/store/store";

import React, { useState, useRef, useEffect } from "react";
import { setCurrentState } from "@/app/api/store/letterSlice";

function LetterTitle() {
  const inputRef = useRef<HTMLInputElement | null>(null); // Create a ref to access the input element

  function getCurrentDateFormatted() {
    const today = new Date();

    // Get the year, month, and day from the Date object
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0"); // Months are zero-based
    const day = String(today.getDate()).padStart(2, "0");

    // Return the formatted date string
    return `${year}${month}${day}`;
  }
  const dispatch = useAppDispatch();
  const dateString = getCurrentDateFormatted();
  const [title, setTitle] = useState("New Letter " + dateString);
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
        <input
          ref={inputRef} // Assign the ref to the input element
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          onBlur={() => {
            setFocused(false);
            dispatch(setCurrentState({ title: title }));
          }} // Blur event to switch back to non-editable state
        />
      ) : (
        <div
          onClick={() => setFocused(true)} // Click event to enable the input field
        >
          {title}
        </div>
      )}
    </>
  );
}

export default LetterTitle;
