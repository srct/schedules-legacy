module.exports = function(sequelize, DataTypes) {
    var Semester = sequelize.define("Semester", {
        slug: {
            type: DataTypes.STRING,
            unique: true
        },

        name: DataTypes.STRING,

        universitySlug: {
            type: DataTypes.STRING,
            references: {
                model: University,
                key: slug
            }
        }
    })
}

