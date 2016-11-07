module.exports = function(sequelize, DataTypes) {
    var University = sequelize.define("University", {
        slug: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },

        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },

        website: {
            type: DataTypes.STRING,
            allowNull: false
        }
    })
}
