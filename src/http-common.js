import axios from "axios";

export default axios.create({
  baseURL: "http://www.emsifa.com/api-wilayah-indonesia/api/",
  headers: {
    "Content-type": "application/json",
  },
});
