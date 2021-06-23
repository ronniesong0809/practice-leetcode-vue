<template>
  <v-row class="text-center">
    <v-col md="10" offset-md="1" lg="8" offset-lg="2">
      <v-chip
        class="ma-1"
        v-for="item in data"
        :key="item.name"
        @click="redirect(item.slug)"
      >
        {{ item.name }}
        <v-chip class="ma-1" x-small color="primary" dark>
          {{ item.count }}
        </v-chip>
      </v-chip>
    </v-col>
  </v-row>
</template>

<script>
export default {
  name: "Chart",
  props: {
    data: Array
  },
  methods: {
    redirect(slug) {
      this.$router.replace("/company/" + slug);
    }
  }
};
</script>
