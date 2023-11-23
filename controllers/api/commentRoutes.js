const router = require("express").Router();
const { Comment, User, Post, Likes } = require("../../models");
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

// Edit comment

router.put('/:id', withAuth, async (req, res) => {
  try {
      
      const editCommentData = await Comment.update(req.body, {
      where: {
          id: req.params.id,
      },
      });
      res.status(200).json(editCommentData);
  } catch (err) {
      res.status(400).json(err);
  }
});


//Delete comment 
router.delete('/:id', withAuth, async (req, res) => {
  try {
      const deleteCommentData = await Post.destroy({
      where: {
          id: req.params.id,
          user_id: req.session.user_id,
      },
  });
      if (!postData) {
          res.status(404).json({ message: 'No comment found with this id!' });
          return;
  }
  res.status(200).json(deleteCommentData);
      } catch (err) {
          res.status(500).json(err);
  }
});


module.exports = router;