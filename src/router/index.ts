import { createRouter, createWebHistory } from "vue-router";
import Home from "../pages/Home.vue";
import Team from "../pages/Team.vue";
import PokemonDetail from "../pages/PokemonDetail.vue";

const routes = [
  { path: "/", component: Home },
  { path: "/team", component: Team },
  { path: "/team/:id", component: PokemonDetail },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
