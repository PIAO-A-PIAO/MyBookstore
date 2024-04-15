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
app.listen(4000, () => console.log("Server ready on port 4000."));

module.exports = app;