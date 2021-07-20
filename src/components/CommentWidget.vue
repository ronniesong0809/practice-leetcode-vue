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
              :shortname="disqus_shortname"
              :pageConfig="{
                url: `${url}/?search=${item.title}`,
                identifier: `${item.id}`,
                title: `${item.id}. ${item.title}`
              }"
            />
          </v-tab-item>

          <v-tab-item class="pa-5">
            <vue-cusdis
              :key="item.id"
              :attrs="{
                host: cusdis_appId,
                appId: cusdis_pageId,
                pageId: `${item.id}`,
                pageTitle: `${item.id}. ${item.title}`,
                pageUrl: `${url}/?search=${item.title}`,
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
  data() {
    return {
      url: window.location.origin,
      disqus_shortname: process.env.VUE_APP_DISQUS_SHORTNAME,
      cusdis_appId: process.env.VUE_APP_CUSDIS_APP_ID,
      cusdis_pageId: process.env.VUE_APP_CUSDIS_PAGE_ID
    };
  },
  props: {
    item: Object
  },
  methods: {
    theme() {
      return this.$vuetify.theme.dark ? "dark" : "light";
    }
  }
};
</script>
