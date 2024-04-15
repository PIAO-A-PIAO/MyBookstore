import { BookData } from "./redux/booksSlice";

export const baseUrl = "https://my-bookstore-fmt1.onrender.com";
// export const baseUrl = "http://localhost:4000";

export function isValidISBN(isbn: string): boolean {
  const isbnRegex = /^(?=(?:\D*\d){10}(?:(?:\D*\d){3})?$)[\d-]+$/;
  const cleanedISBN = isbn.replace(/-/g, "");
  return isbnRegex.test(cleanedISBN);
}

export const verifyBookForm = (
  bookData: BookData,
  books: BookData[],
  type: string
) => {
  const errors: { [key: string]: string | null } = {};

  if (!bookData.name.trim()) {
    errors.name = "Name is required";
  }

  if (!isValidISBN(bookData.isbn)) {
    errors.isbn = "Invalid ISBN format";
  }
  if (
    type === "add" &&
    books.some((book: BookData) => book.isbn === bookData.isbn)
  ) {
    errors.general = "Book with this ISBN already exists";
  }

  if (!bookData.author.trim()) {
    errors.author = "Author is required";
  }

  if (!bookData.category.trim()) {
    errors.category = "Category is required";
  }

  if (!bookData.price.trim()) {
    errors.price = "Price is required";
  }

  if (!bookData.image) {
    errors.image = "Cover image is required";
  }

  return errors;
};

export const formatFileSize = (sizeInBytes: number): string => {
  if (sizeInBytes === 0) return "0 Bytes";
  const units = ["Bytes", "KB", "MB", "GB", "TB"];
  const digitGroups = Math.floor(Math.log(sizeInBytes) / Math.log(1024));
  return (
    parseFloat((sizeInBytes / Math.pow(1024, digitGroups)).toFixed(2)) +
    " " +
    units[digitGroups]
  );
};

export const basename = (path: string): string => {
  return path.split("/").reverse()[0];
};

export type FileData = string | ArrayBuffer | null;

export const getFileFromPath = (filePath: string): Promise<File | null> => {
  return new Promise((resolve, reject) => {
    fetch(filePath)
      .then((response) => response.blob())
      .then((blob) => {
        const fileName = filePath.substring(filePath.lastIndexOf("/") + 1);
        const file = new File([blob], fileName, { type: blob.type });
        resolve(file);
      })
      .catch((error) => reject(error));
  });
};

export const equalObj = (obj1: any, obj2: any) => {
  const values1 = Object.values(obj1);
  const values2 = Object.values(obj2);

  if (values1.length !== values2.length) {
    return false;
  }

  values1.sort();
  values2.sort();

  for (let i = 0; i < values1.length; i++) {
    if (values1[i] !== values2[i]) {
      return false;
    }
  }

  return true;
};

export const objAllFilled = (obj: any) => {
  for (const value of Object.values(obj)) {
    if (value === null || value === undefined || value === "") {
      return false;
    }
  }
  return true;
};

export function trimFileName(name: string): string {
  if (name.length <= 20) {
    return name;
  }
  return name.substring(0, 18) + "...";
}
