const router = require("express").Router();
const { User, Post, Comment, Likes } = require("../models");
const withAuth = require("../utils/withAuth");

router.get("/", (req, res) => {
    res.render("homepage");
    return;
});

router.get("/dashboard", withAuth, async (req, res) => {
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
                include: [{ model: User }],
            }],
            include: [{
                model: Likes,
                include: [{ model: User }],
            }],
        });

        const posts = postData.map((post) => post.get({ plain: true }));
        res.render("dashboard", {
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
    if (req.session.logged_in) {
        res.redirect("/dashboard");
        return;
    }
    res.render("login");
});

router.get("/register", (req, res) => {
    if (req.session.logged_in) {
        res.redirect("/dashboard");
        return;
    }
    res.render("register");
});

module.exports = router;