import axios from "axios";

export function getAllQuestions() {
  return getQuestions("all");
}

export function getTopQuestions() {
  return getQuestions("top/500");
}

function getQuestions(endpoint) {
  return axios.get(`${process.env.VUE_APP_BASEURL}/${endpoint}`);
}
