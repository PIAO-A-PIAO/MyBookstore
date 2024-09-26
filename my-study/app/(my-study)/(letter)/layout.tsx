"use client";
import ArchiveModal from "@/app/(components)/(my-study)/(write-letter)/(modals)/ArchiveModal";
import BackModal from "@/app/(components)/(my-study)/(write-letter)/(modals)/BackModal";
import SwitchModal from "@/app/(components)/(my-study)/(write-letter)/(modals)/SwitchModal";
import  {selectDraftsState}  from "@/app/api/store/draftsSlice";
import { useAppSelector } from "@/app/api/store/store";
import React, { createContext, useState } from "react";

interface formDataProps {
  _id: string;
  recipientId: string;
  contents: string[];
  attachments: string[];
  title: string;
  stampUsed: string;
}

interface LetterContextProps {
  edited: boolean;
  setEdited: React.Dispatch<React.SetStateAction<boolean>>;
  formData: formDataProps;
  setFormData: React.Dispatch<React.SetStateAction<formDataProps>>;
  currentPage: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
  showModal: string;
  setShowModal: React.Dispatch<React.SetStateAction<string>>;
}

export const LetterContext = createContext<LetterContextProps | undefined>(
  undefined
);

export const getCurrentDateFormatted = () => {
  const today = new Date();

  // Get the year, month, and day from the Date object
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, "0"); // Months are zero-based
  const day = String(today.getDate()).padStart(2, "0");

  // Return the formatted date string
  return `${year}${month}${day}`;
};
const dateString = getCurrentDateFormatted();

export const updateFormData = (formData: formDataProps, draft: any) => {
  Object.keys(draft).forEach((key) => {
    // Check if the key exists in initialFormData
    if (key in formData) {
      formData[key as keyof formDataProps] = draft[key];
    }
  });
};

const layout = ({ children }: { children: React.ReactNode }) => {
  const drafts = useAppSelector(selectDraftsState);

  const initialFormData = {
    _id: "",
    recipientId: "",
    contents: [""],
    attachments: [""],
    title: "New Letter " + dateString,
    stampUsed: "",
  };

  if (drafts.drafts.length > 0) {
    const firstDraft = drafts.drafts[0];
    updateFormData(initialFormData, firstDraft);
  }

  const [formData, setFormData] = useState<formDataProps>(initialFormData);
  const [currentPage, setCurrentPage] = useState(0);
  const [showModal, setShowModal] = useState("");
  const [edited, setEdited] = useState(false);
  return (
    // <ReduxProvider>
    <LetterContext.Provider
      value={{
        edited,
        setEdited,
        formData,
        setFormData,
        currentPage,
        setCurrentPage,
        showModal,
        setShowModal,
      }}
    >
      {showModal === "back" && <BackModal />}
      {showModal === "archive" && <ArchiveModal />}
      {showModal === "switch" && <SwitchModal />}
      {children}
    </LetterContext.Provider>
    // </ReduxProvider>
  );
};

export default layout;
