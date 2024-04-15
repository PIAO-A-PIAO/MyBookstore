import React, { useEffect, useState } from "react";
import { useAppSelector } from "../redux/store";
import { selectMobileView } from "../redux/popupSlice";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (pageNumber: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  const mobileView = useAppSelector(selectMobileView);


  const handleClick = (pageNumber: number) => {
    onPageChange(pageNumber);
  };

  const getPageNumbers = () => {
    // maximum number of visible page numbers
    const maxPageNumbers = mobileView ? 5 : 9;
    const pageNumbers = [];

    if (totalPages <= maxPageNumbers) {
      // if less than or equal to max, display all
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
      }
    } else {
      // if more than maxPageNumbers pages
      if (currentPage <= Math.floor(maxPageNumbers / 2) + 1) {
        // urrent page is close to the beginning
        for (let i = 1; i <= maxPageNumbers - 1; i++) {
          pageNumbers.push(i);
        }
        pageNumbers.push(totalPages);
      } else if (currentPage >= totalPages - Math.floor(maxPageNumbers / 2)) {
        // current page is close to the end
        pageNumbers.push(1);
        for (let i = totalPages - maxPageNumbers + 2; i <= totalPages; i++) {
          pageNumbers.push(i);
        }
      } else {
        // current page is in the middle
        pageNumbers.push(1);
        for (
          let i = currentPage - Math.floor(maxPageNumbers / 2);
          i <= currentPage + Math.floor(maxPageNumbers / 2) - 2;
          i++
        ) {
          pageNumbers.push(i);
        }
        pageNumbers.push(totalPages);
      }
    }

    return pageNumbers;
  };

  const [pageNumbers, setPageNumbers] = useState(getPageNumbers());

  useEffect(() => {
    setPageNumbers(getPageNumbers());
  }, [mobileView, currentPage]);

  return (
    <div id="pagination_container" className="flex justify-center py-4">
      <button
        disabled={currentPage === 1}
        onClick={() => handleClick(currentPage - 1)}
      >
        <svg
          className={`${mobileView ? "w-4 h-4" : "w-6 h-6"} text-gray-600`}
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
            d="m15 19-7-7 7-7"
          />
        </svg>
      </button>
      {pageNumbers.map((pageNumber) => (
        <button
          key={pageNumber}
          className={` py-1 ${
            mobileView ? "text-body4 mx-1 px-2" : "text-body2 mx-2 px-3"
          } ${
            pageNumber === currentPage
              ? "text-black border-b border-black"
              : "text-gray-600"
          } hover:border-b border-gray-600`}
          onClick={() => handleClick(pageNumber)}
        >
          {pageNumber}
        </button>
      ))}
      <button
        disabled={currentPage === totalPages}
        onClick={() => handleClick(currentPage + 1)}
      >
        <svg
          className={`${mobileView ? "w-4 h-4" : "w-6 h-6"} text-gray-600`}
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
            d="m9 5 7 7-7 7"
          />
        </svg>
      </button>
    </div>
  );
};

export default Pagination;
