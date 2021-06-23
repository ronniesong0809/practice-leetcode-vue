import axios from "axios";

export function getAllCompanies() {
  return getTags("companies");
}

export function getAllTopics() {
  return getTags("topics");
}

function getTags(endpoint) {
  return axios.get(`${process.env.VUE_APP_BASEURL}/${endpoint}`);
}
