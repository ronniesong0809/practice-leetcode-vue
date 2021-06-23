import axios from "axios";

export function getAllCompanies() {
  return getCompanies("companies");
}

function getCompanies(endpoint) {
  return axios.get(`${process.env.VUE_APP_BASEURL}/${endpoint}`);
}
