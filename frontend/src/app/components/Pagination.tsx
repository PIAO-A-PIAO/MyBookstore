import React, { useState } from "react";

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
  const handleClick = (pageNumber: number) => {
    onPageChange(pageNumber);
  };

  const getPageNumbers = () => {
    const maxPageNumbers = 9; // Maximum number of visible page numbers
    const pageNumbers: number[] = [];

    if (totalPages <= maxPageNumbers) {
      // Less than or equal to 9 pages, display all page numbers
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
      }
    } else {
      // More than 9 pages
      if (currentPage <= 4) {
        // Current page is close to the beginning
        for (let i = 1; i <= 8; i++) {
          pageNumbers.push(i);
        }
        pageNumbers.push(totalPages);
      } else if (currentPage >= totalPages - 4) {
        // Current page is close to the end
        pageNumbers.push(1);
        for (let i = totalPages - 7; i <= totalPages; i++) {
          pageNumbers.push(i);
        }
      } else {
        // Current page is in the middle
        pageNumbers.push(1);
        for (let i = currentPage - 3; i <= currentPage + 3; i++) {
          pageNumbers.push(i);
        }
        pageNumbers.push(totalPages);
      }
    }

    return pageNumbers;
  };

  return (
    <div className="flex justify-center py-4">
      <button
        disabled={currentPage === 1}
        onClick={() => handleClick(currentPage - 1)}
      >
        <svg
          className="w-6 h-6 text-gray-600"
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
      {getPageNumbers().map((pageNumber) => (
        <button
          key={pageNumber}
          className={`mx-2 px-3 py-1 ${
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
          className="w-6 h-6 text-gray-600"
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
