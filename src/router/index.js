import Vue from "vue";
import VueRouter from "vue-router";
import VueGtag from "vue-gtag";
import { authGuard } from "../auth/authGuard";
import Home from "../views/Home.vue";
import Tags from "../views/Tags.vue";
import Tag from "../views/Tag.vue";
import Companies from "../views/Companies.vue";
import Company from "../views/Company.vue";
import Dashboard from "../views/Dashboard.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home
  },
  {
    path: "/tag",
    name: "Tags",
    component: Tags
  },
  {
    path: "/tag/:tag",
    name: "Tag",
    component: Tag
  },
  {
    path: "/company",
    name: "Companies",
    component: Companies
  },
  {
    path: "/company/:company",
    name: "Company",
    component: Company
  },
  {
    path: "/dashboard",
    name: "Dashboard",
    component: Dashboard,
    beforeEnter: authGuard
  },
  {
    path: "/about",
    name: "About",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/About.vue")
  }
];

const originalPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err);
};

Vue.use(VueGtag, {
  config: { id: "G-08XMNGYK5C" }
});

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
