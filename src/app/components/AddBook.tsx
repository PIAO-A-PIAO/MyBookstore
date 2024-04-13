import React, { useState, useRef, ChangeEvent } from "react";
import { formatFileSize, isValidISBN } from "../utils";
import { categories } from "../../../public/booklist";
import { verifyBookForm } from "../utils";

interface AddBookProps {
  onCancel: () => void;
}

export interface BookData {
  name: string;
  author: string;
  category: string;
  price: number | null;
  isbn: string;
  image: string;
}

const AddBook: React.FC<AddBookProps> = ({ onCancel }) => {
  const [cover, setCover] = useState<File | null>(null);
  const [bookData, setBookData] = useState<BookData>({
    name: "",
    author: "",
    category: "",
    price: null,
    isbn: "",
    image: "",
  });
  const [errors, setErrors] = useState<{ [key: string]: string | null }>({});

  const onSubmit = () => {
    const formErrors = verifyBookForm(bookData, cover);
    setErrors(formErrors);
    if (Object.keys(formErrors).length === 0) {
      // No errors, submit the form
      console.log("Submitted book data:", bookData);
      onCancel();
    }
  };
  const ref = useRef<HTMLInputElement | null>(null); // Ref is of type RefObject<HTMLInputElement>

  const onImageChange = () => {
    ref.current?.click();
  };
  const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
    const fileList = event.target.files;
    if (fileList && fileList.length > 0) {
      // Only handle the first selected file
      const selectedFile = fileList[0];
      setCover(selectedFile);
      setBookData({ ...bookData, image: `/assets/${selectedFile.name}` });
      console.log(selectedFile);
    }
  };

  const removeImage = () => {
    setCover(null);
    setBookData({ ...bookData, image: "" });
  };

  return (
    <div className="w-full flex flex-col gap-4">
      <div className="w-full flex gap-4">
        {cover ? (
          <div className="flex gap-1 w-1/2">
            <div className="secondary-btn w-full flex items-center">
              <div className="flex w-full gap-3 items-start">
                <div
                  className={`h-12 w-8 overflow-hidden drop-shadow-[2px_2px_0px_rgba(0,0,0,0.25)] ${
                    errors.name ? "border-red-error" : ""
                  }`}
                >
                  <img
                    className="m-1 object-cover"
                    src={URL.createObjectURL(cover)}
                    alt="Book Cover"
                  />
                </div>
                <div className="flex flex-col items-start justify-end">
                  <p>{cover.name}</p>
                  <p>{formatFileSize(cover.size)}</p>
                </div>
              </div>
              <button
                onClick={removeImage}
                className="w-fitz h-full items-start"
              >
                <svg
                  className="h-4 w-4"
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

            {errors.image && (
              <p className="text-red-error text-body4">{errors.image}</p>
            )}
          </div>
        ) : (
          <div className="flex gap-1 w-1/2">
            <button
              onClick={onImageChange}
              className={`secondary-btn w-full flex flex-col items-center justify-center ${
                errors.name ? "border-red-error" : ""
              }`}
            >
              <svg
                className="w-5 h-5 text-gray-800"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 5v9m-5 0H5a1 1 0 0 0-1 1v4c0 .6.4 1 1 1h14c.6 0 1-.4 1-1v-4c0-.6-.4-1-1-1h-2M8 9l4-5 4 5m1 8h0"
                />
              </svg>
              Click to upload book cover
              <input
                type="file"
                ref={ref}
                hidden
                onChange={handleImageChange}
              />
            </button>
            {errors.image && (
              <p className="text-red-error text-body4">{errors.image}</p>
            )}
          </div>
        )}
        <label className="label w-1/2 gap-1">
          Name:
          <input
            className={`input ${errors.name ? "border-red-error" : ""}`}
            type="text"
            name="name"
            required
            value={bookData.name}
            onChange={(e) => setBookData({ ...bookData, name: e.target.value })}
          />
          {errors.name && (
            <p className="text-red-error text-body4">{errors.name}</p>
          )}
        </label>
      </div>
      <div className="w-full flex gap-4">
        <label className="label w-1/2 gap-1">
          ISBN:
          <input
            className={`input ${errors.isbn ? "border-red-error" : ""}`}
            type="text"
            name="isbn"
            required
            value={bookData.isbn}
            onChange={(e) => setBookData({ ...bookData, isbn: e.target.value })}
          />
          {errors.isbn && (
            <p className="text-red-error text-body4">{errors.isbn}</p>
          )}
        </label>
        <label className="label w-1/2 gap-1">
          Author:
          <input
            className={`input ${errors.author ? "border-red-error" : ""}`}
            type="text"
            name="author"
            required
            value={bookData.author}
            onChange={(e) =>
              setBookData({ ...bookData, author: e.target.value })
            }
          />
          {errors.author && (
            <p className="text-red-error text-body4">{errors.author}</p>
          )}
        </label>
      </div>
      <div className="w-full flex gap-4">
        <label className="label w-1/2 gap-1">
          Category:
          <select
            className={`input ${errors.category ? "border-red-error" : ""}`}
            name="category"
            required
            value={bookData.category}
            onChange={(e) =>
              setBookData({ ...bookData, category: e.target.value })
            }
          >
            <option value="">Select a category</option>
            {categories.map((category) => (
              <option value={category}>{category}</option>
            ))}
          </select>
          {errors.category && (
            <p className="text-red-error text-body4">{errors.category}</p>
          )}
        </label>
        <label className="label w-1/2 gap-1">
          Price:
          <div
            className={`input ${
              errors.price ? "border-red-error" : ""
            } flex items-center gap-2`}
          >
            <p>CAD</p>
            <input
              type="text"
              onChange={(e) =>
                setBookData({ ...bookData, price: parseFloat(e.target.value) })
              }
              className="w-full p-0 border-none outline-none focus:ring-0 bg-gray-50"
              required
            />
          </div>
          {errors.price && (
            <p className="text-red-error text-body4">{errors.price}</p>
          )}
        </label>
      </div>
      <div className="w-full flex justify-end">
        <div className="w-fit flex gap-4">
          <button className="secondary-btn" type="button" onClick={onCancel}>
            Cancel
          </button>
          <button className="primary-btn" type="button" onClick={onSubmit}>
            Add Book
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddBook;
