<template>
  <div id="app">
    <v-app>
      <div id="nav">
        <router-link to="/">Home</router-link> |
        <router-link to="/about">About</router-link>
      </div>
      <v-layout column class="fab-container">
        <ScrollTotop class="mx-4" />
        <DarkTheme class="ma-4" />
      </v-layout>
      <router-view />
    </v-app>
  </div>
</template>

<script>
import DarkTheme from "@/components/DarkTheme.vue";
import ScrollTotop from "@/components/ScrollTotop.vue";

export default {
  components: {
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
  text-align: center;
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
