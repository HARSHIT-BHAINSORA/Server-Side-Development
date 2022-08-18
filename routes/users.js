const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const User = require("../models/user.js");
var passport = require("passport");
const { authenticate } = require("passport");
var authenticated = require("../authenticate");
const Users = require("../models/user.js");

var router = express.Router();
router.use(bodyParser.json());
router.use(express.urlencoded({ extended: true }));

router.get(
  "/",
  authenticated.verifyUser,
  authenticated.verifyAdmin,
  (req, res, next) => {
    Users.find({}, (err, users) => {
      if (err) {
        return next(err);
      } else {
        res.statusCode = 200;
        res.setHeader("Content_type", "application/json");
        res.json(users);
      }
    });
  }
);

router.post("/signup", (req, res, next) => {
  User.register(
    new User({ username: req.body.username }),
    req.body.password,
    (err, user) => {
      if (err) {
        res.statusCode = 500;
        res.setHeader("Content-Type", "application/json");
        res.json({ err: err });
      } else {
        if (req.body.firstname) user.firstname = req.body.firstname;
        if (req.body.lastname) user.lastname = req.body.lastname;
        user.save((err, user) => {
          if (err) {
            res.statusCode = 500;
            res.setHeader("Content-Type", "application/json");
            res.json({ err: err });
            return;
          }
          passport.authenticate("local")(req, res, () => {
            res.statusCode = 200;
            res.setHeader("Content-Type", "application/json");
            res.json({ success: true, status: "Registration Successful!" });
          });
        });
      }
    }
  );
});

router.post("/login", passport.authenticate("local"), (req, res, next) => {
  var token = authenticated.getToken({ _id: req.user._id });
  res.statusCode = 200;
  res.setHeader("Content-Type", "application/json");
  res.json({
    success: true,
    token: token,
    status: "You are Successful logging!",
  });
});

router.get("/logout", (req, res, next) => {
  if (req.session) {
    req.session.destroy();
    res.clearCookie("session-id");
    res.redirect("/");
  } else {
    var err = new Error("You are not logged in ! ");
    err.status = 403;
    next(err);
  }
});
module.exports = router;
