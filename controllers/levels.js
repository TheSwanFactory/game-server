"use strict";

var models = require('../models');
var assert = require('assert');

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
      })
      .catch(function(err) {
        res.status(422);
        res.send(err);
      });
  },

  // DELETE /levels/:id
  delete: function(req, res) {
    assert.equal(req.headers['authorization'], process.env.API_KEY, 'wrong API key');
    assert.ok(req.params.id, 'ID must be set');
    models.Level
      .find(req.params.id)
      .then(function(level) {
        level.destroy().then(function() {
          res.send({success: true});
        });
      });
  }
};

module.exports = controller;
