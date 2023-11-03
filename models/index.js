const User = require("./User");
const Post = require("./Post");
const Comment = require("./Comment");
const Follow = require("./Follow");
const Image = require("./Image");
const Likes = require("./Likes");




// // post relationships

User.hasMany(Post, {
    foreignKey: "user_id",
});

Post.belongsTo(User, {
    foreignKey: "user_id",
    onDelete: "CASCADE"
});


// // Image relationships

User.hasMany(Image, {
    foreignKey: "user_id",
});

Image.belongsTo(User, {
    foreignKey: "user_id",
    onDelete: "CASCADE"
});

// // Like relationships

// // Image to like

Image.hasMany(Likes, {
    foreignKey: "image_id",
});

Likes.belongsTo(Image, {
    foreignKey: "image_id",
    onDelete: "CASCADE"
});

// // User to like

User.hasMany(Likes, {
    foreignKey: "user_id",
});

Likes.belongsTo(User, {
    foreignKey: "user_id",
    onDelete: "CASCADE"
});


// // post to like

Post.hasMany(Likes, {
    foreignKey: "post_id",
});

Likes.belongsTo(Post, {
    foreignKey: "post_id",
    onDelete: "CASCADE"
});


// // Comment relationships

// // Image to comment

Image.hasMany(Comment, {
    foreignKey: "image_id",
});

Comment.belongsTo(Image, {
    foreignKey: "image_id",
    onDelete: "CASCADE"
});

// // User to comment

User.hasMany(Comment, {
    foreignKey: "user_id",
});

Comment.belongsTo(User, {
    foreignKey: "user_id",
    onDelete: "CASCADE"
});


// // post to comment

Post.hasMany(Comment, {
    foreignKey: "post_id",
});

Comment.belongsTo(Post, {
    foreignKey: "post_id",
    onDelete: "CASCADE"
});


// // follow relationships

User.hasMany(Follow, {
    foreignKey: "follower_id",
});

Follow.belongsTo(User, {
    foreignKey: "follower_id",
    onDelete: "CASCADE"
});


User.hasMany(Follow, {
    foreignKey: "followee_id",
});

Follow.belongsTo(User, {
    foreignKey: "followee_id",
    onDelete: "CASCADE"
});



module.exports = { User, Post, Comment, Follow, Image, Likes }

