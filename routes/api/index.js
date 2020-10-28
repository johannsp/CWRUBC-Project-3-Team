const router = require("express").Router();
const lessonRoutes = require("./dbLesson");
const topicRoutes = require("./dbTopic");
const authRoutes = require("./passportAuth");

// Database routes with absolute path /api/lesson
router.use("/lesson", lessonRoutes);

// Database routes with absolute path /api/topic
router.use("/topic", topicRoutes);

// Database routes with absolute path /api/Auth
router.use("/auth", authRoutes);

module.exports = router;
