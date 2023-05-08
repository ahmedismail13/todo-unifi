const userService = require("../services/user");
const userValiation = require("../validations/user");
require("../utils/request_error");

const userController = {};

userController.getCurrentUser = async (req, res, next) => {
  try {
    const { id } = req.user;

    const user = await userService.getCurrentUser(id);

    return res.status(200).send(user);
  } catch (err) {
    next(err);
  }
};

userController.createUser = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    const { error } = userValiation.createUser.validate({
      name,
      email,
      password,
    });

    if (error) throw new RequestError(error.details[0].message, 400);

    const user = await userService.createUser({ name, email, password });

    return res.status(201).send(user);
  } catch (err) {
    next(err);
  }
};

userController.loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const { error } = userValiation.loginUser.validate({
      email,
      password,
    });

    if (error) throw new RequestError(error.details[0].message, 400);

    const user = await userService.loginUser({ email, password });

    return res.status(200).send(user);
  } catch (err) {
    next(err);
  }
};

module.exports = userController;
