const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const { promisify } = require("util");
const AppError = require("../utils/appError");

const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

const createSendToken = (user, statusCode, res) => {
  const token = signToken(user._id);

  const cookieOptions = {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
  };

  if (process.env.NODE_ENV === "production") cookieOptions.secure = true;

  res.cookie("jwt", token, cookieOptions);

  //Remove the password from the output
  user.password = undefined;
  user.role = undefined;

  res.status(statusCode).json({
    status: "success",
    token,
    data: {
      user,
    },
  });
};
exports.signup = async (req, res, next) => {
  try {
    const newUser = await User.create({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      passwordConfirm: req.body.passwordConfirm,
      role: req.body.role,
    });

    createSendToken(newUser, 201, res);
  } catch (error) {
    return next(new AppError(`A user with this email already exists`));
  }
};

exports.signin = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // 1. Check if email and password exists
    if (!email || !password) {
      return next(new AppError("Please provide Email and Password!", 401));
    }

    // 2. Check if the user exists and password is correct
    const user = await User.findOne({ email: email }).select("+password");
    // console.log(user)

    if (!user || !(await user.correctPassword(password, user.password))) {
      return next(new AppError("Incorrect Email or Password!", 401));
    }
    // 3. If everything is okm send token to client
    createSendToken(user, 200, res);
  } catch (error) {
    return next(new AppError("An error was encounted try againg", 400));
  }
};

exports.protect = async (req, res, next) => {
  try {
    // 1. Get the token and check if it exists
    let token;
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];
    }

    if (!token) {
      return next(
        new AppError("You are not logged in! Please login to get access", 400)
      );
    }

    // 2. Verification of token
    const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

    // 3. Check if user still exists
    const currentUser = await User.findById(decoded.id);
    if (!currentUser) {
      return next(
        new AppError("The User belonging to the user does not exit", 401)
      );
    }

    // Grant access to protected route
    req.user = currentUser;
    next();
  } catch (error) {
    return next(
      new AppError("An error was encountered, Please try againg", 400)
    );
  }
};

exports.restrictTo = (...roles) => {
  return (req, res, next) => {
    // roles is an array ["admin", "user"]
    try {
      if (!roles.includes(req.user.role)) {
        return next(
          new AppError("You do not have permission to perform this action", 403)
        );
      }
      return next();
    } catch (error) {
      res.status(400).json({
        status: "fail",
        message: error.message,
      });
    }
  };
};
