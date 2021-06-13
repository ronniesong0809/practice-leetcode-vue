<template>
  <a-rate
    :default-value="
      data === 0
        ? 0
        : Math.round(data) === 0
        ? 1
        : Math.round(data) === 1
        ? 2
        : Math.round(data) === 2
        ? 3
        : Math.round(data) === 3
        ? 4
        : 5
    "
    :tooltips="desc"
    allow-half
    disabled
  >
    <a-icon slot="character" type="fire" />
  </a-rate>
</template>

<script>
export default {
  name: "Rate",
  props: {
    data: Number
  },
  data() {
    return {
      desc: ["Very Low", "Low", "Medium", "High", "Very High"]
    };
  }
};
</script>
