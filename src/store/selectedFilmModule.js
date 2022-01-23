export const selectedFilmModule = {
  state: () => ({
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
      state.selectedTickets = [...state.selectedTickets, ticket].sort((prev, next) => prev.seat - next.seat);
    },
    removeTicket(state, id) {
      state.selectedTickets = state.selectedTickets.filter(selectedTicket => selectedTicket.id !== id);
    },
    clearTickets(state) {
      state.selectedTickets = [];
    },
  },
  namespaced: true
}