const { getRootFolder, insertFolder } = require("../db/folders");

async function displayRootFolder(req, res) {
  const rootFolder = await getRootFolder(req.user.id);
  res.render("userFolder", {
    user: req.user,
    folders: rootFolder.subfolders,
    files: rootFolder.files,
    isAuthenticated: req.isAuthenticated(),
  });
}

async function createFolder(req, res) {
  const { folder } = req.body;
  if (req.params.folderId === "root") {
    const parentFolder = await getRootFolder(req.user.id);
    await insertFolder(folder, parentFolder.id, req.user.id);
    res.redirect("/root/folders");
  } else {
    await insertFolder(folder, req.folderId, req.user.id);
    res.redirect(`/root/folders/${req.params.folderId}`);
  }
}

module.exports = {
  displayRootFolder,
  createFolder,
};
