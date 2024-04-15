import { BookData, selectBooks } from "./redux/booksSlice";
// export const baseUrl = "http://localhost:4000"
export const baseUrl = "https://my-bookstore-fmt1.onrender.com"
export function isValidISBN(isbn: string): boolean {
  // Regular expression to match the ISBN format (10 or 13 digits)
  const isbnRegex = /^(?=(?:\D*\d){10}(?:(?:\D*\d){3})?$)[\d-]+$/;

  // Remove any hyphens from the ISBN string
  const cleanedISBN = isbn.replace(/-/g, "");

  // Check if the ISBN matches the regex pattern
  return isbnRegex.test(cleanedISBN);
}

export function verifyBookForm(
  bookData: BookData,
  books: BookData[],
  type: string
) {
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
}

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

// Assuming filePath is a URL
export function getFileFromPath(filePath: string): Promise<File | null> {
  return new Promise((resolve, reject) => {
    fetch(filePath)
      .then((response) => response.blob())
      .then((blob) => {
        // Extract the file name from the URL
        const fileName = filePath.substring(filePath.lastIndexOf("/") + 1);
        // Create a File object
        const file = new File([blob], fileName, { type: blob.type });
        resolve(file);
      })
      .catch((error) => reject(error));
  });
}

export function equalObj(obj1: any, obj2: any) {
  const values1 = Object.values(obj1);
  const values2 = Object.values(obj2);

  // Check if the length of both arrays of values is the same
  if (values1.length !== values2.length) {
    return false;
  }

  // Sort the arrays of values to ensure consistent order for comparison
  values1.sort();
  values2.sort();

  // Compare each value in the arrays
  for (let i = 0; i < values1.length; i++) {
    if (values1[i] !== values2[i]) {
      return false;
    }
  }

  // All values are equal
  return true;
}

export function objAllFilled(obj: any) {
  // Iterate through the values of the object
  for (const value of Object.values(obj)) {
    // Check if the value is null, undefined, or an empty string
    if (value === null || value === undefined || value === "") {
      return false; // Return false if any value is not filled
    }
  }
  return true; // Return true if all values are filled
}

export function trimFileName(name: string): string {
  if (name.length <= 20) {
    return name;
  }
  return name.substring(0, 18) + "...";
}
