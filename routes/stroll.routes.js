const express = require("express");
const router = express.Router();

const User = require("../models/Stroll.model");
// const Review = require("../models/Review.model");
const Stroll = require("../models/Stroll.model");
const { isAuthenticated } = require("../middleware/jwt.middleware.js");

// GET ALL the Strolls
router.get("/", (req, res, next) => {
  Stroll.find()
    .then((strolls) => {
      console.log(res.data);
      res.json(strolls);
    })
    .catch((err) => console.log(err));
});

// Create Strolls
router.post("/", (req, res, next) => {
  const newStroll = req.body;
  Stroll.create(newStroll)
    .then((newStroll) => {
      console.log(res.data);
      res.json(newStroll);
    })
    .catch((err) => console.log(err));
});

// Stroll Detail
router.get("/:id", (req, res) => {
  Stroll.findById(req.params.id)
    .then((strolls) => res.json(strolls))
    .catch((err) => console.error(err));
});

// Stroll removed
router.post("/:id", (req, res) => {
  Stroll.findByIdAndDelete(req.params.id)
    .then(console.log("Stroll deleted"))
    .catch((err) => console.error(err));
});

module.exports = router;
