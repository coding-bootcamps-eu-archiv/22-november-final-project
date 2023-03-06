import { createRouter, createWebHistory } from "vue-router";
import EntryView from "@/views/EntryView.vue";
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
  {
    path: "/admin/login-success/user?:user",
    name: "adminPage",
    component: () => import("@/views/AdminView.vue"),
  },
  {
    path: "/admin/login-sucess/user?:user/:questionId",
    name: "editQuestionPage",
    component: () => import("@/views/EditQuestionView.vue"),
    props: true,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
