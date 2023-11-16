const router = require("express").Router();
const { Follow } = require("../../models");
const withAuth = require("../../utils/withAuth");

// create follow



router.post("/", withAuth, async (req, res) => {
    try {
        const followData = await Follow.create({
            ...req.body,
            user_id: req.session.user_id,
        });
        
        res.status(200).json({ followData }); 

        console.log("Follow created successfully");
    } catch (error) {
        console.error("Error creating follow:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

router.delete('/:id', withAuth, async (req, res) => {
    try {
        const postData = await Post.destroy({
        where: {
            followee_id: req.params.id,
            follower_id: req.session.user_id
        },
    });
        if (!postData) {
            res.status(404).json({ message: 'No post found with this id!' });
            return;
    }
    res.status(200).json(postData);
        } catch (err) {
            res.status(500).json(err);
    }
});

module.exports = router;