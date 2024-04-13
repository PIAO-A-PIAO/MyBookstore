import React from "react";
import { Book } from "../api/booksSlice";

interface BookInfoRowProps {
  book: Book;
}

export const BookInfoRow: React.FC<BookInfoRowProps> = ({ book }) => {
  return (
    <div className="hover:bg-gray-50 grid grid-cols-12 md:gap-6 lg:gap-10 items-center justify-start border-b-2 border-b-gray-200 py-2 md:px-4 lg:px-8">
      <button className="grid col-span-10 grid-cols-subgrid grid-cols-10 md:gap-6 lg:gap-10 items-center text-left">
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
      <div className="flex gap-1 col-span-2 justify-end">
        <button className="flex items-center justify-center w-8 h-8 lg:w-10 lg:h-10 border border-gray-200 rounded-md">
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
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="m14.304 4.844 2.852 2.852M7 7H4a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h11a1 1 0 0 0 1-1v-4.5m2.409-9.91a2.017 2.017 0 0 1 0 2.853l-6.844 6.844L8 14l.713-3.565 6.844-6.844a2.015 2.015 0 0 1 2.852 0Z"
            />
          </svg>
        </button>
        <button className="flex items-center justify-center w-8 h-8 lg:w-10 lg:h-10 border border-gray-200 rounded-md">
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
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M5 7h14m-9 3v8m4-8v8M10 3h4a1 1 0 0 1 1 1v3H9V4a1 1 0 0 1 1-1ZM6 7h12v13a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V7Z"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};
