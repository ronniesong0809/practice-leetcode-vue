<template>
  <div class="home">
    <Problems />
  </div>
</template>

<script>
// @ is an alias to /src
import Problems from "@/components/Questions.vue";

export default {
  name: "Home",
  components: {
    Problems
  }
};
</script>
