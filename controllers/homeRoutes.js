const router = require("express").Router();
const { request } = require("express");
const { User, Post, Comment, Likes, Follow } = require("../models");
const withAuth = require("../utils/withAuth");
const  { isCurrentUser } = require("../utils/helpers")

router.get("/", withAuth, async (req, res) => {
    try {

        const currentUserId = req.session.user_id;

        const postData = await Post.findAll({
            include: [
                {
                    model: User,
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

        res.render("homepage", {
            currentUserId,
            posts,
            logged_in: req.session.logged_in,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json(error);
    }
});

router.get("/profile/:id", withAuth, async (req, res) => {
    try {
        const userId = req.params.id;
        const currentUserId = req.session.user_id;

        const user = await User.findByPk(userId);

        if (!user) {
            return res.status(404).send("User not found");
        }
        const followee_id = req.params.id;
        const follower_id = req.params.id;
        const followingCount = await Follow.count({ where: { follower_id } });
        const followerCount = await Follow.count({ where: { followee_id } });
        const currentProfile = user.get({ plain: true });
        
        const is_creator = function (currentUserId, profileUserId) {
            return currentProfile.id === req.session.user_id;
        }

        const postData = await Post.findAll({
            where: {
                user_id: req.params.id
            },
            order: [
                ["created_at", "DESC"],
                [Comment, "created_at", 'DESC']
            ],
            include: [
                {
                    model: User,
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
            currentUserId,
            userId,
            followee_id: req.params.id,
            follower_id: req.session.user_id,
            currentProfile,
            followerCount,
            followingCount,
            posts,
            is_creator,
            isCurrentUser,
            logged_in: req.session.logged_in,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json(error);
    }
});


router.get("/login", (req, res) => {
    if (req.session.logged_in) {
        res.redirect(`/`);
        return;
    }
    res.render("login");
});

router.get("/register", (req, res) => {
    if (req.session.logged_in) {
        res.redirect(`/`);
        return;
    }
    res.render("register");
});


module.exports = router;