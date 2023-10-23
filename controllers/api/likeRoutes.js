const router = require("express").Router();
const { Likes } = require("../../models");
const withAuth = require("../../utils/withAuth");

router.post("/", withAuth, async (req, res) => {
    try {
        const likesData = await Likes.create({
            ...req.body,
            user_id: req.session.user_id,
        });
        res.status(200).json(likesData);
        
    } catch (error) {
        res.status(400).json(error)   
    }
})



module.exports = router;