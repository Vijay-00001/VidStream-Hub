import axios from "axios";

const Axios = axios.create({
  baseURL: "http://localhost:1000/api/",
});

export default Axios;
