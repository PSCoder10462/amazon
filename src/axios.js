import axios from "axios";

const instance = axios.create({
  // API (cloud function) url
  baseURL: "https://www.youtube.com",
});

export default instance;
