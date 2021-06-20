import axios from "axios";

export function getTagQuestions(topic) {
  return getQuestions("tag/" + topic);
}

export function getAllQuestions() {
  return getQuestions("all");
}

export function getTopQuestions() {
  return getQuestions("top/500");
}

function getQuestions(endpoint) {
  console.log(`${process.env.VUE_APP_BASEURL}/${endpoint}`);
  return axios.get(`${process.env.VUE_APP_BASEURL}/${endpoint}`);
}
