const UserModel = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const userService = {};
const RequestError = require("../utils/request_error");

userService.getCurrentUser = async (id) => {
  const user = await UserModel.findById(id).select("-password");
  return user;
};

// Write a function to hash the password
userService.hashPassword = async (password) => {
  const hashedPassword = await bcrypt.hash(password, 10);
  return hashedPassword;
};

userService.createUser = async ({ name, email, password }) => {
  const user = await UserModel.findOne({ email });

  if (user) throw new RequestError("This email is already taken", 400);

  const hashedPassword = await userService.hashPassword(password);

  const newUser = await UserModel.create({
    name,
    email,
    password: hashedPassword,
  });

  return newUser;
};

userService.loginUser = async ({ email, password }) => {
  const user = await UserModel.findOne({ email });

  if (!user) throw new RequestError("Invalid email or password", 400);

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) throw new RequestError("Invalid email or password", 400);

  return {
    token: jwt.sign(
      { _id: user._id, name: user.name, email: user.email },
      process.env.JWT_SECRET,
      {
        expiresIn: "1h",
      }
    ),
  };
};

module.exports = userService;
