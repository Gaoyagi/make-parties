//Model for "Events" in the DB
'use strict';
module.exports = (sequelize, DataTypes) => {
  const Event = sequelize.define('Event', {
    //attributes
    title: DataTypes.STRING,
    desc: DataTypes.TEXT,
    // id: DataTypes.TEXT,
    // createdAt: DataTypes.TEXT,
    // updatedAt: DataTypes.TEXT,
    imgUrl: DataTypes.STRING
  }, {});
  Event.associate = function(models) {
    // associations can be defined here
  };
  return Event;
};