const prisma = require("../prisma/prismaClient");

async function getRootFolder(userId) {
  try {
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
  } catch (err) {
    console.log(err);
  } finally {
    await prisma.$disconnect();
  }
}

async function insertFolder(name, parentFolderId, userId) {
  try {
    const folder = await prisma.folder.create({
      data: {
        name: name,
        User: {
          connect: {
            id: userId,
          },
        },
        parentFolder: {
          connect: {
            id: parentFolderId,
          },
        },
      },
    });
  } catch (err) {
    console.log(err);
  } finally {
    await prisma.$disconnect();
  }
}

module.exports = {
  getRootFolder,
  insertFolder,
};
