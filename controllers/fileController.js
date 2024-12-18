const { insertFile } = require("../db/files");
const path = require("path");
const multer = require("multer");
const { getFolderById } = require("../db/folders");
const upload = multer({ dest: "uploads/" });

const uploadFile = [
  upload.single("file"),
  async (req, res) => {
    const file = req.file;
    console.log(file);
    if (req.params.folderId === "root") {
      await insertFile(
        file.originalname,
        file.path,
        file.mimetype,
        file.size,
        req.user.id,
        "root",
      );
      res.redirect(`/root/folders`);
    } else {
      const folder = await getFolderById(parseInt(req.params.folderId));
      await insertFile(
        file.originalname,
        file.path,
        file.mimetype,
        file.size,
        req.user.id,
        folder.name,
      );
      res.redirect(`/root/folders/${req.params.folderId}`);
    }
  },
];

module.exports = {
  uploadFile,
};
