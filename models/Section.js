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
        model: 'Semester',
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
    validate: {
      Msession_validate: function (value) {
        if ((this.Msession === true) &&
                    (this.MtimeStart === null || this.MtimeEnd === null)) {
          throw new Error('Start and end times must be defined for' +
                        ' Monday if class is set to true.')
        }
      },

      Tsession_validate: function (value) {
        if ((this.Tsession === true) &&
                    (this.TtimeStart === null || this.TtimeEnd === null)) {
          throw new Error('Start and end times must be defined for' +
                        ' Tuesday if class is set to true.')
        }
      },

      Wsession_validate: function (value) {
        if ((this.Wsession === true) &&
                    (this.WtimeStart === null || this.WtimeEnd === null)) {
          throw new Error('Start and end times must be defined for' +
                        ' Wednesday if class is set to true.')
        }
      },

      Rsession_validate: function (value) {
        if ((this.Rsession === true) &&
                    (this.RtimeStart === null || this.RtimeEnd === null)) {
          throw new Error('Start and end times must be defined for' +
                        ' Thursday if class is set to true.')
        }
      },

      Fsession_validate: function (value) {
        if ((this.Fsession === true) &&
                    (this.FtimeStart === null || this.FtimeEnd === null)) {
          throw new Error('Start and end times must be defined for' +
                        ' Friday if class is set to true.')
        }
      }
    },
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
        models.Section.belongsTo(models.Semester)
      }
    }
  })
}
