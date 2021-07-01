<template>
  <div class="Header">
    <v-app-bar dense app>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title>Practice Leetcode</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-icon>mdi-login</v-icon>
      <template v-slot:extension>
        <v-tabs align-with-title>
          <v-tabs-slider></v-tabs-slider>
          <v-tab to="/">
            Algorithms
          </v-tab>
          <v-tab to="/tag">
            Tags
          </v-tab>
          <v-tab to="/company">
            Companies
          </v-tab>
          <v-tab to="/about">
            More
          </v-tab>
        </v-tabs>
      </template>
    </v-app-bar>

    <v-navigation-drawer v-model="drawer" temporary app>
      <v-list rounded>
        <v-list-item @click.stop="drawer = !drawer">
          <v-list-item-title>Home</v-list-item-title>
          <v-list-item-icon>
            <v-icon>mdi-home</v-icon>
          </v-list-item-icon>
        </v-list-item>

        <v-list-item-group color="primary">
          <v-list-item to="/">
            <v-list-item-title>Algorithms</v-list-item-title>
            <v-list-item-icon>
              <v-icon>mdi-brain</v-icon>
            </v-list-item-icon>
          </v-list-item>

          <v-list-group :value="true" no-action>
            <template v-slot:activator>
              <v-list-item-content>
                <v-list-item-title>Tags</v-list-item-title>
              </v-list-item-content>
            </template>
            <v-list-item
              v-for="([title, icon, url], i) in tags"
              :key="i"
              link
              :to="url"
            >
              <v-list-item-title v-text="title"></v-list-item-title>
              <v-list-item-icon>
                <v-icon v-text="icon"></v-icon>
              </v-list-item-icon>
            </v-list-item>
          </v-list-group>

          <v-list-group no-action>
            <template v-slot:activator>
              <v-list-item-content>
                <v-list-item-title>Companies</v-list-item-title>
              </v-list-item-content>
            </template>
            <v-list-item
              v-for="([title, icon, url], i) in companies"
              :key="i"
              link
              :to="url"
            >
              <v-list-item-title v-text="title"></v-list-item-title>
              <v-list-item-icon>
                <v-icon v-text="icon"></v-icon>
              </v-list-item-icon>
            </v-list-item>
          </v-list-group>

          <v-list-item link to="/about">
            <v-list-item-title>More</v-list-item-title>
            <v-list-item-icon>
              <v-icon>mdi-information</v-icon>
            </v-list-item-icon>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>
  </div>
</template>

<script>
export default {
  data() {
    return {
      drawer: null,
      tags: [
        ["Array", "mdi-code-array", "/tag/array"],
        ["Hash Table", "mdi-table-column", "/tag/hash%20table"],
        ["Tree", "mdi-graph", "/tag/tree"],
        ["String", "mdi-form-textbox-password", "/tag/string"]
      ],
      companies: [
        ["Google", "mdi-google", "/company/Google"],
        ["Amazon", "mdi-amazon", "/company/Amazon"],
        ["Facebook", "mdi-facebook", "/company/Facebook"],
        ["Linkedin", "mdi-linkedin", "/company/Linkedin"]
      ],
      model: [1]
    };
  }
};
</script>

<style>
.border {
  border: 2px dashed orange;
}
</style>
