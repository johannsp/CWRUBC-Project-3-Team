import axios from "axios";

export default {
  // Lessons
  getAllLessons: function() {
    return axios.get("/api/lesson");
  },
  getLessonById: function(id) {
    return axios.get(`/api/lesson/${id}`);
  },
  saveLesson: function(data) {
    return axios.post("/api/lesson", data);
  }
};
