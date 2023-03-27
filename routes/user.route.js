const express = require("express");
const { UserModel } = require("../models/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { isPresent } = require("../middleware/user.middleware");
const userRoute = express.Router();

userRoute.post("/register", isPresent, (req, res) => {
  const { name, email, password, gender, age, city, is_married } = req.body;
  try {
    bcrypt.hash(password, 5, async (err, hash) => {
      const data = new UserModel({
        name,
        email,
        password: hash,
        gender,
        age,
        city,
        is_married,
      });
      await data.save();
      res.status(200).send("User registered Successfully");
    });
  } catch (err) {
    res.status(400).send({ msg: err.message });
  }
});

userRoute.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await UserModel.findOne({ email });
    if (user) {
      bcrypt.compare(password, user.password, (err, result) => {
        if (result) {
          res.status(200).send({
            msg: "user login successfully",
            token: jwt.sign({ userId: user._id }, "masai"),
          });
        } else {
          res.status(200).send({ msg: "Wrong credentials" });
        }
      });
    }
  } catch (err) {
    res.status(400).send({ msg: err.message });
  }
});

module.exports = { userRoute };
