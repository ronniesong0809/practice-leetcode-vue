<template>
  <div class="Header mt-10">
    <v-footer color="primary lighten-1" padless>
      <v-row justify="center" no-gutters>
        <v-btn
          v-for="link in links"
          :key="link.name"
          color="white"
          text
          rounded
          class="my-2"
        >
          <a class="white--text" :href="link.url">
            {{ link.name }}
          </a>
        </v-btn>
        <v-col
          class="primary lighten-2 py-4 text-center white--text caption"
          cols="12"
        >
          {{ new Date().getFullYear() }} - <strong>Practice LeetCode</strong>
        </v-col>
      </v-row>
    </v-footer>
  </div>
</template>

<script>
export default {
  data() {
    return {
      links: [
        {
          name: "MIT License",
          url: "https://opensource.org/licenses/MIT"
        },
        {
          name: "Privacy Policy",
          url: "https://www.iubenda.com/privacy-policy/12967727"
        },
        {
          name: "Status",
          url: "https://stats.uptimerobot.com/7y3oKHm5r4"
        },
        {
          name: "Contact Us",
          url: "https://www.tidio.com/talk/ksyhlqm13exaapqnoxfoer9zilkm71da"
        }
      ]
    };
  }
};
</script>
