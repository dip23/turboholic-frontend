import Api from "./api";

const dashboard = {
  getFuelUpdate(id, fuelId, startDate, endDate, config) {
    return Api.get(`/fuel-update?vehicleId=${id}&fuelTypeId=${fuelId}&dateStart=${startDate}&dateEnd=${endDate}`, config);
  },
  addFuel(data, config) {
    return Api.post(`/fuel-update/add`, data, config)
  }
};

export default dashboard;