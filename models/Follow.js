const { Model, DataTypes } = require("sequelize")
const sequelize = require("../config/connection")

class Follow extends Model {

}

Follow.init(
    {
        follower_id: {
            type: DataTypes.INTEGER,
            references: {
                model : "user",
                key: "id",
            },
        },
        followee_id: {
            type: DataTypes.INTEGER,
            references: {
                model : "user",
                key: "id",
            },
        },
    }, {
        sequelize,
        freezeTableName: true,
        underscored: true,
        modelName: "follow",
        indexes: [
                    {
                        unique: true,
                        fields: ["follow_id", "followee_id"],
                    },
                ],
        }
    );

module.exports = Follow