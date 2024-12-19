const express = require("express");
const { homepageGet } = require("../controllers/indexController");
const folderRouter = require("./folderRouter");

const indexRouter = express.Router();

indexRouter.get("/", homepageGet);
indexRouter.use("/root/folders", folderRouter);

module.exports = indexRouter;
