const { Schema, model } = require("mongoose");
const { default: isEmail } = require("validator/lib/isemail");

const userSchema = new Schema({
  name: {
    type: String,
    trim: true,
    required: [true, "Please tell us tour name!"],
  },
  email: {
    type: String,
    trim: true,
    required: [true, "Please provide your email"],
    unique: true,
    lowercase: true,
    validate: [isEmail, "Please provide a valid email"],
  },
  profilePic: String,
  password: {
    type: String,
    trim: true,
    required: [true, "Please provide a password"],
    minLength: [8, "Password must be minimum 8 character long"],
    maxLength: [32, "Password must be shorter than 32 character"],
  },
  cPassword: {
    type: String,
    trim: true,
    required: [true, "Please confirm your password"],
    minLength: [8, "Password must be minimum 8 character long"],
    maxLength: [32, "Password must be shorter than 32 character"],
  },
});

const User = model("User", userSchema);

module.exports = User;
