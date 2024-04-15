import React, { useState } from "react";
import { useAppDispatch, useAppSelector } from "../redux/store";
import { handleShowPopup, selectMobileView } from "../redux/popupSlice";
import { BookData } from "../redux/booksSlice";
import { baseUrl } from "../utils";

interface BookInfoRowProps {
  book: BookData;
}

const BookInfoRow: React.FC<BookInfoRowProps> = ({ book }) => {
  const dispatch = useAppDispatch();
  const [isInfoButtonHovered, setIsInfoButtonHovered] = useState(false);
  const mobileView = useAppSelector(selectMobileView);

  const onEdit = () => {
    dispatch(handleShowPopup({ type: "edit", book: book }));
  };

  const onDelete = () => {
    dispatch(handleShowPopup({ type: "delete", book: book }));
  };

  return mobileView ? (
    <div id="container" className="flex w-full p-4">
      <div
        id="card_container"
        className="flex flex-col w-full h-fit border-2 border-gray-200 rounded-md p-4 gap-4"
      >
        <img
          id="image"
          style={{ aspectRatio: "2/3" }}
          src={baseUrl + book.image}
          className="w-2/3 self-center h-full drop-shadow-[6px_6px_0px_rgba(0,0,0,0.25)]"
        />
        <div
          id="info_and_buttons"
          className="flex flex-col items-start justify-between"
        >
          <div id="info_container" className="flex flex-col">
            <div id="basic_info" className="flex flex-col">
              <p className="text-gray-600 text-body5">{book.isbn}</p>
              <p className="text-h6 text-blue-cta">{book.name}</p>
            </div>
            <p className="text-body5">
              {book.author} / {book.category}
            </p>
            <p className="text-h4">${book.price}</p>
          </div>
          <div id="buttons" className="flex w-full items-end gap-2 justify-end">
            <button
              id="edit"
              onClick={onEdit}
              className="flex hover:bg-gray-50 items-center justify-center w-8 aspect-square border-2 border-gray-200 rounded-md bg-white"
            >
              <svg
                className="w-4 aspect-square text-blue-cta"
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
                  d="m14.304 4.844 2.852 2.852M7 7H4a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h11a1 1 0 0 0 1-1v-4.5m2.409-9.91a2.017 2.017 0 0 1 0 2.853l-6.844 6.844L8 14l.713-3.565 6.844-6.844a2.015 2.015 0 0 1 2.852 0Z"
                />
              </svg>
            </button>
            <button
              id="delete"
              onClick={onDelete}
              className="flex hover:bg-gray-50 items-center justify-center w-8 aspect-square border-2 border-gray-200 rounded-md bg-white"
            >
              <svg
                className="w-4 aspect-square text-red-error"
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
      </div>
    </div>
  ) : (
    <div
      id="container"
      className={`${
        isInfoButtonHovered ? "bg-gray-50" : ""
      } grid grid-cols-11  items-center justify-start border-b-2 border-b-gray-200 sm:gap-2 lg:gap-8 sm:px-4 md:px-5 lg:px-8`}
    >
      <button
        id="info_and_buttons"
        onClick={onEdit}
        className="grid col-span-10 grid-cols-subgrid grid-cols-10 sm:gap-4 md:gap-2 lg:gap-6 items-center text-left sm:text-body4 lg:text-body3 md:text-body3 py-4"
        onMouseEnter={() => setIsInfoButtonHovered(true)}
        onMouseLeave={() => setIsInfoButtonHovered(false)}
      >
        <div
          id="image_and_basic_info"
          className="flex col-span-5 items-center justify-start sm:gap-4"
        >
          <img
            src={baseUrl + book.image}
            style={{ aspectRatio: "2/3" }}
            className="w-20 drop-shadow-[5px_5px_0px_rgba(0,0,0,0.25)]"
          />
          <div id="isbn_and_name" className="flex flex-col mb-4">
            <p className="text-gray-600 sm:text-body5 lg:text-body4 h-4">
              {book.isbn}
            </p>
            <p className="sm:text-h6 md:text-h5 text-blue-cta">{book.name}</p>
          </div>
        </div>
        <p className="col-span-2">{book.author}</p>
        <p className="col-span-2">{book.category}</p>
        <p className="col-span-1 sm:text-h6 md:text-h5">${book.price}</p>
      </button>
      <div id="button" className="flex w-full justify-end">
        <button
          id="delete"
          onClick={onDelete}
          className="flex hover:bg-gray-50 items-center justify-center sm:w-6 md:w-8 aspect-square border-2 border-gray-200 rounded-md bg-white"
        >
          <svg
            className="sm:w-4 md:w-6 aspect-square text-red-error"
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

export default BookInfoRow;