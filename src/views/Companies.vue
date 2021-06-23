<template>
  <div class="companies ma-16">
    <TagsToChart :data="companies" />
  </div>
</template>

<script>
import TagsToChart from "@/components/TagsToChart";
import { getAllCompanies } from "@/apis/getCompanies";

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
        this.companies = data.sort((a, b) => {
          return a.count < b.count ? 1 : a.count > b.count ? -1 : 0;
        });
      });
    }
  }
};
</script>
