const router = require("express").Router();
const { Tag } = require("../../models");

router.post = ("/", async (req, res) => {
    try {
        const tagData = await Tag.create(req.body);
        res.status(200).json(tagData);
    } catch (error) {
        res.status(400).json(error);
    }
});


module.exports = router;