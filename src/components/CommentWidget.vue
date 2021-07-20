<template>
  <v-row class="windows" justify="center">
    <v-col md="12" lg="8" xl="6">
      <v-card class="elevation-5 mt-5">
        <v-tabs grow>
          <v-tab>Disqus</v-tab>
          <v-tab>Cusdis</v-tab>

          <v-tab-item class="pa-5">
            <Disqus
              ref="disqus"
              shortname="practice-algorithms"
              :pageConfig="{
                url: `${getUrl()}/?search=${item.title}`,
                identifier: `${item.id}`,
                title: `${item.id}. ${item.title}`,
                language: 'en_US'
              }"
            />
          </v-tab-item>

          <v-tab-item class="pa-5">
            <vue-cusdis
              :key="item.id"
              :attrs="{
                host: 'https://cusdis-lc.vercel.app',
                appId: '2cb59828-b026-4ae9-8964-a50a5efab645',
                pageId: `${item.id}`,
                pageTitle: `${item.id}. ${item.title}`,
                pageUrl: `${getUrl()}/?search=${item.title}`,
                theme: theme()
              }"
            >
            </vue-cusdis>
          </v-tab-item>
        </v-tabs>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import { Disqus } from "vue-disqus";
import VueCusdis from "vue-cusdis/dist/vue2.es";

export default {
  name: "CommentWidget",
  components: {
    Disqus,
    VueCusdis
  },
  props: {
    item: Object
  },
  methods: {
    getUrl() {
      return window.location.origin;
    },
    theme() {
      return this.$vuetify.theme.dark ? "dark" : "light";
    }
  }
};
</script>
