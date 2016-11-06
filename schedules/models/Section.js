module.exports = function(sequelize, DataTypes) {
    var Section = sequelize.define("Section", {
        // unique index/key
        crn        : DataTypes.STRING,

        name       : DataTypes.STRING,
        title      : DataTypes.STRING,
        section    : DataTypes.STRING,

        // should be foreign key
        instructor : DataTypes.STRING,

        // should be foreign key
        campus     : DataTypes.STRING,

        // should be foreign key
        location   : DataTypes.STRING,

        // should be foreign key
        class_type : DataTypes.STRING,

        // Start Time Information
        startDate  : DataTypes.DATE,
        endDate    : DataTypes.DATE,

        Msession   : DataTypes.BOOL,
        MtimeStart : DataTypes.TIME,
        MtimeEnd   : DataTypes.TIME,

        Tsession   : DataTypes.BOOL,
        TtimeStart : DataTypes.TIME,
        TtimeEnd   : DataTypes.TIME,

        Wsession   : DataTypes.BOOL,
        WtimeStart : DataTypes.TIME,
        WtimeEnd   : DataTypes.TIME,

        Rsession   : DataTypes.BOOL,
        RtimeStart : DataTypes.TIME,
        RtimeEnd   : DataTypes.TIME,

        Fsession   : DataTypes.BOOL,
        FtimeStart : DataTypes.TIME,
        FtimeEnd   : DataTypes.TIME
    })
}
