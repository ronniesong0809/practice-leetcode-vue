import axios from "axios";

export function postQuestionsToNotion(questionId) {
  return postQuestions("notion", questionId);
}

function postQuestions(endpoint, questionId) {
  return axios.post(`${process.env.VUE_APP_BASEURL}/${endpoint}`, {
    id: questionId
  });
}
