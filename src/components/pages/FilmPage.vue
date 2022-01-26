<template>
  <div v-if="selectedFilm && !isFetching">
    <film-item :film="selectedFilm" :trailerURL="trailerURL"></film-item>
    <div class="data-line">
      <date-picker/>
    </div>
    <session-schedule></session-schedule>
  </div>
</template>

<script>
import FilmItem from '../FilmItem';
import SessionSchedule from '../SessionSchedule';
import { mapMutations, mapState } from 'vuex';
import DatePicker from '../DatePicker';
import moment from 'moment';

export default {
  name: 'FilmPage',
  components: {
    FilmItem,
    SessionSchedule,
    DatePicker
  },
  props: {
    id: String
  },
  computed: {
    ...mapState({
      selectedFilm: state => state.selectedFilm.film,
      trailerURL: state => state.selectedFilm.trailerUrl,
      ratingAgeLimits: state => state.selectedFilm.ageLimits,
    })
  },
  data() {
    return {
      isFetching: false,
    };
  },
  methods: {
    ...mapMutations({
      setFilmData: 'selectedFilm/setSelectedFilm',
      setTrailersUrl: 'selectedFilm/setTrailerUrlOfSelectedFilm',
      setAgeLimits: 'selectedFilm/setAgeLimitsOfSelectedFilm',
      setDate: 'selectedFilm/setSelectedDate',
      setPremiereDate: 'selectedFilm/setPremiereDate'
    }),
    setFetching(bool) {
      this.isFetching = bool;
    },

    getCorrectYoutubeTrailerUrl(trailers) {
      const requiredString = /(Трейлер)/i;
      const trailer = trailers?.items.filter(trailer => trailer.site === 'YOUTUBE' && requiredString.test(trailer.name));
      if (trailer.length) {
        const regex = /(?:https?:\/\/)?(?:www\.)?youtu\.?be(?:\.com)?\/?.*(?:watch|embed)?(?:.*v=|v\/|\/)([\w\-_]+)?/;
        const url = trailer[0]?.url;
        return `https://www.youtube.com/embed/${url.match(regex)[1]}`;
      }
    },
    getAgeRatingLimits(film) {
      if (film.ratingAgeLimits === null) {
        return '0+';
      } else {
        return `${film.ratingAgeLimits.match(/\d{1,2}/g)}+`;
      }
    },
    getPremiereDate(premieres) {
      const rusPremieres = premieres.items.filter(premiere => premiere.country?.country === 'Россия');
      const rusPremiereReRelease = rusPremieres.find(premiere => premiere.reRelease === true);

      if(rusPremiereReRelease) {
        return moment(rusPremiereReRelease.date, 'YYYY-MM-DD').format('DD.MM.YYYY');
      } else {
        return moment(rusPremieres[0].date, 'YYYY-MM-DD').format('DD.MM.YYYY');
      }
    },
    async fetchFilmsData(id) {
      const fetchData = (url) => {
        return fetch(url, {
          method: 'GET',
          headers: {
            'X-API-KEY': process.env['VUE_APP_API_KEY'],
            'Content-Type': 'application/json',
          },
        });
      };

      try {
        this.setFetching(true);
        const filmData = await fetchData(`https://kinopoiskapiunofficial.tech/api/v2.2/films/${id}`);
        const film = await filmData.json();

        const trailerData = await fetchData(`https://kinopoiskapiunofficial.tech/api/v2.2/films/${id}/videos`);
        const trailers = await trailerData.json();

        const premiereData = await fetchData(`https://kinopoiskapiunofficial.tech/api/v2.2/films/${id}/distributions`);
        const worldPremieres = await premiereData.json();

        this.setFilmData(film);
        this.setAgeLimits(this.getAgeRatingLimits(film));
        this.setTrailersUrl(this.getCorrectYoutubeTrailerUrl(trailers));
        this.setPremiereDate(this.getPremiereDate(worldPremieres));

      } catch (e) {
        console.error(e);
      } finally {
        this.setFetching(false);
      }
    }
  },
  mounted() {
    this.fetchFilmsData(this.id);
  },
  unmounted() {
    this.setDate(moment().format('DD.MM.YYYY'));
  }
};
</script>

<style scoped>
.data-line {
  display: flex;
  align-items: center;
  margin-top: 20px;
  padding: 10px 20px;
  color: #fff;
  font-size: 20px;
  background-color: var(--green);
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.15);
}
</style>