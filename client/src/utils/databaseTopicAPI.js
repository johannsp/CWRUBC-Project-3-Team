import axios from "axios";

export default {
  // Topics
  getAllTopics: function() {
    return axios.get("/api/topic");
  },
  getTopicById: function(id) {
    return axios.get(`/api/topic/${id}`);
  },
  saveTopic: function(data) {
    return axios.post("/api/topic", data);
  },
  updateTopicByID: function(id, data) {
    return axios.put(`/api/topic/${id}`, data);
  },
  deleteTopicByID: function(id) {
    return axios.delete(`/api/topic/${id}`);
  }
};
