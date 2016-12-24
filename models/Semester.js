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
        model: 'University',
        key  : 'slug'
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
        models.Semester.belongsTo(models.University)
        models.Semester.hasMany(models.Section)
      }
    }
  })

  return Semester
}

