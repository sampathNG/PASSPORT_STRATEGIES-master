const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  Id: { type: String },
  username: { type: String },
  fullname: { type: String },
  email: { type: String },
  emaill: { type: String, required: true, unique: true },
  photoUrl: { type: String },
  source: { type: String, required: true },
  screenrName: { type: String },
  businessPhones: { type: Number },
  location: { type: String },
  jobTitle: { type: String },
  mobilePhone: { type: Number },
  officeLocation: { type: String },
  preferredLanguage: { type: String },
  password: { type: String },
  firstname: { type: String },
  lastname: { type: String },
});

const User = new mongoose.model("users", userSchema);
module.exports = User;
