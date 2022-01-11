import axios from "axios";

// url to request
export default axios.create({
  baseURL: "http://localhost:9000",

  responseType: "json",
  headers: {
    "Content-Type": "application/json",
  },
});
