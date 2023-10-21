const router = require("express").Router();
const { User, Post, Comment } = require("../models");
const withAuth = require("../utils/withAuth");

router.get("/", withAuth, async (req, res) => {
    try {
        const postData = await Post.findAll({
            where: {
                user_id: req.session.user_id
            },
            include: [{
                model: User,
                attributes: ["username"],
            }],
            include: [{
                model: Comment,
            }],
        });

        const posts = postData.map((post) => post.get({ plain: true }));
        res.render("homepage", {
            user: req.session.user,
            posts,
            logged_in: req.session.logged_in,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json(error);
    }
});


router.get("/login", (req, res) => {
    console.log("logged_in:", req.session.logged_in);
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