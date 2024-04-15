import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../redux/store";
import { handleHideAlert, selectAlertProps } from "../redux/alertSlice";

const Alert = () => {
  const { success, message, showAlert } = useAppSelector(selectAlertProps);
  const dispatch = useAppDispatch();

  const onHideAlert = () => {
    dispatch(handleHideAlert());
  };

  // if user doesn't close alert in 10 secs, it automatically collapes
  useEffect(() => {
    if (showAlert) {
      setTimeout(() => {
        onHideAlert();
      }, 10000);
    }
  }, [showAlert]);

  return showAlert ? (
    <div id="alert_container"
      className={`fixed z-10 top-2 rounded-md justify-self-center flex w-fit w-max-1/3 h-fit gap-2 p-4 text-white ${
        success ? "bg-blue-cta" : "bg-red-error"
      }`}
    >
      <div id="message">{message}</div>
      <button id="close" onClick={onHideAlert}>
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
  ) : null;
}

export default Alert;
