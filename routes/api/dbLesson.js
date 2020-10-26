const router = require("express").Router();
const lessonController = require("../../controllers/lessonController");

// Matches with "/api/lesson"
router.route("/")
  .get(lessonController.findAll)
  .post(lessonController.create);

// Matches with "/api/lesson/:id"
router.route("/:id")
  .get(lessonController.findById)
  .put(lessonController.update)
  .delete(lessonController.remove);

module.exports = router;
