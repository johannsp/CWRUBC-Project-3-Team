import axios from "axios";

export default {
  // Login
  login: function(email, password) {
    return axios.post("/api/auth/login", {
      email: email,
      password: password
    })
  },
  signup: function(email, password) {
    return axios.post("/api/auth/signup", {
      email: email,
      password: password
    })
  },
  logout: function() {
    return axios.get("/api/auth/logout");
  },
  userData: function(id) {
    return axios.get("/api/auth/user_data" + id);
  }
};
