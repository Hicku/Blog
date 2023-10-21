const router = require("express").Router();
const { Post } = require("../../models");
const withAuth = require("../../utils/withAuth");

// Route to crete a new post
router.post("/", withAuth, async (req, res) => {
    try {
        const postData = await Post.create({
            ...req.body,
            user_id: req.session.user_id,
        });
        res.status(200).json(postData);
        
    } catch (error) {
        res.status(400).json(error)   
    }
})

module.exports = router;