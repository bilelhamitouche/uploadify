const bcrypt = require("bcrypt");
const { insertUser, getUserByEmail } = require("../db/users");
const { body, validationResult } = require("express-validator");

const alphaErr = "must only contain letters.";
const emailErr = "must be a valid Email address.";
const lengthErr = "must between 2 and 16 characters.";

const validateUser = [
  body("firstName")
    .trim()
    .isAlpha()
    .withMessage(`First name ${alphaErr}`)
    .isLength({ min: 2, max: 16 })
    .withMessage(`First name ${lengthErr}`),
  body("lastName")
    .trim()
    .isAlpha()
    .withMessage(`Last name ${alphaErr}`)
    .isLength({ min: 2, max: 16 })
    .withMessage(`Last name ${lengthErr}`),
  body("email")
    .trim()
    .isEmail()
    .withMessage(`Email ${emailErr}`)
    .custom(async (value) => {
      const user = await getUserByEmail(value);
      if (user) {
        throw new Error("Email already exists!");
      }
    }),
  body("password")
    .trim()
    .isLength({ min: 2, max: 20 })
    .withMessage(`Password must be between 2 and 20 characters`),
  body("confirmPassword")
    .custom((value, { req }) => {
      return value === req.body.password;
    })
    .withMessage(`Passwords confirmation doesn't match password`),
];

function loginUserGet(req, res) {
  res.render("login", { message: req.flash("error") });
}

function signupUserGet(req, res) {
  res.render("signup", { errors: [] });
}

const signupUserPost = [
  validateUser,
  async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).render("signup", { errors: errors.array() });
    }
    const { firstName, lastName, email, password } = req.body;
    bcrypt.hash(password, 10, async (err, hashedPassword) => {
      if (err) {
        return next(err);
      } else {
        try {
          await insertUser(firstName, lastName, email, hashedPassword);
          res.redirect("/users/login");
        } catch (err) {
          return next(err);
        }
      }
    });
  },
];

module.exports = {
  loginUserGet,
  signupUserGet,
  signupUserPost,
};
