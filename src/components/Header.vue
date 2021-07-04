<template>
  <div class="Header">
    <v-app-bar
      app
      color="primary"
      dark
      src="@/static/images/bg.jpg"
      fade-img-on-scroll
      :collapse="!collapseOnScroll"
      :collapse-on-scroll="collapseOnScroll"
    >
      <template v-slot:img="{ props }">
        <v-img
          v-bind="props"
          gradient="to top right, rgba(156,39,176,0.6), rgba(33,150,243,0.6)"
        >
        </v-img>
      </template>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title>Practice Leetcode</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn
        v-if="!$auth.loading && $auth.isAuthenticated"
        icon
        to="/dashboard"
      >
        <v-avatar>
          <img :src="$auth.user.picture" :alt="$auth.user.name" />
        </v-avatar>
      </v-btn>
      <v-btn
        v-if="!$auth.loading && !$auth.isAuthenticated"
        icon
        @click="login"
      >
        <v-icon>mdi-login-variant</v-icon>
      </v-btn>
      <v-btn
        v-if="!$auth.loading && $auth.isAuthenticated"
        icon
        @click="logout"
      >
        <v-icon>mdi-logout-variant</v-icon>
      </v-btn>
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
            Milestones
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
            <v-list-item-title>Milestones</v-list-item-title>
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
      collapseOnScroll: true,
      tags: [
        ["Array", "mdi-code-array", "/tag/Array"],
        ["Hash Table", "mdi-table-column", "/tag/Hash Table"],
        ["Tree", "mdi-graph", "/tag/Tree"],
        ["String", "mdi-form-textbox-password", "/tag/String"],
        ["All", "mdi-dots-horizontal", "/tag"]
      ],
      companies: [
        ["Google", "mdi-google", "/company/Google"],
        ["Amazon", "mdi-amazon", "/company/Amazon"],
        ["Facebook", "mdi-facebook", "/company/Facebook"],
        ["Linkedin", "mdi-linkedin", "/company/Linkedin"],
        ["All", "mdi-dots-horizontal", "/company"]
      ],
      model: [1]
    };
  },
  methods: {
    // Log the user in
    login() {
      this.$auth.loginWithRedirect();
    },
    // Log the user out
    logout() {
      this.$auth.logout({
        returnTo: window.location.origin
      });
    }
  }
};
</script>

<style>
.border {
  border: 2px dashed orange;
}
</style>
