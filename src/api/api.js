import axios from "axios";

const baseURL = "https://turboholic.adaptable.app";

const user = JSON.parse(localStorage.getItem('user'));

const Api = axios.create({
  baseURL: baseURL,
  headers: {
    Authorization: `Bearer ${user?.token}`
  }
});

export default Api;
