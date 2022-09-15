const UserModel = require("../models/user.model.js");
const jwt = require("jsonwebtoken");
const { signUpErrors, loginErrors } = require("../utils/errors.utils");

const maxAge = 3 * 60 * 60 * 1000;
const createToken = (id) => {
  return jwt.sign({ id }, process.env.TOKEN_SECRET, {
    expiresIn: maxAge,
  });
};

// sign up
module.exports.signUp = async (request, response) => {
  const { pseudo, email, password } = request.body;

  try {
    const user = await UserModel.create({ pseudo, email, password });
    response.status(201).json({ user: user._id });
  } catch (error) {
    const errors = signUpErrors(error);
    response.status(200).send({ errors });
  }
};

// login
module.exports.login = async (request, response) => {
  const { email, password } = request.body;

  try {
    const user = await UserModel.login(email, password);
    const token = createToken(user._id);
    response.cookie("jwt", token, { httpOnly: true, maxAge: maxAge });
    response.status(201).json({ user: user._id });
  } catch (error) {
    const errors = loginErrors(error);
    response.status(200).json({ errors });
  }
};

// logout
module.exports.logout = (request, response) => {
  response.cookie("jwt", "", { maxAge: 1 });
  response.redirect("/");
};
