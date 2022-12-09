import axios from "axios";

const baseURL = "https://turboholic.adaptable.app";

const Api = axios.create({
  baseURL: baseURL,
});

export default Api;
