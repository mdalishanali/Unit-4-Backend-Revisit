const express = require("express");
const EventEmitter = require("events");
const User = require("../models/user.model");

const { confirmationMail, adminMail } = require("../utils");
const router = express.Router();
const eventEmitter = new EventEmitter();

router.post("", async (req, res) => {
  try {
    const user = await User.create(req.body);
    eventEmitter.on("User Registered", confirmationMail);
    eventEmitter.on("User Registered2", adminMail);

    eventEmitter.emit("User Registered", {
      from: "admin@masai.com",
      to: user.email,
      user,
    });

    eventEmitter.emit("User Registered2", {
      from: "admin@masai.com",
      to: [
        "adm1@gmail.com",
        "adm12@gmail.com",
        "adm13@com",
        "adm14@com",
        "adm15@com",
      ],
      user,
    });

    res.send("Mail sent");
  } catch (err) {
    return res.send(err.message);
  }
});

router.get("", async (req, res) => {
  const user = await User.find({}).lean().exec();
  return res.send(user);
});
module.exports = router;
