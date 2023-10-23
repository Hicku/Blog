const router = require("express").Router();
const { Comment, User, Post } = require("../../models");
const withAuth = require("../../utils/withAuth");
// ...

// Create new comment

router.post("/", withAuth, async (req, res) => {
  try {
    const commentData = await Comment.create({
      ...req.body,
      user_id: req.session.user_id,
    });


    res.status(200).json(commentData);
  } catch (error) {
    res.status(400).json(error);
  }
});

// Get all comments

router.get("/", async (req, res) => {
  try {
    const comments = await Comment.findAll({
      include: [
        {
          model: Post,
        },
        {
          model: User,
        },
      ],
    });
    res.status(200).json(comments);
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

module.exports = router;