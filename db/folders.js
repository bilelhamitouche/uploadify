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

async function getFolderById(id) {
  try {
    const folder = await prisma.folder.findUnique({
      where: {
        id: id,
      },
    });
    return folder;
  } catch (err) {
    console.log(err);
  } finally {
    await prisma.$disconnect();
  }
}

async function insertFolder(name, parentFolderId, userId) {
  const parentFolder = await getFolderById(parseInt(parentFolderId));
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
            name_userId: {
              name: parentFolder.name,
              userId: userId,
            },
          },
        },
      },
    });
    return folder;
  } catch (err) {
    console.log(err);
  } finally {
    await prisma.$disconnect();
  }
}

async function getCurrentFolder(userId, folderId) {
  try {
    const currentFolder = await prisma.folder.findUnique({
      where: {
        User: {
          id: parseInt(userId),
        },
        id: parseInt(folderId),
      },
      include: {
        subfolders: true,
        files: true,
      },
    });
    return currentFolder;
  } catch (err) {
    console.log(err);
  } finally {
    await prisma.$disconnect();
  }
}

async function deleteFolder(folderId) {
  try {
    await prisma.folder.delete({
      where: {
        id: folderId,
      },
    });
  } catch (err) {
    console.log(err);
  } finally {
    await prisma.$disconnect();
  }
}

async function renameFolder(folderId, folderName) {
  try {
    await prisma.folder.update({
      where: {
        id: folderId,
      },
      data: {
        name: folderName,
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
  getCurrentFolder,
  getFolderById,
  insertFolder,
  deleteFolder,
  renameFolder,
};
