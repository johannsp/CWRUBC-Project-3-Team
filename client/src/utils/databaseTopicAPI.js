import axios from "axios";

export default {
  // Topics
  getAllTopics: function() {
    return axios.get("/api/topic");
  },
  getTopicById: function(id) {
    return axios.get(`/api/topic/${id}`);
  },
  saveTopicByID: function() {
    return axios.post("/api/topic",
    );
  },
};
