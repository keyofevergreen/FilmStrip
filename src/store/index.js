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
    selectedFilm: null,
    trailersUrlOfSelectedFilm: null,
    ageLimitsOfSelectedFilm: null,
    isFetchingFilms: false,
    selectedReleaseSort: 'released',
    selectedGenresSort: '',
    cinemas: [
      {
        name: 'Кронверк Вью МЕГА JS',
        address: 'площадь Приведения Типов 13, корпус 3, «МЕГА JS», NaN-й этаж',
        id: 666,
        formats: [
          {
            format: '2D',
            sessions: [
              {
                time: '11:20',
                price: '200',
                hall: 1
              },
              {
                time: '13:15',
                price: '250',
                hall: 1
              },
              {
                time: '16:10',
                price: '250',
                hall: 1
              },
              {
                time: '18:05',
                price: '300',
                hall: 1
              },
              {
                time: '21:20',
                price: '300',
                hall: 1
              },
              {
                time: '23:55',
                price: '200',
                hall: 1
              }
            ]
          },
          {
            format: '3D',
            sessions: [
              {
                time: '11:20',
                price: '200',
                hall: 1
              },
              {
                time: '13:15',
                price: '250',
                hall: 1
              },
              {
                time: '16:10',
                price: '250',
                hall: 1
              },
              {
                time: '18:05',
                price: '300',
                hall: 1
              },
              {
                time: '21:20',
                price: '300',
                hall: 1
              },
              {
                time: '23:55',
                price: '200',
                hall: 1
              }
            ]
          }
        ]
      },
      {
        name: 'Async Синема',
        address: 'Булиевое шоссе 14, «ТЦ AWAIT», 4-й этаж',
        id: 999,
        formats: [
          {
            format: '2D',
            sessions: [
              {
                time: '11:20',
                price: '200',
                hall: 1
              },
              {
                time: '14:10',
                price: '250',
                hall: 1
              },
              {
                time: '15:30',
                price: '250',
                hall: 1
              },
              {
                time: '16:25',
                price: '250',
                hall: 1
              },
              {
                time: '17:40',
                price: '250',
                hall: 1
              },
              {
                time: '18:35',
                price: '300',
                hall: 1
              },
              {
                time: '22:10',
                price: '250',
                hall: 1
              },
              {
                time: '23:05',
                price: '200',
                hall: 1
              }
            ]
          },
          {
            format: 'IMAX',
            sessions: [
              {
                time: '10:20',
                price: '400',
                hall: 1
              },
              {
                time: '14:55',
                price: '450',
                hall: 1
              },
              {
                time: '17:20',
                price: '450',
                hall: 1
              },
              {
                time: '17:55',
                price: '510',
                hall: 1
              },
              {
                time: '20:35',
                price: '510',
                hall: 1
              },
              {
                time: '23:25',
                price: '450',
                hall: 1
              }
            ]
          }
        ]
      }],
    ticketsPickerModalVisible: false,
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
    },
    setSelectedFilm(state, film) {
      state.selectedFilm = film;
    },
    setTrailerUrlOfSelectedFilm(state, url) {
      state.trailersUrlOfSelectedFilm = url;
    },
    setAgeLimitsOfSelectedFilm(state, ageLimits) {
      state.ageLimitsOfSelectedFilm = ageLimits;
    },
    setTicketsPickerModalVisible(state, bool) {
      state.ticketsPickerModalVisible = bool;
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
