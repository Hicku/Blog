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

// Delete follow
router.delete('/delete', withAuth, async (req, res) => {
    try {
        const followData = await Follow.destroy({
            where: {
                followee_id: req.body.followee_id,
                follower_id: req.body.follower_id
            },
        });
        if (!followData) {
            res.status(404).json({ message: 'No follow with this id!' });
            return;
        }
        res.status(200).json(followData);
    } catch (err) {
        console.error(err);
        res.status(500).json(err);
    }
});

module.exports = router;