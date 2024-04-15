"use client";
import React from "react";
import { useAppDispatch, useAppSelector } from "../redux/store";
import {
  handleHidePopup,
  selectShowPopup,
  selectType,
} from "../redux/popupSlice";
import ModifyBook from "./ModifyBook";
import DeleteBook from "./DeleteBook";


const Popup = () => {
  const dispatch = useAppDispatch();
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

  const onClose = () => {
    dispatch(handleHidePopup());
  };

  return showPopup ? (
    <div id="popup_container" className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 px-4 sm:px-20 md:px-40 lg:px-60 xl:px-80">
      <div id="inner_container" className="bg-white flex flex-col w-full rounded-lg p-8 gap-8">
        <div id="header_container" className="w-full h-fit flex justify-between">
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
