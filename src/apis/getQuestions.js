import axios from "axios";

export function getTopQuestions() {
  return getQuestions("top/500");
}

function getQuestions(endpoint) {
  return axios.get(`http://127.0.0.1:3000/${endpoint}`);
}
