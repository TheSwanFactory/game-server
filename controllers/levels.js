"use strict";

var models = require('../models');

var controller = {
  // GET /levels
  index: function(req, res) {
    models.Level.findAll().then(function(levels) {
      res.format({
        html: function() {
          res.render('levels/index', {
            title:  'Express',
            levels: levels
          });
        },
        json: function() {
          res.send(levels);
        }
      });
    });
  },

  // POST /levels
  create: function(req, res) {
    var level = models.Level.create(req.body);
    res.send(level);
  }
};

module.exports = controller;
