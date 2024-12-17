const express = require("express");
const {
  displayRootFolder,
  createFolder,
  displayCurrentFolder,
} = require("../controllers/folderController");
const { ensureAuthenticated } = require("../controllers/authController");

const folderRouter = express.Router();

folderRouter.get("/", ensureAuthenticated, displayRootFolder);
folderRouter.get("/:folderId/", ensureAuthenticated, displayCurrentFolder);
folderRouter.post("/:folderId/create", ensureAuthenticated, createFolder);

module.exports = folderRouter;
