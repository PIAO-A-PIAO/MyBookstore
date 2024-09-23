"use client";
import { setUnsentState } from "@/app/api/store/letterSlice";
import ReduxProvider from "@/app/api/store/redux-provider";
import { useAppDispatch } from "@/app/api/store/store";
import React, { useEffect } from "react";

function WriteLetterButton({ unsent }: { unsent: any }) {
  return (
    <a href="/write" className="bg-blue-600 p-4 text-white rounded-lg">
      {unsent.length} Unsent letters - this is a table
    </a>
  );
}

export default WriteLetterButton;
