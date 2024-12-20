const prisma = require("../prisma/prismaClient");

async function getUserByEmail(email) {
  const user = await prisma.user.findUnique({
    where: {
      email: email,
    },
  });
  return user;
}

async function getUserById(id) {
  const user = await prisma.user.findUnique({
    where: {
      id: id,
    },
  });
  return user;
}

async function getUsers() {
  const users = await prisma.user.findMany();
  return users;
}

async function insertUser(firstName, lastName, email, password) {
  const user = await prisma.user.create({
    data: {
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: password,
      folders: {
        create: {
          name: "root",
        },
      },
    },
  });
}

module.exports = {
  getUserByEmail,
  getUserById,
  getUsers,
  insertUser,
};
