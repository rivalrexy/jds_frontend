import http from "../http-common";

const getProvinces = () => {
  return http.get(`/provinces.json`);
};

const getRegencies = (id) => {
  return http.get(`/regencies/${id}.json`);
};

const getDistricts = (id) => {
  return http.get(`/districts/${id}.json`);
};

const getVillages = (id) => {
  return http.get(`/villages/${id}.json`);
};

const values = {
  getProvinces,
  getRegencies,
  getDistricts,
  getVillages,
  // create,
  // update,
  // remove,
  // removeAll,
  // findByTitle,
};

export default values;
