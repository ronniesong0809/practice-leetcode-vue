<template>
  <v-sheet>
    <v-toolbar dark flat>
      <v-app-bar-nav-icon></v-app-bar-nav-icon>
      <v-toolbar-title>Practice Leetcode</v-toolbar-title>
      <template v-slot:extension>
        <v-tabs>
          <v-tabs-slider></v-tabs-slider>
          <v-tab to="/">
            Home
          </v-tab>
          <v-tab to="/about">
            About
          </v-tab>
        </v-tabs>
      </template>
    </v-toolbar>
  </v-sheet>
</template>
