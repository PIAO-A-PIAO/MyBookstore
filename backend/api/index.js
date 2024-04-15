const express = require("express");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const cors = require("cors");
const { v4: uuidv4 } = require("uuid");

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static("public"));

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/assets");
  },
  filename: (req, file, cb) => {
    console.log(file);
    cb(null, file.originalname);
  },
});
const upload = multer({ storage: storage });

// Define a route to serve the booklist JSON file
app.get("/", (req, res) => {
  res.send("Server is now running");
});
app.get("/booklist", (req, res) => {
  // Send the booklist.json file
  res.sendFile(path.join(__dirname, "public", "booklist.json"));
});

app.get("/categories", (req, res) => {
  // Send the categories.json file
  res.sendFile(path.join(__dirname, "public", "categories.json"));
});

app.get("/assets/:imageName", (req, res) => {
  // Extract the image name from the request parameters
  const imageName = req.params.imageName;
  // Send the image file
  res.sendFile(path.join(__dirname, "public", "assets", imageName));
});

app.post("/add-cover", upload.single("cover"), (req, res) => {});

app.post("/add-book", (req, res) => {
  try {
    const book = req.body; // Assuming the request body contains the book data

    // Generate a unique bookId
    const bookId = uuidv4();
    book.bookId = bookId;

    // Read the existing booklist.json file
    const bookListPath = path.join(__dirname, "public", "booklist.json");
    let bookList = [];
    if (fs.existsSync(bookListPath)) {
      bookList = JSON.parse(fs.readFileSync(bookListPath, "utf8"));
    }

    // Add the new book to the book list
    bookList.push(book);

    // Write the updated book list back to file
    fs.writeFileSync(bookListPath, JSON.stringify(bookList, null, 2));

    res
      .status(200)
      .json({ message: "Book added successfully!", bookId: bookId });
  } catch (error) {
    console.error("Error adding book:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.post("/delete-book", (req, res) => {
  try {
    const { bookId } = req.body; // Assuming the request body contains the bookId of the book to be deleted

    // Read the existing booklist.json file
    const bookListPath = path.join(__dirname, "public", "booklist.json");
    let bookList = [];
    if (fs.existsSync(bookListPath)) {
      bookList = JSON.parse(fs.readFileSync(bookListPath, "utf8"));
    }

    // Find the index of the book with the specified bookId
    const index = bookList.findIndex((book) => book.bookId === bookId);

    if (index !== -1) {
      // Extract the path to the image of the book
      const imagePath = path.join(__dirname, "public", bookList[index].image);

      // Delete the book from the booklist
      bookList.splice(index, 1);

      // Write the updated book list back to file
      fs.writeFileSync(bookListPath, JSON.stringify(bookList, null, 2));

      // Delete the corresponding image file
      fs.unlink(imagePath, (err) => {
        if (err) {
          console.error("Error deleting image:", err);
          // Handle error appropriately
        } else {
          console.log("Image deleted successfully");
          // Image deleted successfully
        }
      });

      res.status(200).json({ message: "Book deleted successfully!" });
    } else {
      res.status(404).json({ error: "Book not found!" });
    }
  } catch (error) {
    console.error("Error deleting book:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.post("/edit-book", (req, res) => {
  try {
    const { updatedBook, coverImage } = req.body; // Assuming the request body contains the updated book data
    // Read the existing booklist.json file
    const bookListPath = path.join(__dirname, "public", "booklist.json");
    let bookList = [];
    if (fs.existsSync(bookListPath)) {
      bookList = JSON.parse(fs.readFileSync(bookListPath, "utf8"));
    }

    // Find the index of the book with the specified bookId
    const index = bookList.findIndex(
      (book) => book.bookId === updatedBook.bookId
    );

    if (index !== -1) {
      // Update the book in the booklist
      if (coverImage) {
        const imagePath = path.join(__dirname, "public", coverImage);
        fs.unlink(imagePath, (err) => {
          if (err) {
            console.error("Error deleting image:", err);
            // Handle error appropriately
          } else {
            console.log("Image deleted successfully");
            // Image deleted successfully
          }
        });
      }

      bookList[index] = updatedBook;

      // Write the updated book list back to file
      fs.writeFileSync(bookListPath, JSON.stringify(bookList, null, 2));

      res.status(200).json({ message: "Book updated successfully!" });
    } else {
      res.status(404).json({ error: "Book not found!" });
    }
  } catch (error) {
    console.error("Error updating book:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.listen(4000, () => {
  console.log("Server is running on port 4000");
});
