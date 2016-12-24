module.exports = function (sequelize, DataTypes) {
  return sequelize.define('Section', {
        // unique index/key
    crn: {
      type: DataTypes.STRING,
      unique: true,
      primaryKey: true
    },

    semester: {
      type: DataTypes.STRING,
      references: {
        model: 'Semesters',
        key  : 'slug'
      }
    },

    name: DataTypes.STRING,
    title: DataTypes.STRING,
    section: DataTypes.STRING,

    instructor: DataTypes.STRING,

    class_type: DataTypes.STRING,

        // Start Time Information
    startDate: DataTypes.STRING,
    endDate: DataTypes.STRING,

    /*
     * NOTE: `campus` and `location` are stored overall as well as for each
     *       individual session to allow for changing rooms/buildings/campuses
     *       throughout the week. GMU may not do this but it's a good future
     *       proofing to add in now while it's easy.
     */
    campus: DataTypes.STRING,
    location: DataTypes.STRING,

    Msession: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    },
    MtimeStart: DataTypes.STRING,
    MtimeEnd: DataTypes.STRING,
    MclassType: DataTypes.STRING,
    Mlocation: DataTypes.STRING,

    Tsession: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    },
    TtimeStart: DataTypes.STRING,
    TtimeEnd: DataTypes.STRING,
    Tcampus: DataTypes.STRING,
    TclassType: DataTypes.STRING,

    Wsession: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    },
    WtimeStart: DataTypes.STRING,
    WtimeEnd: DataTypes.STRING,
    WclassType: DataTypes.STRING,
    Wlocation: DataTypes.STRING,

    Rsession: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    },
    RtimeStart: DataTypes.STRING,
    RtimeEnd: DataTypes.STRING,
    RclassType: DataTypes.STRING,
    Rlocation: DataTypes.STRING,

    Fsession: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    },
    FtimeStart: DataTypes.STRING,
    FtimeEnd: DataTypes.STRING,
    FclassType: DataTypes.STRING,
    Flocation: DataTypes.STRING
  }, {
    indexes: [
      {
        unique: true,
        fields: ['crn']
      },

      {
        unique: false,
        fields: ['instructor']
      },

      {
        unique: false,
        fields: ['campus']
      },

      {
        unique: false,
        fields: ['location']
      },

      {
        unique: false,
        fields: ['title']
      }
    ],
    classMethods: {
      associate: function (models) {
        models.Section.belongsTo(models.Semester, {foreignKey: 'semester'})
      }
    }
  })
}
