import { createStore } from "vuex";
import moment from "moment";

export default createStore({
  state: {
    films: [],
    currentRoute: '',
    isAuth: false,
  },
  getters: {
    getSortedFilms(state) {
      return state.films.filter(film => moment(film.premiereRu, 'YYYY-MM-DD') <= moment())

    }
  },
  mutations: {
    setFetchedFilms(state, films) {
      state.films = [...state.films, ...films];
    },
    setCurrentRoute(state, newRoute) {
      state.currentRoute = newRoute;
    }
  },
  actions: {
    fetchFilms({ commit }, momentObj) {
      fetch(`https://kinopoiskapiunofficial.tech/api/v2.2/films/premieres?year=${momentObj.format('YYYY')}&month=${momentObj.format('MMMM').toUpperCase()}`, {
        method: 'GET',
        headers: {
          'X-API-KEY': 'bbd5c8d2-662f-428b-9b73-5fb961a663ad',
          'Content-Type': 'application/json',
        },
      })
        .then(res => res.json())
        .then(json => {
          console.log(json)
          commit('setFetchedFilms', json.items);
        })
        .catch(err => console.log(err));
    }
  },
  modules: {},
});
