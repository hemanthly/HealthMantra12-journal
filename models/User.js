const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

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
    },
    password: {
      type: String,
      required: true,
    },
  });

// Hash the password before saving it to the database
userSchema.pre('save', async function (next) {
    try {
      // Only hash the password if it has been modified or is new
      if (!this.isModified('password')) {
        return next();
      }
      const hashedPassword = await bcrypt.hash(this.password, 10);
      this.password = hashedPassword;
      
      next();
    } catch (error) {
      next(error);
    }

  });

  const User = new mongoose.model("User", userSchema);