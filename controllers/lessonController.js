// Requiring our models as we've configured it
const db = require("../models");

// Defining methods here for the ../routes/api/dbLesson.js
module.exports = {
  findAll: function(req, res) {
    db.Lesson
      .findAll({})
      .then(dbLesson => res.json(dbLesson))
      .catch(err => {
        res.status(422).json(err);
        console.log("LESSON API Error:\n",err);
      });
  },
  findById: function(req, res) {
    // Find one Lesson with the id in req.params.id and return them to the user with res.json
    db.Lesson
      .findOne({
        where: {
          id: req.params.id
        }
      })
      .then(dbLesson => res.json(dbLesson))
      .catch(err => {
        res.status(422).json(err);
        console.log("LESSON API Error:\n",err);
      });
  },
  create: function(req, res) {
    // Create an Lesson with the data available to us in req.body
    console.log(`POST: /api/lesson req.body=${JSON.stringify(req.body)}`);
    db.Lesson.create(req.body)
      .then(dbLesson => {
        res.json(dbLesson);
      })
      .catch(err => {
        res.status(422).json(err);
        console.log("LESSON API Error:\n",err);
      });
  },
  update: function(req, res) {
    // Update takes in an object describing the properties we want to update, and
    // we use where to describe which objects we want to update
    db.Lesson
      .update({
        title: req.body.title,
        duration: req.body.duration
      }, {
        where: {
          id: req.params.id
        }
      })
      .then(function(dbLesson) {
        res.json(dbLesson);
      })
      .catch(err => {
        res.status(422).json(err);
        console.log("LESSON API Error:\n",err);
      });
  },
  remove: function(req, res) {
    // Delete the Lesson with the id available to us in req.params.id
    db.Lesson
      .destroy({
        where: {
          id: req.params.id
        }
      })
      .then(dbLesson => res.json(dbLesson))
      .catch(err => {
        res.status(422).json(err);
        console.log("LESSON API Error:\n",err);
      });
  }
};
