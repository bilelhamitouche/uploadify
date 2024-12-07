const express = require("express");
const { homepageGet } = require("../controllers/indexController");

const indexRouter = express.Router();

indexRouter.get("/", homepageGet);

module.exports = indexRouter;
