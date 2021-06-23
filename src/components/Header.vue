<template>
  <v-sheet>
    <v-toolbar>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title>Practice Leetcode</v-toolbar-title>
      <template v-slot:extension>
        <v-tabs>
          <v-tabs-slider></v-tabs-slider>
          <v-tab to="/">
            Home
          </v-tab>
          <v-tab to="/company">
            Company
          </v-tab>
          <v-tab to="/about">
            About
          </v-tab>
        </v-tabs>
      </template>
    </v-toolbar>

    <v-navigation-drawer v-model="drawer" absolute temporary>
      <v-list rounded>
        <v-list-item link to="/">
          <v-list-item-title>Home</v-list-item-title>
          <v-list-item-icon>
            <v-icon>mdi-home</v-icon>
          </v-list-item-icon>
        </v-list-item>

        <v-list-group :value="true" prepend-icon="mdi-dots-horizontal">
          <template v-slot:activator>
            <v-list-item-title>More</v-list-item-title>
          </template>
          <v-list-group :value="true" no-action sub-group>
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

          <v-list-group no-action sub-group>
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
        </v-list-group>

        <v-list-item link to="/about">
          <v-list-item-title>About</v-list-item-title>
          <v-list-item-icon>
            <v-icon>mdi-information</v-icon>
          </v-list-item-icon>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
  </v-sheet>
</template>

<script>
export default {
  data() {
    return {
      drawer: null,
      companies: [
        ["Amazon", "mdi-amazon", "/company/amazon"],
        ["Facebook", "mdi-facebook", "/company/facebook"],
        ["Google", "mdi-google", "/company/google"],
        ["Linkedin", "mdi-linkedin", "/company/linkedin"]
      ],
      tags: [
        ["Array", "mdi-code-array", "/tag/array"],
        ["Hash Table", "mdi-table-column", "/tag/hash%20table"],
        ["Tree", "mdi-graph", "/tag/tree"],
        ["String", "mdi-form-textbox-password", "/tag/string"]
      ]
    };
  }
};
</script>
