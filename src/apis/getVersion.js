import axios from "axios";

export function getLastUpdated() {
  return getVersion("lastUpdated");
}

function getVersion(endpoint) {
  return axios.get(`${process.env.VUE_APP_BASEURL}/${endpoint}`);
}
