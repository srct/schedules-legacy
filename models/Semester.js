module.exports = function (sequelize, DataTypes) {
  var Semester = sequelize.define('Semester', {
    slug: {
      type: DataTypes.STRING,
      unique: true,
      primaryKey: true
    },

    university: {
      type: DataTypes.STRING,
      references: {
        model: 'Universities',
        key: 'slug'
      }
    },

    name: DataTypes.STRING

  }, {
    indexes: [
      {
        unique: true,
        fields: ['slug']
      }
    ], classMethods: {
      associate: function (models) {
        models.Semester.belongsTo(models.University, {foreignKey: 'university'})
        models.Semester.hasMany(models.Section, {foreignKey: 'semester'})
      }
    }
  })

  return Semester
}

