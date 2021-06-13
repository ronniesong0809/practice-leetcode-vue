<template>
  <a-progress :percent="toFixed(data * 25)" size="small" />
</template>

<script>
export default {
  name: "ProgressBar",
  props: {
    data: Number
  },
  methods: {
    toFixed(value) {
      return Number(value.toFixed(2));
    }
  }
};
</script>
