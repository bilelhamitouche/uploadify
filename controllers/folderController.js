const { getRootFolder } = require("../db/folders");

async function displayRootFolder(req, res) {
  const rootFolder = await getRootFolder(req.user.id);
  res.render("userFolder", {
    user: req.user,
    folders: rootFolder.subfolders,
    files: rootFolder.files,
    isAuthenticated: req.isAuthenticated(),
  });
}

module.exports = {
  displayRootFolder,
};
