import axios from "axios";

export default {
  // Topics
  getAllTopics: function() {
    return axios.get("/api/topic");
  },
  getAllTopicsByLessonId: function(lessonid) {
    return axios.get(`/api/topic/lessonid/${lessonid}`);
  },
  getTopicById: function(id) {
    return axios.get(`/api/topic/${id}`);
  },
  saveTopic: function(data) {
    return axios.post("/api/topic", data);
  },
  updateTopicById: function(id, data) {
    return axios.put(`/api/topic/${id}`, data);
  },
  deleteTopicById: function(id) {
    return axios.delete(`/api/topic/${id}`);
  }
};
