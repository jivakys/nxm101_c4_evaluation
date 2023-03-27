const { UserModel } = require("../models/user.model");

const isPresent = async (req, res, next) => {
  const { email } = req.body;

  const user = await UserModel.findOne({ email });
  //   console.log("user", user);
  if (user) {
    res.status(200).send({ msg: "User already exist, please login" });
  } else {
    next();
  }
};

module.exports = { isPresent };
