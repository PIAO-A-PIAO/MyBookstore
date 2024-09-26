import {
  getCurrentDateFormatted,
  LetterContext,
  updateFormData,
} from "@/app/(my-study)/(letter)/layout";
import { selectDraftsState } from "@/app/api/store/draftsSlice";
import { useAppSelector } from "@/app/api/store/store";
import React, { useContext } from "react";

function DraftsDropdown() {
  const drafts = useAppSelector(selectDraftsState);
  const dateString = getCurrentDateFormatted();
  const tempFormData = {
    _id: "",
    recipientId: "",
    contents: [""],
    attachments: [""],
    title: "New Letter " + dateString,
    stampUsed: "",
  };
  const letterContext = useContext(LetterContext);
  if (!letterContext) {
    throw new Error("No LetterContext");
  }
  const { formData, setFormData, edited, setShowModal } = letterContext;
  return (
    <div className="absolute top-10 left-1/3 w-1/3 bg-white border mt-2 z-10">
      <ul>
        <li
          onClick={() => {
            if (edited) {
              setShowModal("switch");
              return;
            }
            setFormData(tempFormData);
          }}
          className="cursor-pointer p-2 hover:bg-gray-200"
        >
          New Letter
        </li>
        {drafts.drafts.map((draft: any, index: number) => (
          <li
            onClick={() => {
              if (edited) {
                setShowModal("switch");
                return;
              }

              updateFormData(tempFormData, draft);
              setFormData(tempFormData);
            }}
            key={index}
            className={`cursor-pointer p-2 hover:bg-gray-200 ${
              draft._id === formData._id ? "bg-gray-300 cursor-not-allowed" : ""
            }`}
          >
            {draft.title}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default DraftsDropdown;
