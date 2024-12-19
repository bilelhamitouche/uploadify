const express = require("express");
const { deleteFilePost } = require("../controllers/fileController");

const fileRouter = express.Router({ mergeParams: true });

fileRouter.post("/:fileId/delete", deleteFilePost);

module.exports = {
  fileRouter,
};
