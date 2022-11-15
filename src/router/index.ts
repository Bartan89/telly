import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";
import Series from "../components/series/SeriesView.vue";
import ShowDetails from "../components/showDetails/ShowDetails.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/shows/:id",
    name: "shows",
    component: ShowDetails,
  },
  {
    path: "/",
    name: "home",
    component: Series,
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
