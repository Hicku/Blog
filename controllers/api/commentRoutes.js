const router = require("express").Router();
const { Comment, User } = require("../../models");
const withAuth = require("../../utils/withAuth");
// ...

router.post("/", withAuth, async (req, res) => {
  try {
    const commentData = await Comment.create({
      ...req.body,
      user_id: req.session.user_id,
    });

    const user = await User.findByPk(req.session.user_id);
    
    const responseData = {
      commentData,
      username: user.username,
    };


    res.status(200).json(responseData);
  } catch (error) {
    res.status(400).json(error);
  }
});

module.exports = router;