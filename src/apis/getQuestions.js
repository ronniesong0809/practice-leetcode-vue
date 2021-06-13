import axios from "axios";

export function getAllQuestions() {
  return getQuestions("all");
}

export function getTopQuestions() {
  return getQuestions("top/500");
}

function getQuestions(endpoint) {
  return axios.get(`http://127.0.0.1:3000/${endpoint}`);
}
