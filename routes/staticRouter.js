const express = require("express");
const URL = require("../models/url");
const { restrictToLoggedinUserOnly } = require("../middlewares/auth");

const router = express.Router();

router.get("/", (req, res) => {
  if (!req.user) {
    return res.redirect("/signup");
  }

  return res.redirect("/home");
});

router.get("/signup", (req, res) => {
  return res.render("signup");
});

router.get("/login", (req, res) => {
  return res.render("login");
});

router.get("/home", restrictToLoggedinUserOnly, async (req, res) => {
  const allurls = await URL.find({ createdBy: req.user._id });

  return res.render("home", {
    urls: allurls,
  });
});

module.exports = router;