"use client";
import ReduxProvider from "@/app/api/store/redux-provider";
import React from "react";
import WriteLetterHeader from "@/app/(components)/(my-study)/(write-letter)/WriteLetterHeader";
import WriteLetterMiddle from "@/app/(components)/(my-study)/(write-letter)/WriteLetterMiddle";
import WriteLetterFooter from "@/app/(components)/(my-study)/(write-letter)/WriteLetterFooter";

function WriteLetter() {
  return (
    <div className="relative flex flex-col w-screen h-screen bg-gray-100">
      <ReduxProvider>
        <WriteLetterHeader />
        <WriteLetterMiddle />
        <WriteLetterFooter />
      </ReduxProvider>
    </div>
  );
}

export default WriteLetter;
