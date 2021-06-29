<template>
  <div class="companies ma-16">
    <TagsToChart :data="companies" :height="3000" />
  </div>
</template>

<script>
import TagsToChart from "@/components/TagsToChart";
import { getAllCompanies } from "@/apis/getTags";

export default {
  name: "Companies",
  data() {
    return {
      companies: []
    };
  },
  components: {
    TagsToChart
  },
  created() {
    this.fetchQuestions();
  },
  methods: {
    async fetchQuestions() {
      getAllCompanies().then(value => {
        const data = value.data;
        this.companies = data;
      });
    }
  }
};
</script>
