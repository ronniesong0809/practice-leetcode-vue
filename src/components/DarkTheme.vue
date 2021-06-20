<template>
  <div style="position: fixed; top: 50px; right: 50px;">
    <v-tooltip v-if="!$vuetify.theme.dark" bottom>
      <template v-slot:activator="{ on }">
        <v-btn v-on="on" color="primary" small fab @click="darkMode">
          <v-icon>mdi-moon-waning-crescent</v-icon>
        </v-btn>
      </template>
      <span>Dark Mode On</span>
    </v-tooltip>

    <v-tooltip v-else bottom>
      <template v-slot:activator="{ on }">
        <v-btn v-on="on" color="primary" small fab @click="darkMode">
          <v-icon color="">mdi-white-balance-sunny</v-icon>
        </v-btn>
      </template>
      <span>Dark Mode Off</span>
    </v-tooltip>
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
