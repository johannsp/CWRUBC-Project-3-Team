const router = require("express").Router();
const lessonRoutes = require("./dbLesson");
const topicRoutes = require("./dbTopic");

// Database routes with absolute path /api/lesson
router.use("/lesson", lessonRoutes);

// Database routes with absolute path /api/topic
router.use("/topic", topicRoutes);

module.exports = router;
