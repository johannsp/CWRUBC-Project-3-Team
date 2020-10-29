// Requiring our models as we've configured it
const db = require("../models");

// Defining methods here for the ../routes/api/dbLesson.js
module.exports = {
  findAll: function(req, res) {
    ///include: [db.Post] if doing a left join
    db.Lesson
      .findAll({})
      .then(dbLesson => res.json(dbLesson))
      .catch(err => res.status(422).json(err));
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
      .catch(err => res.status(422).json(err));
  },
  create: function(req, res) {
    // Create an Lesson with the data available to us in req.body
    console.log(`POST: /api/lesson req.body=${JSON.stringify(req.body)}`);
    db.Lesson.create(req.body)
      .then(dbLesson => {
        res.json(dbLesson);
      })
      .catch(err => res.status(422).json(err));
  },
  update: function(req, res) {
    // Update takes in an object describing the properties we want to update, and
    // we use where to describe which objects we want to update
    db.Lesson
      .update({
        title: req.body.title,
        time: req.body.time
      }, {
        where: {
          id: req.body.id
        }
      })
      .then(function(dbLesson) {
        res.json(dbLesson);
      })
      .catch(err => res.status(422).json(err));
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
      .catch(err => res.status(422).json(err));
  }
};
