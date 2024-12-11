const { getRootFolder } = require("../db/folders");

async function displayRootFolder(req, res) {
  const rootFolder = await getRootFolder(req.user.id);
  res.render("userFolder", { user: req.user, rootFolder: rootFolder });
}

module.exports = {
  displayRootFolder,
};
