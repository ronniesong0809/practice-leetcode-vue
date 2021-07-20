<template>
  <v-row class="windows" justify="center">
    <v-col md="12" lg="8" xl="6">
      <v-card class="elevation-5 mt-5">
        <vue-cusdis
          class="pa-5"
          :key="item.id"
          :attrs="{
            host: 'https://cusdis-lc.vercel.app',
            appId: '2cb59828-b026-4ae9-8964-a50a5efab645',
            pageId: `${item.id}`,
            pageTitle: `${item.id}. ${item.title}`,
            pageUrl: `${getUrl()}/?search=${item.title}`
          }"
        >
        </vue-cusdis>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import VueCusdis from "vue-cusdis/dist/vue2.es";

export default {
  name: "CommentWidget",
  components: {
    VueCusdis
  },
  props: {
    item: Object
  },
  methods: {
    getUrl() {
      return window.location.origin;
    }
  }
};
</script>
