import Api from "./api";

const config = {
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded'
  }
}

const auth = {
  login(data) {
    return Api.post(`/user/login`, data, config);
  },
  register(data) {
    return Api.post(`/user/register`, data, config);
  },
};

export default auth;