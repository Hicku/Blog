const { Model, DataTypes } = require("sequelize")
const sequelize = require("../config/connection")

class Like extends Model {

}

Like.init(
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
        modelName: "like"
});

module.exports = Like