const express = require("express");
const { displayRootFolder } = require("../controllers/folderController");
const { ensureAuthenticated } = require("../controllers/authController");

const folderRouter = express.Router();

folderRouter.get("/", ensureAuthenticated, displayRootFolder);

module.exports = folderRouter;
