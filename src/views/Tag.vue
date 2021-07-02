<template>
  <Problems class="tag" :questions="questions" />
</template>

<script>
import Problems from "@/components/Questions.vue";
import { getTagQuestions } from "@/apis/getQuestions";

export default {
  name: "Tag",
  data() {
    return {
      params: this.$route.params.tag,
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
      getTagQuestions(this.params).then(value => {
        const data = value.data;
        this.questions = data;
      });
    }
  }
};
</script>
