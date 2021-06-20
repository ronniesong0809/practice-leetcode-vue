import axios from "axios";

export function getAllQuestions() {
  return getQuestions("all");
}

export function getTagQuestions(topic) {
  return getQuestions("tag/" + topic);
}

export function getCompanyQuestions(topic) {
  return getQuestions("company/" + topic);
}

export function getTopQuestions() {
  return getQuestions("top/500");
}

function getQuestions(endpoint) {
  return axios.get(`${process.env.VUE_APP_BASEURL}/${endpoint}`);
}
