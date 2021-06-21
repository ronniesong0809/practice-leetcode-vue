<template>
  <v-app id="app">
    <Header />
    <v-layout column class="fab-container">
      <ScrollTotop class="mx-4" />
      <DarkTheme class="ma-4" />
    </v-layout>
    <router-view :key="$route.fullPath" />
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
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
.fab-container {
  position: fixed;
  z-index: 1;
  bottom: 0px;
  right: 0px;
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
</style>
