import { createStore } from 'vuex';
import moment from 'moment';

const LAST_MONTH = moment().subtract(1, 'months')
const CURRENT_DATE = moment();
const NEXT_MONTH = moment().add(1, 'months')
// Need to get films in three months: past, present and next
const MONTHS = [LAST_MONTH, CURRENT_DATE, NEXT_MONTH]

export default createStore({
  state: {
    films: [],
    isFetchingFilms: false,
    isReleasedFilms: true,
    isAuth: false,
  },
  getters: {
    // Premiers of the month
    getCurrentPremiers(state) {
      return state.films.filter(film => moment(film.premiereRu, 'YYYY-MM-DD').format('MM') === CURRENT_DATE.format('MM'))
    },
    // Released films before the current date in descending order of release date
    getReleasedFilms(state) {
      return state.films.filter(film => moment(film.premiereRu, 'YYYY-MM-DD') <= CURRENT_DATE).reverse()
    },
    getUnreleasedFilms(state) {
      return state.films.filter(film => moment(film.premiereRu, 'YYYY-MM-DD') > CURRENT_DATE && moment(film.premiereRu, 'YYYY-MM-DD') < NEXT_MONTH)
    },
  },
  mutations: {
    setFetchedFilms(state, films) {
        state.films = [...state.films, ...films];
    },
    setFetchingFilms(state, bool) {
      state.isFetchingFilms = bool;
    },
    setSortFilms(state, bool) {
      state.isReleasedFilms = bool;
    }
  },
  actions: {
    async fetchFilms({ commit }) {
      commit('setFetchingFilms', true);

      for (const month of MONTHS) {
        try {
          const response = await fetch(`https://kinopoiskapiunofficial.tech/api/v2.2/films/premieres?year=${month.format('YYYY')}&month=${month.format('MMMM').toUpperCase()}`, {
            method: 'GET',
            headers: {
              'X-API-KEY': 'bbd5c8d2-662f-428b-9b73-5fb961a663ad',
              'Content-Type': 'application/json',
            },
          })
          const data = await response.json();
          await commit('setFetchedFilms', data.items);
        } catch (err) {
          console.error(err);
        } finally {
          commit('setFetchingFilms', false);
        }
      }
    }
  },
});
