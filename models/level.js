"use strict";

var querystring = require('querystring');
var assert      = require('assert');

module.exports = function(sequelize, DataTypes) {
  var Level = sequelize.define("Level", {
    url:       DataTypes.STRING(2048),
    source:    {
      type:      DataTypes.TEXT,
      allowNull: false,
      validate: {
        notEmpty: true
      }
    },
    name:      DataTypes.STRING,
    ip:        DataTypes.STRING,
    userAgent: DataTypes.STRING,
    game:      DataTypes.STRING,
    level:     DataTypes.STRING
  },
  {
    classMethods: {
      buildFromUrl: function(url) {
        var url;

        assert.notEqual(url.indexOf('?'), -1, 'URL must have parameters');

        var parsed = querystring.parse(url.split('?')[1]);

        return this.build({
          url:    url,
          source: parsed.custom
        });
      }
    }
  });

  return Level;
};
