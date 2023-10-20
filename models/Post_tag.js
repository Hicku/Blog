const { Model, DataTypes } = require("sequelize")
const sequelize = require("../config/connection")

class Post_tag extends Model {

}

Post_tag.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        comment_text: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        image_id: {
            type: DataTypes.INTEGER,
            references: {
                model : "image",
                key: "id",
            },
        },
        post_id: {
            type: DataTypes.INTEGER,
            references: {
                model : "post",
                key: "id",
            },
        },
        tag_id: {
            type: DataTypes.INTEGER,
            references: {
                model : "Tag",
                key: "id",
            },
        },
    }, {
        sequelize,
        freezeTableName: true,
        underscored: true,
        modelName: "post_tag"
});

module.exports = Post_tag