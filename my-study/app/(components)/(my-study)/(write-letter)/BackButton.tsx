import { LetterContext } from "@/app/(my-study)/(letter)/layout";
import { useRouter } from "next/navigation";
import React, { useContext } from "react";

function BackButton() {
  const router = useRouter();
  const letterContext = useContext(LetterContext);
  if (!letterContext) {
    throw new Error("NoLetterContext");
  }
  const { showModal, setShowModal } = letterContext;
  return (
    <button className="flex" onClick={() => setShowModal("back")}>
      <img src="./assets/icons/left.svg" />
      Back
    </button>
  );
}

export default BackButton;
