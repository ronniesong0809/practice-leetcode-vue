<template>
  <v-container class="login text-center" fill-height fluid>
    <v-row align="center" justify="center">
      <v-col sm="12" md="8" lg="4">
        <form v-on:submit="login">
          <v-text-field
            v-model="password"
            :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
            :rules="[rules.required, rules.min]"
            :type="show ? 'text' : 'password'"
            name="input-10-1"
            label="Admin Password"
            hint="At least 4 characters"
            counter
            @click:append="show = !show"
          />
          <v-btn class="mt-4" @click="login">
            Login
          </v-btn>
        </form>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import axios from "axios";

export default {
  name: "Login",
  data() {
    return {
      show: false,
      password: "",
      rules: {
        required: value => !!value || "Required.",
        min: v => v.length >= 4 || "Min 4 characters"
      }
    };
  },
  methods: {
    login(e) {
      e.preventDefault();
      axios
        .post(`${process.env.VUE_APP_BASEURL}/login`, { password: this.password })
        .then(() => {
          console.log("Logged in");
        })
        .catch(() => {
          console.log("Cannot log in");
        });
    }
  }
};
</script>
