const router = require("express").Router();
const { request } = require("express");
const { User, Post, Comment, Likes } = require("../models");
const withAuth = require("../utils/withAuth");

router.get("/", withAuth, async (req, res) => {
    if (req.session.logged_in) {
        res.render("dashboard")
    }
    res.render("homepage")
})


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
                model: Likes,
            }],
            include: [{
                model: Comment,
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

router.get("/profile/:id", withAuth, async (req, res) => {
    try {
        const postData = await Post.findAll({
            where: {
                user_id: req.params.id,
            },
            include: [{
                model: User,
                attributes: ["username"],
            }],
            include: [{
                model: Comment,
                include: [{ model: User }],
            }],
        });

        const posts = postData.map((post) => post.get({ plain: true }));

        res.render("profile", {
            
            user: req.session.user,
            posts,
            logged_in: req.session.logged_in,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json(error);
    }
});

module.exports = router;