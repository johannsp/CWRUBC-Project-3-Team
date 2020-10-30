const router = require("express").Router();
const topicController = require("../../controllers/topicController");

// Matches with "/api/topic"
router.route("/")
  .get(topicController.findAll)
  .post(topicController.create);

// Matches with "/api/topic/:id"
router.route("/:id")
  .get(topicController.findById)
  .put(topicController.update)
  .delete(topicController.remove);

module.exports = router;