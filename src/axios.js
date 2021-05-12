import axios from "axios";

const instance = axios.create({
  // API (cloud function) url
  baseURL: "http://localhost:5000",
});

export default instance;
