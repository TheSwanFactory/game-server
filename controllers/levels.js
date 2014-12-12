"use strict";

var models = require('../models');

var controller = {
  // GET /levels
  index: function(req, res) {
    models.Level.findAll().then(function(levels) {
      res.format({
        html: function() {
          res.render('levels/index', {
            title:  'Levels',
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
    models.Level
      .buildFromUrl(req.body.url, req)
      .save()
      .then(function(level) {
        res.send(level);
      }).catch(function(err) {
        res.status(422);
        res.send(err);
      });
  }
};

module.exports = controller;
