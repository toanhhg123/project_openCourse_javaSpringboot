import axios from "axios";

const baseAxios = axios.create({
  baseURL: "http://localhost:8080/api/v1",
});

export default baseAxios;
