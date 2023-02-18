const { Schema, model } = require("mongoose");
const bcrypt = require("bcryptjs");
const crypto = require("crypto");

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
  role: {
    type: String,
    enum: ["user", "guide", "lead-guide", "admin"],
    default: "user",
  },
  password: {
    type: String,
    trim: true,
    required: [true, "Please provide a password"],
    minLength: [8, "Password must be minimum 8 character long"],
    maxLength: [32, "Password must be shorter than 32 character"],
    select: false,
  },
  cPassword: {
    type: String,
    trim: true,
    required: [true, "Please confirm your password"],
    validate: {
      // this only works on CREATE & SAVE!!!
      validator: function (el) {
        return el === this.password;
      },
      message: "Passwords are not the same",
    },
    minLength: [8, "Password must be minimum 8 character long"],
    maxLength: [32, "Password must be shorter than 32 character"],
  },
  passwordUpdatedAt: Date,
  passwordResetToken: String,
  passwordResetExpires: Date,
});

userSchema.pre("save", async function (next) {
  // Only run this function if password was actually modified
  if (!this.isModified("password")) return next();

  // Hash the password with cost of 12
  this.password = await bcrypt.hash(this.password, 12);

  // Delete cPassword field
  this.cPassword = undefined;

  next();
});
userSchema.pre("save", async function (next) {
  //Skip if password is not modified or If creation new document
  if (!this.isModified("password") || this.isNew) return next();

  this.passwordUpdatedAt = Date.now() - 1000;
  next();
});

userSchema.methods.isPasswordCorrect = async function (
  candidatePassword,
  userPassword
) {
  return await bcrypt.compare(candidatePassword, userPassword);
};

userSchema.methods.isPassUpdatedAfter = async function (JWTTimestamp) {
  if (this.passwordUpdatedAt) {
    const updatedTimestamp = parseInt(
      this.passwordUpdatedAt.getTime() / 1000,
      10
    );
    return JWTTimestamp < updatedTimestamp;
  }
  return false;
};

userSchema.methods.testGenerate = function () {
  const resetToken = crypto.randomBytes(32).toString("hex");

  this.passwordResetToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

  this.passwordResetExpires = Date.now() + 10 * 60 * 1000;

  return resetToken;
};

const User = model("User", userSchema);

module.exports = User;
