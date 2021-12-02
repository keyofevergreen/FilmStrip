import { createStore } from "vuex";
import moment from "moment";

const CURRENT_DATE = moment();
export default createStore({
  state: {
    films: [],
    isReleasedFilms: true,
    isAuth: false,
  },
  getters: {
    // Premiers of the month
    getCurrentPremiers(state) {
      return state.films.filter(film => moment(film.premiereRu, 'YYYY-MM-DD').format('MM') === CURRENT_DATE.format('MM'))
    },
    // Released films before the current date
    getReleasedFilms(state) {
      return state.films.filter(film => moment(film.premiereRu, 'YYYY-MM-DD') <= CURRENT_DATE)
    },
    // Unreleased films after the current date
    getUnreleasedFilms(state) {
      return state.films.filter(film => moment(film.premiereRu, 'YYYY-MM-DD') > CURRENT_DATE)
    },
  },
  mutations: {
    setFetchedFilms(state, films) {
      state.films = [...state.films, ...films];
    },
    setSortFilms(state, bool) {
      state.isReleasedFilms = bool;
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
