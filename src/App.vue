<template>
  <v-app id="app">
    <Header />
    <v-layout column class="fab-container">
      <ScrollTotop class="mx-4" />
      <DarkTheme class="ma-4" />
    </v-layout>
    <div id="content" style="height:100%">
      <router-view :key="$route.fullPath" />
    </div>
  </v-app>
</template>

<script>
import DarkTheme from "@/components/DarkTheme.vue";
import ScrollTotop from "@/components/ScrollTotop.vue";
import Header from "@/components/Header.vue";

export default {
  components: {
    Header,
    DarkTheme,
    ScrollTotop
  }
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.fab-container {
  position: fixed;
  z-index: 1;
  bottom: 0px;
  right: 0px;
}

#content {
  margin-top: 150px;
}

.line-through {
  text-decoration: line-through;
}

@keyframes move {
  0% {
    top: 0px;
  }
  50% {
    top: -5px;
  }
  100% {
    top: 0px;
  }
}

@keyframes rotation {
  0% {
    transform: rotate(0deg);
  }
  50% {
    transform: rotate(180deg);
  }
  100% {
    transform: rotate(359deg);
  }
}

@keyframes swing {
  0% {
    transform: rotate(-90deg);
  }
  50% {
    transform: rotate(-120deg);
  }
  100% {
    transform: rotate(-90deg);
  }
}

.theme--dark.v-application .primary--text {
  color: #ffffff !important;
}
</style>
