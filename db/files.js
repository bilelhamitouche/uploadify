const prisma = require("../prisma/prismaClient");

async function insertFile(
  name,
  filePath,
  fileType,
  fileSize,
  userId,
  folderName,
) {
  try {
    const file = await prisma.file.create({
      data: {
        name: name,
        filePath: filePath,
        fileType: fileType,
        fileSize: fileSize,
        User: {
          connect: {
            id: userId,
          },
        },
        Folder: {
          connect: {
            name_userId: {
              name: folderName,
              userId: userId,
            },
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
  insertFile,
};
