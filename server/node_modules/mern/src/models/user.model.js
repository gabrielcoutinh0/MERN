const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const User = new mongoose.Schema(
  {
    name: String,
    email: String,
    type: { type: Number, default: 1 },
    password: String,
  },
  {
    timestamps: true,
  }
);

User.pre("save", function (next) {
  if (!this.isModified("password")) {
    return next();
  }
  this.password = bcrypt.hashSync(this.password, 10);
  next();
});

User.pre("findOneAndUpdate", function (next) {
  var cryptPassword = this.getUpdate().password + "";
  if (cryptPassword.length < 55) {
    this.getUpdate().password = bcrypt.hashSync(cryptPassword, 10);
  }
  next();
});

const users = mongoose.model("Users", User);
module.exports = users;
