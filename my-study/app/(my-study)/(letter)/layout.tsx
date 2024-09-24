"use client";
import ReduxProvider from "@/app/api/store/redux-provider";
import React, { createContext, useState } from "react";

interface LetterContextProps {
  contents: string[];
  setContents: React.Dispatch<React.SetStateAction<string[]>>;
  currentPage: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
}

export const LetterContext = createContext<LetterContextProps | undefined>(
  undefined
);



const layout = ({ children }: { children: React.ReactNode }) => {
  const [contents, setContents] = useState([""]);
  const [currentPage, setCurrentPage] = useState(0);
  return (
    // <ReduxProvider>
      <LetterContext.Provider
        value={{ contents, setContents, currentPage, setCurrentPage }}
      >
        {children}
      </LetterContext.Provider>
    // </ReduxProvider>
  );
};

export default layout;
