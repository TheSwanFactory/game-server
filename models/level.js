"use strict";

module.exports = function(sequelize, DataTypes) {
  var Level = sequelize.define("Level", {
    url:    DataTypes.STRING(2048),
    source: DataTypes.TEXT,
    name:   DataTypes.STRING,
    ip:     DataTypes.STRING,
    userAgent: DataTypes.STRING
  });

  return Level;
};
