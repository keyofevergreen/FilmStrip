import { createStore } from 'vuex';
// import moment from 'moment';
import { authModule } from './authModule';
import { filmsModule } from './filmsModule';
import { cinemaSessionInfoModule } from './cinemaSessionInfoModule';
import { selectedFilmModule } from './selectedFilmModule';

export default createStore({
  modules: {
    auth: authModule,
    films: filmsModule,
    cinemaSession: cinemaSessionInfoModule,
    selectedFilm: selectedFilmModule
  },
  state: {
    selectedReleaseSort: 'released',
    selectedGenresSort: '',
    isTimeExpired: false,
  },
  mutations: {
    setReleaseSort(state, bool) {
      state.selectedReleaseSort = bool;
    },
    setGenresSort(state, genres) {
      state.selectedGenresSort = genres;
    },
    setIsTimeExpired(state, bool) {
      state.isTimeExpired = bool;
    },
  },
});
