const express = require("express");
const router = express.Router();

const User = require("../models/User.model");
const { isAuthenticated } = require("../middleware/jwt.middleware.js");

router.put("/users", isAuthenticated, (req, res, next) => {
  const { profilePicture } = req.body;
  const userId = req.payload._id;

  User.findByIdAndUpdate(userId, { profilePicture }, { new: true })
    .then(({ __id, email, username, country, city, profilePicture }) =>
      res.json({ __id, email, username, country, city, profilePicture })
    )
    .catch((err) => console.error(err));
});

router.get("/users", isAuthenticated, (req, res, next) => {
  // If JWT token is valid the payload gets decoded by the
  // isAuthenticated middleware and is made available on `req.payload`
  console.log(`req.payload`, req.payload);

  // Send back the token payload object containing the user data
  res.status(200).json(req.payload);
});

// list of favourite strolls
router.post("/:userId", async (req, res) => {
  const { userId } = req.params;
  console.log("userId:", userId);
  const { strollId } = req.body;

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    let objectId;
    try {
      objectId = strollId;
    } catch (error) {
      console.error(error);
      return res.status(400).json({ message: "Invalid strollId" });
    }

    if (user.list.includes(objectId)) {
      return res.status(400).json({ message: "Stroll already in list" });
    }

    user.list.push(objectId);
    await user.save();
    const populatedUser = await User.findById(userId).populate("list");
    res.status(200).json(populatedUser);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;

// const express = require("express");
// const router = express.Router();

// const Review = require("../models/Review.model");
// const Stroll = require("../models/Stroll.model");
// const User = require("../models/User.model");

// const { isAuthenticated } = require("../middleware/jwt.middleware.js");

// //Update User
// router.put("/", isAuthenticated, (req, res, next) => {
//   const { profilePicture } = req.body;
//   const userId = req.payload._id;

//   User.findByIdAndUpdate(userId, { profilePicture }, { new: true })
//     .then(({ __id, email, username, country, city, profilePicture }) =>
//       res.json({ __id, email, username, country, city, profilePicture })
//     )
//     .catch((err) => console.error(err));
// });

// //Get all the users
// router.get("/", isAuthenticated, (req, res, next) => {
//   // If JWT token is valid the payload gets decoded by the
//   // isAuthenticated middleware and is made available on `req.payload`
//   console.log(`req.payload`, req.payload);

//   // Send back the token payload object containing the user data
//   res.status(200).json(req.payload);
// });

// router.post("/:userId", async (req, res) => {
//   const { userId } = req.params;
//   console.log("userId:", userId);
//   const { strollId } = req.body;

//   try {
//     const user = await User.findById(userId);
//     if (!user) {
//       return res.status(404).json({ message: "User not found" });
//     }

//     let objectId;
//     try {
//       objectId = strollId;
//     } catch (error) {
//       console.error(error);
//       return res.status(400).json({ message: "Invalid strollId" });
//     }

//     if (user.list.includes(objectId)) {
//       return res.status(400).json({ message: "Stroll already in list" });
//     }

//     user.list.push(objectId);
//     await user.save();
//     const populatedUser = await User.findById(userId).populate("list");
//     res.status(200).json(populatedUser);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: "Server error" });
//   }
// });

// module.exports = router;
