const router = require("express").Router();
const { Follow } = require("../../models");
const withAuth = require("../../utils/withAuth");

// create follow

router.post("/", withAuth, async (res, req) => {
    try {
        const followData = await Follow.create({
            ...req.body,
            user_id: req.session.user_id,
        });

        const followee_Id = req.body.followee_Id;

        res.status(200).json({ followData }); 

    } catch (error) {
        
    }
})

module.exports = router;