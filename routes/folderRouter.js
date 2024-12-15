const express = require("express");
const {
  displayRootFolder,
  createFolder,
} = require("../controllers/folderController");
const { ensureAuthenticated } = require("../controllers/authController");

const folderRouter = express.Router();

folderRouter.get("/", ensureAuthenticated, displayRootFolder);
folderRouter.post("/:folderId/create", ensureAuthenticated, createFolder);

module.exports = folderRouter;
