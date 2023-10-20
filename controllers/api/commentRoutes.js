const router = require("express").Router();
const { Comment } = require("../../models");
const withAuth = require("../../utils/withAuth");

router.post("/", withAuth, async (req, res) => {
    try {
        const commentData = await Comment.create({
            ...req.body,
            user_id: req.session.user_id,
        });
        res.status(200).json(commentData);
        
    } catch (error) {
        res.status(400).json(error)   
    }
});

module.exports = router;