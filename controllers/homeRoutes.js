const router = require("express").Router();
const { request } = require("express");
const { User, Post, Comment, Likes, Follow } = require("../models");
const withAuth = require("../utils/withAuth");
const  { isCurrentUser } = require("../utils/helpers")

router.get("/", withAuth, async (req, res) => {
    if (req.session.logged_in) {
        res.render("dashboard")
    }
    res.render("homepage")
})

router.get("/profile/:id", withAuth, async (req, res) => {
    try {
        const followee_id = req.params.id;
        const follower_id = req.params.id;
        const followingCount = await Follow.count({ where: { follower_id } });
        const followerCount = await Follow.count({ where: { followee_id } });

        const postData = await Post.findAll({
            where: {
                user_id: req.params.id
            },
            include: [
                {
                    model: User,
                    attributes: ["username"],
                    include: [{ model: Follow }],
                },
                {
                    model: Likes,
                },
                {
                    model: Comment,
                    include: [{ model: User }],
                },
            ],
        });

        const posts = postData.map((post) => post.get({ plain: true }));

        res.render("profile", {
            followee_id: req.params.id,
            follower_id: req.session.user_id,
            user: req.session.user,
            followerCount,
            followingCount,
            posts,
            isCurrentUser,
            logged_in: req.session.logged_in,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json(error);
    }
});



router.get("/dashboard", withAuth, async (req, res) => {
    try {
        const postData = await Post.findAll({
            where: {
                user_id: req.session.user_id
            },
            include: [
                {
                    model: User,
                    attributes: ["username"],
                },
                {
                    model: Likes,
                },
                {
                    model: Comment,
                    include: [{ model: User }],
                },
            ],
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