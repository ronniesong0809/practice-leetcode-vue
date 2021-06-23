<template>
  <div class="tags ma-16">
    <TagsToChart :data="tags" />
  </div>
</template>

<script>
import TagsToChart from "@/components/TagsToChart";
import { getAllTopics } from "@/apis/getTags";

export default {
  name: "Tags",
  data() {
    return {
      tags: []
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
      getAllTopics().then(value => {
        const data = value.data;
        this.tags = data;
      });
    }
  }
};
</script>
