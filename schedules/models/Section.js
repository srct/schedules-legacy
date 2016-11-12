module.exports = function (sequelize, DataTypes) {
  return sequelize.define('Section', {
        // unique index/key
    crn: {
      type: DataTypes.STRING,
      unique: true
    },

    name: DataTypes.STRING,
    title: DataTypes.STRING,
    section: DataTypes.STRING,

    instructor: DataTypes.STRING,

    campus: DataTypes.STRING,
    location: DataTypes.STRING,

    class_type: DataTypes.STRING,

        // Start Time Information
    startDate: DataTypes.DATE,
    endDate: DataTypes.DATE,

    Msession: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    },
    MtimeStart: DataTypes.TIME,
    MtimeEnd: DataTypes.TIME,

    Tsession: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    },
    TtimeStart: DataTypes.TIME,
    TtimeEnd: DataTypes.TIME,

    Wsession: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    },
    WtimeStart: DataTypes.TIME,
    WtimeEnd: DataTypes.TIME,

    Rsession: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    },
    RtimeStart: DataTypes.TIME,
    RtimeEnd: DataTypes.TIME,

    Fsession: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    },
    FtimeStart: DataTypes.TIME,
    FtimeEnd: DataTypes.TIME
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
    }
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
    ]
  })
}
