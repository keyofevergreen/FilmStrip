import moment from 'moment';

const LAST_MONTH = moment().subtract(1, 'months');
const CURRENT_DATE = moment();
const NEXT_MONTH = moment().add(1, 'months');
// Need to get films in three months: past, present and next
const MONTHS = [LAST_MONTH, CURRENT_DATE, NEXT_MONTH];

export const filmsModule = {
  state: () => ({
    films: [],
    releasedFilms: [],
    unreleasedFilms: [],
    isFetchingFilms: false,
  }),
  getters: {
    // Premiers of the month
    currentPremiers(state) {
      return state.films.filter(film => moment(film.premiereRu, 'YYYY-MM-DD').format('MM') === CURRENT_DATE.format('MM'));
    },
    filmsAfterSorts(state, getters, rootState) {
      const filterByGenres = (films) => {
        if (rootState.selectedGenresSort) {
          return films.filter(film => {
            for (const genre of film.genres) {
              if (genre.genre === rootState.selectedGenresSort) {
                return true;
              }
            }
          });
        } else {
          return films;
        }
      };
      if (rootState.selectedReleaseSort === 'released') {
        return filterByGenres(state.releasedFilms);
      } else {
        return filterByGenres(state.unreleasedFilms);
      }
    },
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
      state.unreleasedFilms = [...state.unreleasedFilms, ...unreleasedFilms];
    },
    setFetchingFilms(state, bool) {
      state.isFetchingFilms = bool;
    },
  },
  actions: {
    async fetchFilms({ commit }) {
      commit('setFetchingFilms', true);
      console.log(process.env['VUE_APP_API_KEY '])

      for (const month of MONTHS) {
        try {
          const response = await fetch(`https://kinopoiskapiunofficial.tech/api/v2.2/films/premieres?year=${month.format('YYYY')}&month=${month.format('MMMM').toUpperCase()}`, {
            method: 'GET',
            headers: {
              'X-API-KEY': process.env['VUE_APP_API_KEY'],
              'Content-Type': 'application/json',
            },
          });
          const data = await response.json();
          await commit('setFilms', data.items);
          await commit('setReleasedFilms', data.items);
          await commit('setUnreleasedFilms', data.items);
        } catch (err) {
          console.error(err);
        } finally {
          commit('setFetchingFilms', false);
        }
      }
    }
  },
  namespaced: true
}