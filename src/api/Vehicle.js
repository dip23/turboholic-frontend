import Api from "./api";

const vehicle = {
  getAllVehicle(config) {
    return Api.get(`/vehicle`, config);
  },
  addVehicle(data, config) {
    return Api.post(`/vehicle/add`, data, config);
  },
  getAllFuel(config) {
    return Api.get(`/fuel`, config);
  },
  getFuelById(id, config) {
    return Api.get(`/fuel/${id}`, config);
  },
  getAllEngine(config) {
    return Api.get(`/engine`, config);
  }
};

export default vehicle;