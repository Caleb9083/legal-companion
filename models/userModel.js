const { Schema, SchemaTypes, model } = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");

const userSchema = new Schema({
  name: {
    type: SchemaTypes.String,
    required: [true, "Enter your name"],
  },
  email: {
    type: SchemaTypes.String,
    required: [true, "Enter your email"],
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, "Please provide a valid email"],
  },
  password: {
    type: SchemaTypes.String,
    required: [true, "Enter your password"],
  },
  passwordConfirm: {
    type: SchemaTypes.String,
    required: [true, "Please confirm your password"],
    validate: {
      validator: function (el) {
        return el === this.password;
      },
    },
    message: "Passwords are not the same!",
  },
  role: {
    type: SchemaTypes.String,
    enum: ["user", "admin"],
    default: "admin",
  },
});

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  this.password = await bcrypt.hash(this.password, 12);

  this.passwordConfirm = undefined;
  next();
});

userSchema.methods.correctPassword = async function (
  candidatePassword,
  userPassword
) {
  return await bcrypt.compare(candidatePassword, userPassword);
};

const User = model("User", userSchema);

module.exports = User;
