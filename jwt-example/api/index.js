const express = require("express");
const router = express.Router();
const Contact = require("../models/contact");
const User = require("../models/user");
const jwt = require("jsonwebtoken");

require("dotenv").config();
const secret = process.env.SECRET;

router.post("/login", async (req, res, next) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (!user || !user.validPassword(password)) {
    return res.json({
      status: "error",
      code: 400,
      data: "Bad request",
      message: "Incorrect login/password",
    });
  }

  const payload = {
    id: user.id,
  };

  const token = jwt.sign(payload, secret, { expiresIn: "1h" });

  return res.json({
    status: "success",
    code: 200,
    data: {
      token,
    },
    message: `User ${user} was found`,
  });
});

router.post("/register", async (req, res, next) => {
  const { username, email, password } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    return res.json({
      status: "error",
      code: 409,
      data: "Conflict",
      message: "User already exists!",
    });
  }
  try {
    const newUser = new User({ username, email });
    newUser.setPassword(password);
    await newUser.save();

    res.json({
      status: "success",
      code: 201,
      data: {
        message: "Register complete!",
      },
    });
  } catch (error) {
    next(error);
  }
});

router.get("/list", async (req, res, next) => {
  const contacts = await Contact.find();
  res.json({
    status: "success",
    cpde: 200,
    data: {
      contacts,
    },
  });
});

module.exports = router;
