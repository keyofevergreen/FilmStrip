import moment from 'moment';

export const selectedFilmModule = {
  state: () => ({
    premiereDate: null,
    selectedDate: moment().format('DD.MM.YYYY'),
    film: null,
    selectedSession: null,
    selectedTickets: [],
    trailerUrl: null,
    ageLimits: null,
    checkoutModalVisible: false,
  }),
  getters: {
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
    setPremiereDate(state, date) {
      state.premiereDate = date;
    },
    setSelectedFilm(state, film) {
      state.film = film;
    },
    setTrailerUrlOfSelectedFilm(state, url) {
      state.trailerUrl = url;
    },
    setAgeLimitsOfSelectedFilm(state, ageLimits) {
      state.ageLimits = ageLimits;
    },
    setCheckoutModalVisible(state, bool) {
      state.checkoutModalVisible = bool;
    },
    setSelectedSession(state, session) {
      state.selectedSession = session;
    },
    setTicket(state, ticket) {
      state.selectedTickets = [...state.selectedTickets, ticket];
    },
    removeTicket(state, id) {
      state.selectedTickets = state.selectedTickets.filter(selectedTicket => selectedTicket.id !== id);
    },
    clearTickets(state) {
      state.selectedTickets = [];
    },
    setSelectedDate(state, newDate) {
      state.selectedDate = newDate;
    }
  },
  namespaced: true
}