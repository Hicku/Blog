const router = require("express").Router();
const { User, Post } = require("../models");
const withAuth = require("../utils/withAuth");

router.get("/", withAuth, async(req, res) => {
    try {
        const postData = await Post.findAll({
            where: {
                user_id: req.session.user_id
            },
            include: [{
                model: User,
                attributes: ["username"]
            }]
        });

        const post = postData.map(post => post.get({ plain: true }));
        res.render("homepage", {
            post,
            logged_in: req.session.logged_in
        });
    } catch (error) {
        console.error(error); // Log the error
        res.status(500).send("Internal Server Error"); // Return a 500 status response
    }
});

// router.get("/", (req, res) => {
//     res.render("homepage");
// });

module.exports = router;

router.get("/login", (req, res) => {
    if (req.session.logged_in) {
        res.redirect("/");
        return;
    }
    res.render("login");
});

router.get("/register", (req, res) => {
    if (req.session.logged_in) {
        res.redirect("/");
        return;
    }
    res.render("register");
});

module.exports = router;