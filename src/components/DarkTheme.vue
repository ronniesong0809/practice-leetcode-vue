<template>
  <v-fab-transition v-if="!$vuetify.theme.dark">
    <v-btn class="moon" fab dark color="black" @click="darkMode">
      <v-icon color="yellow">mdi-weather-night</v-icon>
    </v-btn>
  </v-fab-transition>

  <v-fab-transition v-else>
    <v-btn class="sun" fab dark color="primary" @click="darkMode">
      <v-icon color="yellow">mdi-white-balance-sunny</v-icon>
    </v-btn>
  </v-fab-transition>
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

<style>
.sun {
  animation: rotation 4s infinite linear;
}

.sun:hover {
  animation: none;
}

.moon {
  animation: swing 1s infinite linear;
}

.moon:hover {
  animation: none;
  transform: rotate(-90deg);
}
</style>
