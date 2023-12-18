const mongoose = require("mongoose");
const passportLocalMongoose = require('passport-local-mongoose');
const findOrCreatePlugin = require("mongoose-findorcreate");

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  }
});

// Set email as the username field and Add passport-local-mongoose as a plugin to handle authentication
userSchema.plugin(passportLocalMongoose, {
  usernameField: "email", // Use 'email' as the unique identifier for login
});
userSchema.plugin(findOrCreatePlugin);

const UserModel = new mongoose.model("Users", userSchema);

module.exports = UserModel;