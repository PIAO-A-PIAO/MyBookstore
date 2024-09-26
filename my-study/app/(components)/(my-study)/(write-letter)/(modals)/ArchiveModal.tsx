import { LetterContext } from "@/app/(my-study)/(letter)/layout";
import { useRouter } from "next/navigation";
import React, { useContext } from "react";

function ArchiveModal() {
  const letterContext = useContext(LetterContext);
  if (!letterContext) throw new Error("no letter context");
  const { setShowModal } = letterContext;
  const router = useRouter();
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="flex flex-col items-center justify-center w-1/3 p-6 bg-white rounded-md shadow-lg">
        <div className="mb-6 text-center">
          <p>Draft is saved!</p>
        </div>
        <div className="flex gap-4 ">
          <button
            onClick={() => {
              setShowModal("");
            }}
            className="px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600"
          >
            Continue Editing
          </button>
          <button
            onClick={() => {
              router.push("/room");
            }}
            className="px-4 py-2 text-white bg-red-500 rounded hover:bg-red-600"
          >
            Exit
          </button>
        </div>
      </div>
    </div>
  );
}

export default ArchiveModal;
