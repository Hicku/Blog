const router = require("express").Router();
const { Post_tag } = require("../../models");
const withAuth = require("../../utils/withAuth");

router.post("/", withAuth, async (req, res) => {
    try {
        const post_tagData = await Post_tag.create(req.body);
        res.status(200).json(post_tagData);
    } catch (error) {
        res.status(400).json(error);
    };
});

module.exports = router;