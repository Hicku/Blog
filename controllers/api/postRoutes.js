const router = require("express").Router();
const { Post } = require("../../models");

router.post("/")

// Route to get all posts
router.get("/posts", async (req, res) => {
    try {
        const posts = await Post.findAll();
        res.json(posts);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to fetch posts" });
    }
});

module.exports = router;