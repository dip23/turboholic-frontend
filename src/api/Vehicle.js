import Api from "./api";

const config = {
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded',
  }
}

const vehicle = {
  getAllVehicle() {
    return Api.get(`/vehicle`);
  },
  addVehicle(data) {
    return Api.post(`/vehicle/add`, data, config);
  },
  getAllFuel() {
    return Api.get(`/fuel`);
  },
  getFuelById(id) {
    return Api.get(`/fuel/${id}`);
  },
  getAllEngine() {
    return Api.get(`/engine`);
  }
};

export default vehicle;