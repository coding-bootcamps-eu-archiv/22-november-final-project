import { createRouter, createWebHistory } from "vue-router";
import EntryView from "@/views/EntryView.vue";
//import GameView from "@/views/GameView.vue";
import ResultView from "@/views/ResultView.vue";

const routes = [
  {
    path: "/",
    name: "entryPage",
    component: EntryView,
  },
  {
    path: "/game",
    name: "gamePage",
    component: () => import("@/views/GameView.vue"),
  },
  {
    path: "/result",
    name: "resultPage",
    component: ResultView,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
