const { Model, DataTypes } = require("sequelize")
const sequelize = require("../config/connection")

class Likes extends Model {

}

Likes.init(
    {
        user_id: {
            type: DataTypes.INTEGER,
            references: {
                model : "user",
                key: "id",
            },
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
    }, {
        sequelize,
        freezeTableName: true,
        underscored: true,
        modelName: "like",
        indexes: [
            {
                unique: true,
                fields: ["user_id", "post_id"],
            },
            {
                unique: true,
                fields: ["user_id", "image_id"],
            },
        ],
});

module.exports = Likes