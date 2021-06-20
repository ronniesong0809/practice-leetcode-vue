<template>
  <div v-if="!$vuetify.theme.dark">
    <v-btn v-on="on" fab dark fixed top right color="black" @click="darkMode">
      <v-icon color="yellow lighten-1">mdi-moon-waning-crescent</v-icon>
    </v-btn>
  </div>
  <div v-else>
    <v-btn v-on="on" fab dark fixed top right color="primary" @click="darkMode">
      <v-icon color="yellow lighten-1">mdi-white-balance-sunny</v-icon>
    </v-btn>
  </div>
</template>

<script>
export default {
  methods: {
    darkMode() {
      this.$vuetify.theme.dark = !this.$vuetify.theme.dark;
    }
  }
};
</script>
