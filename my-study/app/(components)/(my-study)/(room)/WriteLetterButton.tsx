"use client"
import { setUnsentState } from "@/app/api/store/letterSlice";
import ReduxProvider from "@/app/api/store/redux-provider";
import { useAppDispatch } from "@/app/api/store/store";
import React, { useEffect } from "react";

function WriteLetterButtonCore({ unsent }: { unsent: any }) {
    const dispatch = useAppDispatch()
    useEffect(()=>{
        if (unsent){
            dispatch(setUnsentState(unsent))
        }
    },[unsent, dispatch])
  return (
    <a href="/write" className="bg-blue-600 p-4 text-white rounded-lg">
      {unsent.length} Unsent letters - this is a table
    </a>
  );
}

function WriteLetterButton({ unsent }: { unsent: any }) {
  return (
    <ReduxProvider>
      <WriteLetterButtonCore unsent={unsent} />
    </ReduxProvider>
  );
}

export default WriteLetterButton;
