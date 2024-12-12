const prisma = require("../prisma/prismaClient");

async function getRootFolder(userId) {
  const rootFolder = await prisma.folder.findUnique({
    where: {
      name_userId: {
        name: "root",
        userId: userId,
      },
    },
    include: {
      subfolders: true,
      files: true,
    },
  });
  return rootFolder;
}

module.exports = {
  getRootFolder,
};
