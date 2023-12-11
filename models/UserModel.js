const mongoose = require("mongoose");
const passportLocalMongoose = require('passport-local-mongoose');
const bcrypt = require("bcrypt");

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

// Add passport-local-mongoose as a plugin to handle authentication
// userSchema.plugin(passportLocalMongoose);

// Hash the password before saving it to the database
// userSchema.pre("save", async function (next) {
//   try {
//     // Only hash the password if it has been modified or is new
//     if (!this.isModified("password")) {
//       return next();
//     }
//     const hashedPassword = await bcrypt.hash(this.password, 10);
//     this.password = hashedPassword;

//     next();
//   } catch (error) {
//     next(error);
//   }
// });

// // Method to compare the entered password with the hashed password in the database
// userSchema.methods.isValidPassword = async function (password) {
//   try {
//     return await bcrypt.compare(password, this.password);
//   } catch (error) {
//     throw new Error(error);
//   }
// };

const UserModel = new mongoose.model("Users", userSchema);

module.exports = UserModel;
