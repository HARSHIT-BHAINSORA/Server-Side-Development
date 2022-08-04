var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");

var session = require("express-session");
var FileStore = require("session-file-store")(session);

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
var dishRouter = require("./routes/dishes");
var leaderRouter = require("./routes/leader");
var promoRouter = require("./routes/promotion");

const mongoose = require("mongoose");
const Dishes = require("./models/dishes");

const url = "mongodb://localhost:27017/conFusion";
const connect = mongoose.connect(url);

connect
  .then((db) => {
    console.log("Connected correctly to server");
  })
  .catch((err) => {
    console.log(err);
  });

var app = express();

app.use(express.json());

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

// Connection with server of database

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(
  session({
    name: "session-id",
    secret: "124434323-4352-2323423-24342556",
    saveUninitialized: false,
    resave: false,
    store: new FileStore(),
  })
);

// secret key in parser

var save_session = function (req, user) {
  req.session.user = user;
};

function auth(req, res, next) {
  console.log(req.session);

  if (!req.session.user) {
    var authHeader = req.headers.authorization;

    if (authHeader === null) {
      // we need to challenages over client to auth -> user
      var err = new Error("YOU are Not Authenticated!");
      res.setHeader("WWW-Authenticate", "Basic");
      err.status = 401;
      // next skip all middleware and jump into in error handler
      return next(err);
    }

    // extract the info from header it is a String in type
    // here we are trying to split the authHeader - Basic<space> "Uncoded Value"
    // we say split it acc to space and store in array so first part is Basic and second will be info[1]index
    const b64auth = (req.headers.authorization || "").split(" ")[1] || " ";
    const [username, password] = Buffer.from(b64auth, "base64")
      .toString()
      .split(":");

    if (username === "admin" && password === "password") {
      // res.session.user = "admin";
      save_session(req, "admin");
      next(); // from the auth it will match to the next middleware
    } else {
      var err = new Error("Send Correct username and password!");
      res.setHeader("WWW-Authenticate", "Basic");
      err.status = 401;
      return next(err);
    }
  } else {
    if (req.session.user === "admin") {
      console.log("req.session: ", req.session);
      next();
    } else {
      var err = new Error("Not Authenticated...");
      err.status = 401;
      return next(err);
    }
  }
}

// first accessing any thing user should be authorised
app.use(auth);

// sever static data from the public folder
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/dishes", dishRouter);
app.use("/leader", leaderRouter);
app.use("/promotion", promoRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
