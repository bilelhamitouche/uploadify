const express = require("express");
const {
  deleteFilePost,
  renameFilePost,
} = require("../controllers/fileController");

const fileRouter = express.Router({ mergeParams: true });

fileRouter.post("/:fileId/delete", deleteFilePost);
fileRouter.post("/:fileId/rename", renameFilePost);

module.exports = {
  fileRouter,
};
