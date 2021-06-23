<template>
  <v-row class="text-center">
    <v-col md="10" offset-md="1" lg="8" offset-lg="2">
      <v-chip
        class="ma-1"
        v-for="item in data"
        :key="item.name"
        @click="redirect(item.name)"
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
    redirect(name) {
      this.$router.push(`${this.$router.history.current.path}/${name}`);
    }
  }
};
</script>
