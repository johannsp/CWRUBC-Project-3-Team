// Requiring our models as we've configured it
const db = require("../models");

// Defining methods here for the ../routes/api/dbTopic.js
module.exports = {
  findAll: function(req, res) {
    ///include: [db.Post] if doing a left join
    db.Topic
      .findAll({})
      .then(dbTopic => res.json(dbTopic))
      .catch(err => res.status(422).json(err));
  },
  findById: function(req, res) {
    // Find one Topic with the id in req.params.id and return them to the user with res.json
    db.Topic
      .findOne({
        where: {
          id: req.params.id
        }
      })
      .then(dbTopic => res.json(dbTopic))
      .catch(err => res.status(422).json(err));
  },
  create: function(req, res) {
    // Create an Topic with the data available to us in req.body
    console.log(`POST: /api/topic req.body=${JSON.stringify(req.body)}`);
    db.Topic.create(req.body)
      .then(dbTopic => {
        res.json(dbTopic);
      })
      .catch(err => res.status(422).json(err));
  },
  update: function(req, res) {
    // Update takes in an object describing the properties we want to update, and
    // we use where to describe which objects we want to update
    db.Topic
      .update({
        title: req.body.title,
        time: req.body.time,
        renameMe: req.body.notes
      }, {
        where: {
          id: req.body.id
        }
      })
      .then(function(dbTopic) {
        res.json(dbTopic);
      })
      .catch(err => res.status(422).json(err));
  },
  remove: function(req, res) {
    // Delete the Topic with the id available to us in req.params.id
    db.Topic
      .destroy({
        where: {
          id: req.params.id
        }
      })
      .then(dbTopic => res.json(dbTopic))
      .catch(err => res.status(422).json(err));
  }
};
