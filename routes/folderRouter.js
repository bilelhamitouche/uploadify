const express = require("express");
const {
  displayRootFolder,
  createFolder,
  displayCurrentFolder,
} = require("../controllers/folderController");
const { ensureAuthenticated } = require("../controllers/authController");
const { uploadFile } = require("../controllers/fileController");

const folderRouter = express.Router();

folderRouter.get("/", ensureAuthenticated, displayRootFolder);
folderRouter.get("/:folderId/", ensureAuthenticated, displayCurrentFolder);
folderRouter.post("/:folderId/create", ensureAuthenticated, createFolder);
folderRouter.post("/:folderId/upload", ensureAuthenticated, uploadFile);

module.exports = folderRouter;
