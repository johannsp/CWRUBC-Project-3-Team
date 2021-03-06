// Requiring our models as we've configured it
const db = require("../models");

// Defining methods here for the ../routes/api/dbTopic.js
module.exports = {
  findAll: function(req, res) {
    ///include: [db.Lesson] if doing a left join
    db.Topic
      .findAll({
        include: [db.Lesson]
      })
      .then(dbTopic => res.json(dbTopic))
      .catch(err => {
        res.status(422).json(err);
        console.log("TOPIC API Error:\n",err);
      });
  },
  findAllByLessonId: function(req, res) {
    ///include: [db.Lesson] if doing a left join
    db.Topic
      .findAll({
        include: [db.Lesson],
        where: {
          LessonId: req.params.lessonid
        }
      })
      .then(dbTopic => res.json(dbTopic))
      .catch(err => {
        res.status(422).json(err);
        console.log("TOPIC API Error:\n",err);
      });
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
      .catch(err => {
        res.status(422).json(err);
        console.log("TOPIC API Error:\n",err);
      });
  },
  create: function(req, res) {
    // Create an Topic with the data available to us in req.body
    console.log(`POST: /api/topic req.body=${JSON.stringify(req.body)}`);
    db.Topic.create(req.body)
      .then(dbTopic => {
        res.json(dbTopic);
      })
      .catch(err => {
        res.status(422).json(err);
        console.log("TOPIC API Error:\n",err);
      });
  },
  update: function(req, res) {
    // Update takes in an object describing the properties we want to update, and
    // we use where to describe which objects we want to update
    db.Topic
      .update({
        title: req.body.title,
        duration: req.body.duration,
        notes: req.body.notes
      }, {
        where: {
          id: req.params.id
        }
      })
      .then(function(dbTopic) {
        res.json(dbTopic);
      })
      .catch(err => {
        res.status(422).json(err);
        console.log("TOPIC API Error:\n",err);
      });
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
      .catch(err => {
        res.status(422).json(err);
        console.log("TOPIC API Error:\n",err);
      });
  }
};
