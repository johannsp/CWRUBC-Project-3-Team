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
  },
  updateLessonById: function(id, data) {
    return axios.put(`/api/lesson/${id}`, data);
  },
  deleteLessonById: function(id) {
    return axios.delete(`/api/lesson/${id}`);
  }
};
