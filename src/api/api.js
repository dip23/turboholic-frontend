import axios from "axios";

const baseURL = "https://api.turboholic.com";

const Api = axios.create({
  baseURL: baseURL,
});

export default Api;
