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
    releasedFilms: [],
    unreleasedFilms: [],
    isFetchingFilms: false,
    selectedReleaseSort: 'released',
    selectedGenresSort: '',
    isAuth: false,
  },
  getters: {
    // Premiers of the month
    getCurrentPremiers(state) {
      return state.films.filter(film => moment(film.premiereRu, 'YYYY-MM-DD').format('MM') === CURRENT_DATE.format('MM'))
    },
    getFilmsAfterSorts(state) {
      const filterByGenres = (films) => {
        if (state.selectedGenresSort) {
          return films.filter(film => {
            for (const genre of film.genres) {
              if (genre.genre === state.selectedGenresSort) {
                return true;
              }
            }
          })
        } else {
          return films;
        }
      }
      if (state.selectedReleaseSort === 'released') {
        return filterByGenres(state.releasedFilms);
      } else {
        return filterByGenres(state.unreleasedFilms);
      }
    }
  },
  mutations: {
    setFilms(state, films) {
      state.films = [...state.films, ...films];
    },
    setReleasedFilms(state, films) {
      // Released films before the current date in descending order of release date
      const releasedFilms = films.filter(film => moment(film.premiereRu, 'YYYY-MM-DD') <= CURRENT_DATE).reverse();
      state.releasedFilms = [...releasedFilms, ...state.releasedFilms];
    },
    setUnreleasedFilms(state, films) {
      const unreleasedFilms = films.filter(film => moment(film.premiereRu, 'YYYY-MM-DD') > CURRENT_DATE && moment(film.premiereRu, 'YYYY-MM-DD') < NEXT_MONTH);
      state.unreleasedFilms = [...state.unreleasedFilms, ...unreleasedFilms]
    },
    setFetchingFilms(state, bool) {
      state.isFetchingFilms = bool;
    },
    setReleaseSort(state, bool) {
      state.selectedReleaseSort = bool;
    },
    setGenresSort(state, genres) {
      state.selectedGenresSort = genres;
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
          await commit('setFilms', data.items);
          await commit('setReleasedFilms', data.items)
          await commit('setUnreleasedFilms', data.items)
        } catch (err) {
          console.error(err);
        } finally {
          commit('setFetchingFilms', false);
        }
      }
    }
  },
});
