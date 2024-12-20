const {
  getRootFolder,
  insertFolder,
  getCurrentFolder,
  getFolderById,
  deleteFolder,
} = require("../db/folders");

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
    await insertFolder(folder, req.params.folderId, req.user.id);
    res.redirect(`/root/folders/${req.params.folderId}`);
  }
}

async function displayCurrentFolder(req, res) {
  const currentFolder = await getCurrentFolder(
    req.user.id,
    req.params.folderId,
  );
  const rootFolder = await getRootFolder(req.user.id);
  const parentFolder = await getFolderById(parseInt(currentFolder.folderId));
  res.render("currentFolder", {
    user: req.user,
    folderId: currentFolder.id,
    folders: currentFolder.subfolders,
    files: currentFolder.files,
    isAuthenticated: req.isAuthenticated(),
    previousPage:
      parentFolder.id === rootFolder.id
        ? "/root/folders"
        : currentFolder.folderId,
  });
}

async function deleteFolderPost(req, res) {
  const currentFolder = await getCurrentFolder(
    req.user.id,
    req.params.folderId,
  );
  await deleteFolder(currentFolder.id);
  const parentFolder = await getFolderById(currentFolder.folderId);
  if (parentFolder.name === "root") {
    res.redirect("/root/folders");
  } else {
    res.redirect(`/root/folders/${currentFolder.folderId}`);
  }
}

module.exports = {
  displayRootFolder,
  displayCurrentFolder,
  createFolder,
  deleteFolderPost,
};
