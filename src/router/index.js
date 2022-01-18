import { createRouter, createWebHistory } from "vue-router";
import HomePage from "../components/pages/HomePage";
import FilmListPage from "../components/pages/FilmListPage";
import FilmPage from '../components/pages/FilmPage';
import ProfilePage from '../components/pages/ProfilePage';
import TicketsHistoryPage from '../components/pages/TicketsHistoryPage';

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
  {
    path: "/profile",
    name: "Profile",
    component: ProfilePage
  },
  {
    path: "/profile/history",
    name: "History",
    component: TicketsHistoryPage
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
