import Api from "./api";

const dashboard = {
  getFuelUpdate(id, fuelId, config) {
    return Api.get(`/fuel-update?vehicleId=${id}&fuelTypeId=${fuelId}`, config);
  },
};

export default dashboard;