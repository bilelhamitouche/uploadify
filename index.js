const express = require("express");
const path = require("path");
const bcrypt = require("bcrypt");
const expressSession = require("express-session");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const { PrismaSessionStore } = require("@quixo3/prisma-session-store");
const { PrismaClient } = require("@prisma/client");
const flash = require("connect-flash");
const indexRouter = require("./routes/indexRouter");
const { getUserByEmail, getUserById } = require("./db/users");
const usersRouter = require("./routes/usersRouter");
require("dotenv").config();

const app = express();
const port = process.env.PORT || 8000;

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));
app.use(
  expressSession({
    cookie: {
      maxAge: 7 * 24 * 60 * 60 * 1000,
    },
    secret: process.env.SECRET,
    resave: true,
    saveUninitialized: false,
    store: new PrismaSessionStore(new PrismaClient(), {
      checkPeriod: 2 * 60 * 1000,
      dbRecordIdIsSessionId: true,
      dbRecordIdFunction: undefined,
    }),
  }),
);

async function verifyCallback(username, password, done) {
  try {
    const user = await getUserByEmail(username);
    if (!user) {
      return done(null, false, { message: "Incorrect email, try again!" });
    }
    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return done(null, false, { message: "Incorrect password, try again!" });
    }
    return done(null, user);
  } catch (err) {
    return done(err);
  }
}
const passportLocalStrategy = new LocalStrategy(verifyCallback);
passport.use(passportLocalStrategy);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (userId, done) => {
  try {
    const user = await getUserById(userId);
    done(null, user);
  } catch (err) {
    done(err);
  }
});
app.use(flash());
app.use(passport.session());

app.use("/", indexRouter);
app.use("/users", usersRouter);

app.use((err, req, res, next) => {
  res.status(500).send("Something went wrong!");
});

app.listen(port, () => {
  console.log("Server listening on port", port);
});
