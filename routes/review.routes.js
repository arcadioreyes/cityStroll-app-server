const express = require("express");
const router = express.Router();

const User = require("../models/Review.model");
const Review = require("../models/Review.model");
const Stroll = require("../models/Stroll.model");
const { isAuthenticated } = require("../middleware/jwt.middleware.js");

module.exports = router;
