const router = require("express").Router();
const { Tag } = require("../../models");

router.post("/", async (req, res) => {
    try {
        const tagData = await Tag.create({
            ...req.body,
        });

        res.status(200).json({ tagData }); 

    } catch (error) {
        res.status(400).json(error);
    }
});

router.get ("/:tag_name", async (req, res) => {
    try {
        const tagData = await Tag.findOne({
            where: { tag_name: req.params.tag_name },
        });
        res.status(200).json(tagData);
    } catch (error) {
        res.status(400).json(error);
    }
});


module.exports = router;