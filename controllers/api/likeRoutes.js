const router = require("express").Router();
const { Likes } = require("../../models");
const withAuth = require("../../utils/withAuth");

// Create like and update like count

router.post("/", withAuth, async (req, res) => {
    try {
        const likesData = await Likes.create({
            ...req.body,
            user_id: req.session.user_id,
        });

        const post_id = req.body.post_id;
        const likesCount = await Likes.count({ where: { post_id } });

        res.status(200).json({ likesData, likesCount }); 

    } catch (error) {
        res.status(400).json(error);
    }
});










module.exports = router;