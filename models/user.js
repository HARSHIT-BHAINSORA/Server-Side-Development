const mongoose = require("mongoose");
const Schema = mongoose.Schema;
var passportLocalMongoose = require("passport-local-mongoose");

// Now no need of username and password because it is automatically add by the passport plugin

const User = new Schema({
  firstname: {
    type: String,
    default: "",
  },
  lastname: {
    type: String,
    default: "",
  },
  admin: {
    type: Boolean,
    default: false,
  },
});

User.plugin(passportLocalMongoose);
//basically support the hash value of the username.

const Users = mongoose.model("User", User);

module.exports = Users;
