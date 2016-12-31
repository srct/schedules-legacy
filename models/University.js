module.exports = function (sequelize, DataTypes) {
  var University = sequelize.define('University', {
    slug: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      primaryKey: true
    },

    name: {
      type: DataTypes.STRING,
      allowNull: false
    },

    website: {
      type: DataTypes.STRING,
      allowNull: false
    },

    timezone: {
      type: DataTypes.STRING,
      defaultValue: 'America/New_York'
    }
  }, {
    indexes: [
      {
        unique: true,
        fields: ['slug']
      }
    ],
    classMethods: {
      associate: function (models) {
        models.University.hasMany(models.Semester, {foreignKey: 'university'})
      }
    }
  })

  return University
}
