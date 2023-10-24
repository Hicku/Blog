const router = require("express").Router();
const userRoutes = require("./userRoutes");
const postRoutes = require("./postRoutes");
const commentRoutes = require("./commentRoutes");
const likeRoutes = require("./likeRoutes");
const followRoutes = require("./followRoutes");

router.use("/user", userRoutes);
router.use("/post", postRoutes);
router.use("/comment", commentRoutes);
router.use("/likes", likeRoutes);
router.use("/follow", followRoutes);

module.exports = router;