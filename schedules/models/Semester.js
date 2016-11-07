module.exports = function(sequelize, DataTypes) {
    var Semester = sequelize.define("Semester", {
        slug: {
            type: DataTypes.STRING,
            unique: true
        },

        name: DataTypes.STRING,

        universitySlug: {
            type: DataTypes
            references: {
                model: University
                key: slug
            }
        }
    })
}

