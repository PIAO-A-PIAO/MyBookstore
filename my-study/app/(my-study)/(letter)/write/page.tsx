"use server";
import React from "react";
import WriteLetterHeader from "@/app/(components)/(my-study)/(write-letter)/WriteLetterHeader";
import WriteLetterMiddle from "@/app/(components)/(my-study)/(write-letter)/WriteLetterMiddle";
import WriteLetterFooter from "@/app/(components)/(my-study)/(write-letter)/WriteLetterFooter";
import { cookies } from "next/headers";

function WriteLetter() {
  const token = cookies().get("token");
  return (
    <div className="relative flex flex-col w-screen h-screen bg-gray-100">
      <WriteLetterHeader />
      <WriteLetterMiddle />
      <WriteLetterFooter token={token?.value} />
    </div>
  );
}

export default WriteLetter;
