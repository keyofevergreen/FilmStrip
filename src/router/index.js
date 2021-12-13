import { createRouter, createWebHistory } from "vue-router";
import HomePage from "../pages/HomePage";
import FilmListPage from "../pages/FilmListPage";
import FilmPage from '../pages/FilmPage';

const routes = [
  {
    path: "/",
    name: "Home",
    component: HomePage,
  },
  {
    path: "/films",
    name: "Films",
    component: FilmListPage,
  },
  {
    path: "/films/:id",
    name: "Film",
    component: FilmPage,
    props: true
  },
  {
    path: "/online-cinema",
    name: "Online Cinema",
    component: FilmListPage,
  },
  {
    path: "/cinema-rent",
    name: "Cinema Rent",
    component: FilmListPage,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
