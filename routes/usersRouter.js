const express = require("express");
const passport = require("passport");
const {
  loginUserGet,
  signupUserGet,
  signupUserPost,
  logoutUser,
} = require("../controllers/usersController");

const usersRouter = express.Router();

usersRouter.get("/login", loginUserGet);
usersRouter.get("/logout", logoutUser);
usersRouter.get("/signup", signupUserGet);
usersRouter.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/root/folders",
    failureRedirect: "/users/login",
    failureFlash: true,
  }),
);
usersRouter.post("/signup", signupUserPost);

module.exports = usersRouter;
