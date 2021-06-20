<template>
  <div class="company">
    <Problems :questions="questions" />
  </div>
</template>

<script>
import Problems from "@/components/Questions.vue";
import { getCompanyQuestions } from "@/apis/getQuestions";

export default {
  name: "Company",
  data() {
    return {
      params: this.$route.params.company,
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
      getCompanyQuestions(this.params).then(value => {
        const data = value.data;
        this.questions = data;
      });
    }
  }
};
</script>
