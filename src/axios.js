import axios from "axios";

const instance = axios.create({
  // API (cloud function) url
  baseURL: "https://ps-amazon-backend.herokuapp.com/",
});

export default instance;
