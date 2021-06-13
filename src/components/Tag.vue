<template>
  <a-tag
    :color="
      data === 0
        ? 'lime'
        : Math.round(data) === 0
        ? 'gold'
        : Math.round(data) === 1
        ? 'orange'
        : Math.round(data) === 2
        ? 'volcano'
        : Math.round(data) === 3
        ? 'red'
        : 'magenta'
    "
  >
    {{
      data === 0
        ? "UR"
        : Math.round(data) === 0
        ? "VL"
        : Math.round(data) === 1
        ? "L"
        : Math.round(data) === 2
        ? "M"
        : Math.round(data) === 3
        ? "H"
        : "VH"
    }}
  </a-tag>
</template>

<script>
export default {
  name: "Tag",
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
