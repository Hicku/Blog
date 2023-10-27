const router = require("express").Router();
const { User, Tag } = require("../../models");

router.get("/:username", async (req, res) => {
    try {
        const username = req.params.username;

        const userData = await User.findOne({
            where: { username },
            attributes: { exclude: ["password"] },
        });

        if (userData) {
            res.status(200).json(userData);
        } else {
            res.status(404).json({ message: "User not found" });
        }
    } catch (error) {
        res.status(500).json(error);
    }
});

router.get("/:tag_id", async (req, res) => { 
    try {
        const tagData = await Tag.findAll();
        res.status(200).json(tagData);
    } catch (error) {
        res.status(500).json(error);
    }
});

module.exports = router;