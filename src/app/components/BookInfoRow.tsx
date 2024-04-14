import React, { useState } from "react";
import { useAppDispatch } from "../redux/store";
import { handleShowPopup, setCurrentBook } from "../redux/popupSlice";
import { BookData } from "../redux/booksSlice";

interface BookInfoRowProps {
  book: BookData;
}

export const BookInfoRow: React.FC<BookInfoRowProps> = ({ book }) => {
  const dispatch = useAppDispatch();
  const [isInfoButtonHovered, setIsInfoButtonHovered] = useState(false);

  const onEdit = () => {
    dispatch(handleShowPopup({ type: "edit", book: book }));
  };

  const onDelete = () => {
    dispatch(handleShowPopup({ type: "delete", book: book}));
  };

  return (
    <div
      id="container"
      className={`${
        isInfoButtonHovered ? "bg-gray-50" : ""
      } grid grid-cols-11 md:gap-6 lg:gap-10 items-center justify-start border-b-2 border-b-gray-200 py-4 md:px-4 lg:px-8`}
    >
      <button
        id="info"
        onClick={onEdit}
        className="grid col-span-10 grid-cols-subgrid grid-cols-10 md:gap-6 lg:gap-10 items-center text-left"
        onMouseEnter={() => setIsInfoButtonHovered(true)}
        onMouseLeave={() => setIsInfoButtonHovered(false)}
      >
        <div className="flex col-span-5 items-center justify-start gap-8 mb-1">
          <img
            src={book.image}
            style={{ aspectRatio: "2/3" }}
            className="w-20 drop-shadow-[5px_5px_0px_rgba(0,0,0,0.25)]"
          />
          <p className="text-cap3 lg:text-cap2">{book.name}</p>
        </div>
        <p className="text-body4 lg:text-body3 col-span-2">{book.author}</p>
        <p className="text-body4 lg:text-body3 col-span-2">{book.category}</p>

        <div className="text-body4 lg:text-body3">${book.price}</div>
      </button>
      <div className="flex gap justify-end">
        <button
          id="delete"
          onClick={onDelete}
          className="flex hover:bg-gray-50 items-center justify-center w-8 h-8 lg:w-10 lg:h-10 border border-gray-200 rounded-md bg-white"
        >
          <svg
            className="w-4 h-4 lg:w-6 lg:h-6 text-gray-800"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M5 7h14m-9 3v8m4-8v8M10 3h4a1 1 0 0 1 1 1v3H9V4a1 1 0 0 1 1-1ZM6 7h12v13a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V7Z"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};
