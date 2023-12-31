const router = require("express").Router();
const { User } = require("../../models");

router.post("/", async (req, res) => {
    try {
        const userData = await User.create(req.body);

        req.session.save(() => {
            req.session.user_id = userData.id;
            req.session.logged_in = true;
            res.status(200).json(userData);
        });
    } catch (error) {
        res.status(400).json(error)
    }
});

router.post("/login", async (req, res) => {
    try {
        const userData = await User.findOne({
            where: { username: req.body.username },
        });

        if(!userData) {
            res
                .status(400)
                .json({message: "User not found, please try again"});
                return;
        }
        req.session.save(() => {
            
            req.session.user_id = userData.id;
            req.session.logged_in = true;
            res.json({user: userData, message: "User logged in"})
        })
        
    } catch (error) {
        res.status(400).json(error)
    }
});


router.post("/logout", (req, res) => {
    if (req.session.logged_in) {
        req.session.destroy(() => {
            res.status(204).json({ loggedOut: true });
        });
    } else {
        res.status(404).json({ loggedOut: false });
    }
});

router.get("/:id", async (req, res) => {
    try {
        const userId = req.params.id; 

        const userData = await User.findOne({
            where: { id: userId }, 
        });

        if (!userData) {
            res
                .status(404)
                .json({ message: "User not found, please try again" });
            return;
        }

        res.status(200).json(userData);
    } catch (error) {
        res.status(500).json(error);
    }
});

module.exports = router;