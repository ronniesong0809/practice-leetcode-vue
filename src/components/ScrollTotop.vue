<template>
  <v-fab-transition>
    <v-btn
      class="scrolltop"
      v-scroll="onScroll"
      v-show="fab"
      fab
      dark
      color="primary"
      @click="toTop"
    >
      <v-icon>mdi-arrow-collapse-up</v-icon>
    </v-btn>
  </v-fab-transition>
</template>

<script>
export default {
  data: () => ({
    fab: false
  }),

  methods: {
    onScroll(e) {
      if (typeof window === "undefined") return;
      const top = window.pageYOffset || e.target.scrollTop || 0;
      this.fab = top > 20;
    },
    toTop() {
      this.$vuetify.goTo(0);
    }
  }
};
</script>

<style>
.scrolltop {
  animation: move 2s infinite;
}
</style>
