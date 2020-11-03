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
  updateLessonByID: function(id, data) {
    return axios.put(`/api/lesson/${id}`, data);
  },
  deleteLessonByID: function(id) {
    return axios.delete(`/api/lesson/${id}`);
  }
};
