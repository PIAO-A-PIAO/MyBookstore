"use client";
import React from "react";
import { useAppDispatch, useAppSelector } from "../redux/store";
import {
  handleHidePopup,
  selectShowPopup,
  selectTitle,
  selectType,
} from "../redux/popupSlice";
import ModifyBook from "./ModifyBook";
import DeleteBook from "./DeleteBook";

interface PopupProps {
  children: React.ReactNode; // Declaring type of children
}

const Popup: React.FC<PopupProps> = ({ children }) => {
  const showPopup = useAppSelector(selectShowPopup);
  const type = useAppSelector(selectType);
  const title = (() => {
    switch (type) {
      case "add":
        return "Add New Book";
      case "edit":
        return "Edit Book";
      case "delete":
        return "Delete Book";
      default:
        return "";
    }
  })();
  const dispatch = useAppDispatch();
  const onClose = () => {
    dispatch(handleHidePopup());
  };
  return showPopup ? (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
      <div className="bg-white flex flex-col w-full lg:w-1/2 rounded-lg p-8 gap-8">
        <div className="w-full h-fit flex justify-between">
          <p className="text-h4">{title}</p>
          <button onClick={onClose}>
            <svg
              className="h-6 w-6"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
        {type === "delete" ? <DeleteBook /> : <ModifyBook />}
      </div>
    </div>
  ) : null;
};

export default Popup;
