<template>
  <Problems class="home" :questions="questions" />
</template>

<script>
// @ is an alias to /src
import Problems from "@/components/Questions.vue";
import { getAllQuestions } from "@/apis/getQuestions";

export default {
  name: "Home",
  data() {
    return {
      questions: []
    };
  },
  components: {
    Problems
  },

  created() {
    this.fetchQuestions();
  },
  methods: {
    async fetchQuestions() {
      getAllQuestions().then(value => {
        const data = value.data;
        this.questions = data;
      });
    }
  }
};
</script>
