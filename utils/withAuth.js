const withAuth = (req, res, next) => {
   
    if(!req.session.logged_in) {
        console.log("Reached withAuth middleware");
        res.redirect("/login");
    } else {
        next();
    }
};

module.exports = withAuth;