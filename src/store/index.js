import { createStore } from 'vuex';
import moment from 'moment';

const LAST_MONTH = moment().subtract(1, 'months');
const CURRENT_DATE = moment();
const NEXT_MONTH = moment().add(1, 'months');
// Need to get films in three months: past, present and next
const MONTHS = [LAST_MONTH, CURRENT_DATE, NEXT_MONTH];
export default createStore({
  state: {
    films: [],
    releasedFilms: [],
    unreleasedFilms: [],
    selectedFilm: null,
    selectedSession: null,
    selectedTickets: [],
    trailersUrlOfSelectedFilm: null,
    ageLimitsOfSelectedFilm: null,
    isFetchingFilms: false,
    selectedReleaseSort: 'released',
    selectedGenresSort: '',
    checkoutModalVisible: false,
    loginModalVisible: false,
    isTimeExpired: false,
    isAuth: false,
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
                hall: '01',
                hallType: 'standart'
              },
              {
                time: '13:15',
                price: '250',
                hall: '01',
                hallType: 'standart'
              },
              {
                time: '16:10',
                price: '250',
                hall: '01',
                hallType: 'standart'
              },
              {
                time: '18:05',
                price: '300',
                hall: '01',
                hallType: 'standart'
              },
              {
                time: '21:20',
                price: '300',
                hall: '01',
                hallType: 'standart'
              },
              {
                time: '23:55',
                price: '200',
                hall: '01',
                hallType: 'standart'
              }
            ]
          },
          {
            format: '3D',
            sessions: [
              {
                time: '10:30',
                price: '200',
                hall: '02',
                hallType: 'standart'
              },
              {
                time: '12:35',
                price: '250',
                hall: '02',
                hallType: 'standart'
              },
              {
                time: '15:20',
                price: '250',
                hall: '02',
                hallType: 'standart'
              },
              {
                time: '18:20',
                price: '300',
                hall: '02',
                hallType: 'standart'
              },
              {
                time: '20:45',
                price: '300',
                hall: '02',
                hallType: 'standart'
              },
              {
                time: '23:25',
                price: '200',
                hall: '02',
                hallType: 'standart'
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
                hall: '01',
                hallType: 'standart'
              },
              {
                time: '14:10',
                price: '250',
                hall: '01',
                hallType: 'standart'
              },
              {
                time: '15:30',
                price: '250',
                hall: '01',
                hallType: 'standart'
              },
              {
                time: '16:25',
                price: '250',
                hall: '01',
                hallType: 'standart'
              },
              {
                time: '17:40',
                price: '250',
                hall: '01',
                hallType: 'standart'
              },
              {
                time: '18:35',
                price: '300',
                hall: '01',
                hallType: 'standart'
              },
              {
                time: '22:10',
                price: '250',
                hall: '01',
                hallType: 'standart'
              },
              {
                time: '23:05',
                price: '200',
                hall: '01',
                hallType: 'standart'
              }
            ]
          },
          {
            format: 'VIP',
            sessions: [
              {
                time: '10:20',
                price: '700',
                hall: '02',
                hallType: 'vip'
              },
              {
                time: '14:55',
                price: '750',
                hall: '02',
                hallType: 'vip'
              },
              {
                time: '17:20',
                price: '750',
                hall: '02',
                hallType: 'vip'
              },
              {
                time: '17:55',
                price: '810',
                hall: '02',
                hallType: 'vip'
              },
              {
                time: '20:35',
                price: '810',
                hall: '02',
                hallType: 'vip'
              },
              {
                time: '23:25',
                price: '700',
                hall: '02',
                hallType: 'vip'
              }
            ]
          }
        ]
      }],
    halls: [
      {
        hallType: 'standart',
        layout: [
          {
            row: 1,
            seats: [
              { seat: 1, isOccupied: false, peopleCapacity: 'single' },
              { seat: 2, isOccupied: false, peopleCapacity: 'single' },
              { seat: 3, isOccupied: true, peopleCapacity: 'single' },
              { seat: 4, isOccupied: true, peopleCapacity: 'single' },
              { seat: 5, isOccupied: false, peopleCapacity: 'single' },
              { seat: 6, isOccupied: false, peopleCapacity: 'single' },
              { seat: 7, isOccupied: false, peopleCapacity: 'single' },
              { seat: 8, isOccupied: false, peopleCapacity: 'single' },
              { seat: 9, isOccupied: false, peopleCapacity: 'single' },
              { seat: 10, isOccupied: false, peopleCapacity: 'single' }
            ]
          },
          {
            row: 2,
            seats: [
              { seat: 1, isOccupied: false, peopleCapacity: 'single' },
              { seat: 2, isOccupied: false, peopleCapacity: 'single' },
              { seat: 3, isOccupied: false, peopleCapacity: 'single' },
              { seat: 4, isOccupied: false, peopleCapacity: 'single' },
              { seat: 5, isOccupied: false, peopleCapacity: 'single' },
              { seat: 6, isOccupied: false, peopleCapacity: 'single' },
              { seat: 7, isOccupied: false, peopleCapacity: 'single' },
              { seat: 8, isOccupied: false, peopleCapacity: 'single' },
              { seat: 9, isOccupied: false, peopleCapacity: 'single' },
              { seat: 10, isOccupied: false, peopleCapacity: 'single' }
            ]
          },
          {
            row: 3,
            seats: [
              { seat: 1, isOccupied: false, peopleCapacity: 'single' },
              { seat: 2, isOccupied: false, peopleCapacity: 'single' },
              { seat: 3, isOccupied: false, peopleCapacity: 'single' },
              { seat: 4, isOccupied: true, peopleCapacity: 'single' },
              { seat: 5, isOccupied: true, peopleCapacity: 'single' },
              { seat: 6, isOccupied: true, peopleCapacity: 'single' },
              { seat: 7, isOccupied: false, peopleCapacity: 'single' },
              { seat: 8, isOccupied: false, peopleCapacity: 'single' },
              { seat: 9, isOccupied: false, peopleCapacity: 'single' },
              { seat: 10, isOccupied: false, peopleCapacity: 'single' }
            ]
          },
          {
            row: 4,
            seats: [
              { seat: 1, isOccupied: false, peopleCapacity: 'single' },
              { seat: 2, isOccupied: false, peopleCapacity: 'single' },
              { seat: 3, isOccupied: false, peopleCapacity: 'single' },
              { seat: 4, isOccupied: false, peopleCapacity: 'single' },
              { seat: 5, isOccupied: false, peopleCapacity: 'single' },
              { seat: 6, isOccupied: true, peopleCapacity: 'single' },
              { seat: 7, isOccupied: true, peopleCapacity: 'single' },
              { seat: 8, isOccupied: false, peopleCapacity: 'single' },
              { seat: 9, isOccupied: false, peopleCapacity: 'single' },
              { seat: 10, isOccupied: false, peopleCapacity: 'single' }
            ]
          },
          {
            row: 5,
            seats: [
              { seat: 1, isOccupied: false, peopleCapacity: 'single' },
              { seat: 2, isOccupied: false, peopleCapacity: 'single' },
              { seat: 3, isOccupied: true, peopleCapacity: 'single' },
              { seat: 4, isOccupied: false, peopleCapacity: 'single' },
              { seat: 5, isOccupied: true, peopleCapacity: 'single' },
              { seat: 6, isOccupied: true, peopleCapacity: 'single' },
              { seat: 7, isOccupied: false, peopleCapacity: 'single' },
              { seat: 8, isOccupied: false, peopleCapacity: 'single' },
              { seat: 9, isOccupied: false, peopleCapacity: 'single' },
              { seat: 10, isOccupied: false, peopleCapacity: 'single' }
            ]
          }
        ]
      },
      {
        hallType: 'vip',
        layout: [
          {
            row: 1,
            seats: [
              { seat: 1, isOccupied: false, peopleCapacity: 'double' },
              { seat: 2, isOccupied: false, peopleCapacity: 'double' },
              { seat: 3, isOccupied: false, peopleCapacity: 'double' },
              { seat: 4, isOccupied: false, peopleCapacity: 'double' },
            ]
          },
          {
            row: 2,
            seats: [
              { seat: 1, isOccupied: false, peopleCapacity: 'double' },
              { seat: 2, isOccupied: false, peopleCapacity: 'double' },
              { seat: 3, isOccupied: false, peopleCapacity: 'double' },
              { seat: 4, isOccupied: false, peopleCapacity: 'double' },
            ]
          },
          {
            row: 3,
            seats: [
              { seat: 1, isOccupied: false, peopleCapacity: 'double' },
              { seat: 2, isOccupied: false, peopleCapacity: 'double' },
              { seat: 3, isOccupied: false, peopleCapacity: 'double' },
              { seat: 4, isOccupied: false, peopleCapacity: 'double' },
            ]
          },
          {
            row: 4,
            seats: [
              { seat: 1, isOccupied: false, peopleCapacity: 'double' },
              { seat: 2, isOccupied: false, peopleCapacity: 'double' },
              { seat: 3, isOccupied: false, peopleCapacity: 'double' },
              { seat: 4, isOccupied: false, peopleCapacity: 'double' },
            ]
          },
          {
            row: 5,
            seats: [
              { seat: 1, isOccupied: false, peopleCapacity: 'double' },
              { seat: 2, isOccupied: false, peopleCapacity: 'double' },
              { seat: 3, isOccupied: false, peopleCapacity: 'double' },
              { seat: 4, isOccupied: false, peopleCapacity: 'double' },
            ]
          }
        ]
      }
    ]
  },
  getters: {
    // Premiers of the month
    currentPremiers(state) {
      return state.films.filter(film => moment(film.premiereRu, 'YYYY-MM-DD').format('MM') === CURRENT_DATE.format('MM'));
    },
    filmsAfterSorts(state) {
      const filterByGenres = (films) => {
        if (state.selectedGenresSort) {
          return films.filter(film => {
            for (const genre of film.genres) {
              if (genre.genre === state.selectedGenresSort) {
                return true;
              }
            }
          });
        } else {
          return films;
        }
      };
      if (state.selectedReleaseSort === 'released') {
        return filterByGenres(state.releasedFilms);
      } else {
        return filterByGenres(state.unreleasedFilms);
      }
    },
    getCountInfoAboutTickets(state) {
      const ticketsCount = state.selectedTickets.length;
      if (ticketsCount === 1) {
        return '1 билет';
      } else if (ticketsCount < 5) {
        return `${ticketsCount} билета`;
      }
      return `${ticketsCount} билетов`;
    },
    isLimitOfTickets(state) {
      return state.selectedTickets.length >= 5;
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
      state.unreleasedFilms = [...state.unreleasedFilms, ...unreleasedFilms];
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
    setCheckoutModalVisible(state, bool) {
      state.checkoutModalVisible = bool;
    },
    setLoginModalVisible(state, bool) {
      state.loginModalVisible = bool;
    },
    setSelectedSession(state, session) {
      state.selectedSession = session;
    },
    setTicket(state, ticket) {
      state.selectedTickets = [...state.selectedTickets, ticket].sort((prev, next) => prev.seat - next.seat);
    },
    removeTicket(state, id) {
      state.selectedTickets = state.selectedTickets.filter(selectedTicket => selectedTicket.id !== id);
    },
    clearTickets(state) {
      state.selectedTickets = [];
    },
    setIsTimeExpired(state, bool) {
      state.isTimeExpired = bool;
    },
    setAuth(state, bool) {
      state.isAuth = bool;
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
});
