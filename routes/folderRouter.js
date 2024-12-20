const express = require("express");
const {
  displayRootFolder,
  createFolder,
  displayCurrentFolder,
  deleteFolderPost,
  renameFolderPost,
} = require("../controllers/folderController");
const { ensureAuthenticated } = require("../controllers/authController");
const { uploadFile } = require("../controllers/fileController");
const { fileRouter } = require("./fileRouter");

const folderRouter = express.Router();

folderRouter.get("/", ensureAuthenticated, displayRootFolder);
folderRouter.get("/:folderId/", ensureAuthenticated, displayCurrentFolder);
folderRouter.post("/:folderId/create", ensureAuthenticated, createFolder);
folderRouter.post("/:folderId/upload", ensureAuthenticated, uploadFile);
folderRouter.post("/:folderId/delete", ensureAuthenticated, deleteFolderPost);
folderRouter.post("/:folderId/rename", ensureAuthenticated, renameFolderPost);
folderRouter.use("/:folderId/files", fileRouter);

module.exports = folderRouter;
