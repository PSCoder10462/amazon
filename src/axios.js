import axios from "axios";

const instance = axios.create({
  // API (cloud function) url
  baseURL: "http://localhost:5001/clone-d34a6/us-central1/api",
});

export default instance;
