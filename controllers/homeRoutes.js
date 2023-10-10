const router = require("express").Router();
const { User, Post } = require("../models");
const withAuth = require("../utils/withAuth");

router.get("/", withAuth, async(req, res) => {
    try {
        const postData = await Post.findAll({
            
        })
    } catch (error) {
        
    }
})

router.get("/login", (req, res) => {
    if(req.session.logged_in) {
        res.redirect("/");
        return;
    }
    res.render("login")
});

router.get("/register", (req, res) => {
    if(req.session.logged_in) {
        res.redirect("/");
        return;
    }
    res.render("register")
})

module.exports = router