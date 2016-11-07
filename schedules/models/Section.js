module.exports = function(sequelize, DataTypes) {
    var Section = sequelize.define("Section", {
        // unique index/key
        crn        : {
            type: DataTypes.STRING,
            unique: true
        },

        name       : DataTypes.STRING,
        title      : DataTypes.STRING,
        section    : DataTypes.STRING,

        instructor : type: DataTypes.STRING,

        campus     : DataTypes.STRING,
        location   : DataTypes.STRING,

        class_type : DataTypes.STRING,

        // Start Time Information
        startDate  : DataTypes.DATE,
        endDate    : DataTypes.DATE,

        Msession   : {
            type: DataTypes.BOOL,
            allowNull: false,
            defaultValue: false
        },
        MtimeStart : DataTypes.TIME,
        MtimeEnd   : DataTypes.TIME,

        Tsession   : {
            type: DataTypes.BOOL,
            allowNull: false,
            defaultValue: false
        },
        TtimeStart : DataTypes.TIME,
        TtimeEnd   : DataTypes.TIME,

        Wsession   : {
            type: DataTypes.BOOL,
            allowNull: false,
            defaultValue: false
        },
        WtimeStart : DataTypes.TIME,
        WtimeEnd   : DataTypes.TIME,

        Rsession   : {
            type: DataTypes.BOOL,
            allowNull: false,
            defaultValue: false
        },
        RtimeStart : DataTypes.TIME,
        RtimeEnd   : DataTypes.TIME,

        Fsession   : {
            type: DataTypes.BOOL,
            allowNull: false,
            defaultValue: false
        },
        FtimeStart : DataTypes.TIME,
        FtimeEnd   : DataTypes.TIME
    }, {
        validate: {
            Msession: function(value) {
                if (Msession === true) &&
                    (MtimeStart === null || MtimeEnd === null) {
                    throw new Error('Start and end times must be defined for' +
                        ' Monday if class is set to true.');
                }
            },

            Tsession: function(value) {
                if (Tsession === true) &&
                    (TtimeStart === null || TtimeEnd === null) {
                    throw new Error('Start and end times must be defined for' +
                        ' Tuesday if class is set to true.');
                }
            },

            Wsession: function(value) {
                if (Wsession === true) &&
                    (WtimeStart === null || WtimeEnd === null) {
                    throw new Error('Start and end times must be defined for' +
                        ' Wednesday if class is set to true.');
                }
            },

            Rsession: function(value) {
                if (Rsession === true) &&
                    (RtimeStart === null || RtimeEnd === null) {
                    throw new Error('Start and end times must be defined for' +
                        ' Thursday if class is set to true.');
                }
            },

            Fsession: function(value) {
                if (Fsession === true) &&
                    (FtimeStart === null || FtimeEnd === null) {
                    throw new Error('Start and end times must be defined for' +
                        ' Friday if class is set to true.');
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
