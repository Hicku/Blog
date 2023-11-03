const router = require("express").Router();
const userRoutes = require("./userRoutes");
const postRoutes = require("./postRoutes");
const commentRoutes = require("./commentRoutes");
const likeRoutes = require("./likeRoutes");
const followRoutes = require("./followRoutes");
const searchRoutes = require("./searchRoutes");
const tagRoutes = require("./tagRoutes");
const postTagRoutes = require("./postTagRoutes");

router.use("/user", userRoutes);
router.use("/post", postRoutes);
router.use("/comment", commentRoutes);
router.use("/likes", likeRoutes);
router.use("/follow", followRoutes);
router.use("/search", searchRoutes);
router.use("/tag", tagRoutes);
router.use("/post_tag", postTagRoutes);

module.exports = router;