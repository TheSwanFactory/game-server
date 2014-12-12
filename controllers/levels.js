"use strict";

var Level = require('../models').Level;
var assert = require('assert');

var controller = {
  // GET /levels
  index: function(req, res) {
    Level.findAll().then(function(levels) {
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

  // GET /levels/2
  show: function(req, res) {
    assert.ok(req.params.id, 'ID must be set');
    Level
      .find(req.params.id)
      .then(function(level) {
        res.format({
          html: function() {
            res.render('levels/show', { level: level });
          },
          json: function() {
            res.send(level);
          }
        });
      })
      .catch(function(err) {
        res.send(err);
      });
  },

  // POST /levels
  create: function(req, res) {
    Level
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
    Level
      .find(req.params.id)
      .then(function(level) {
        level.destroy().then(function() {
          res.send({success: true});
        });
      })
      .catch(function(err) {
        res.send(err);
      });
  }
};

module.exports = controller;
