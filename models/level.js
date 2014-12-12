"use strict";

var querystring = require('querystring');
var assert      = require('assert');

module.exports = function(sequelize, DataTypes) {
  var Level = sequelize.define("Level", {
    url:       DataTypes.STRING(2048),
    source: {
      type:      DataTypes.TEXT,
      allowNull: false,
      validate: {
        notEmpty: true
      }
    },
    name: {
      type:      DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true
      }
    },
    ip:        DataTypes.STRING,
    userAgent: DataTypes.STRING,
    game:      DataTypes.STRING,
    level:     DataTypes.STRING
  },
  {
    getterMethods: {
      sourceJSON: function() {
        try {
          return JSON.parse(this.getDataValue('source'));
        } catch {
          return null;
        }
      }
    },
    classMethods: {
      buildFromUrl: function(url, req) {
        assert.notEqual(url.indexOf('?'), -1, 'URL must have parameters');

        var parsed = querystring.parse(url.split('?')[1]);
        var custom = JSON.parse(parsed.custom);

        return this.build({
          url:       url,
          source:    parsed.custom,
          name:      custom.level_name,
          ip:        req.ip,
          userAgent: req.headers['user-agent'],
          game:      parsed.game,
          level:     parsed.level
        });
      }
    }
  });

  return Level;
};
