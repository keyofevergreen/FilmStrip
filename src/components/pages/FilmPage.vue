<template>
  <div v-if="selectedFilm && !isFetching">
    <film-item :film="selectedFilm" :trailerURL="trailerURL"></film-item>
    <div class="data-line">
      <span>Расписание на сегодня</span>
    </div>
    <session-schedule></session-schedule>
  </div>
</template>

<script>
import FilmItem from '../components/FilmItem';
import SessionSchedule from '../components/SessionSchedule';
import { mapMutations, mapState } from 'vuex';

export default {
  name: 'FilmPage',
  components: {
    FilmItem,
    SessionSchedule
  },
  props: {
    id: String
  },
  computed: {
    ...mapState({
      selectedFilm: state => state.selectedFilm,
      trailerURL: state => state.trailersUrlOfSelectedFilm,
      ratingAgeLimits: state => state.ageLimitsOfSelectedFilm,
      cinemas: state => state.cinemas
    })
  },
  data() {
    return {
      isFetching: false,
    }
  },
  methods: {
    ...mapMutations({
      setFilmData: 'setSelectedFilm',
      setTrailersUrl: 'setTrailerUrlOfSelectedFilm',
      setAgeLimits: 'setAgeLimitsOfSelectedFilm'
    }),
    setFetching(bool) {
      this.isFetching = bool;
    },
    async fetchFilmsData(id) {
      const fetchData = (url) => {
        return fetch(url, {
          method: 'GET',
          headers: {
            'X-API-KEY': 'bbd5c8d2-662f-428b-9b73-5fb961a663ad',
            'Content-Type': 'application/json',
          },
        })
      }
      const getCorrectYoutubeTrailerUrl = (trailers) => {
        const requiredString = /(Трейлер)/i;
        const trailer = trailers?.items.filter(trailer => trailer.site === 'YOUTUBE' && requiredString.test(trailer.name));
        if (trailer.length) {
          const regex = /(?:https?:\/\/)?(?:www\.)?youtu\.?be(?:\.com)?\/?.*(?:watch|embed)?(?:.*v=|v\/|\/)([\w\-_]+)?/;
          const url = trailer[0]?.url;
          return `https://www.youtube.com/embed/${url.match(regex)[1]}`;
        }
      }
      const getAgeRatingLimits = (film) => {
        if (film.ratingAgeLimits === null) {
          return '0+'
        } else {
          return `${film.ratingAgeLimits.match(/\d{1,2}/g)}+`
        }
      }

      try {
        this.setFetching(true);
        const filmData = await fetchData(`https://kinopoiskapiunofficial.tech/api/v2.2/films/${id}`);
        const film = await filmData.json();

        const trailerData = await fetchData(`https://kinopoiskapiunofficial.tech/api/v2.2/films/${id}/videos`);
        const trailers = await trailerData.json();
        await this.setFilmData(film);
        await this.setAgeLimits(getAgeRatingLimits(film));
        await this.setTrailersUrl(getCorrectYoutubeTrailerUrl(trailers));

      } catch (e) {
        console.error(e)
      } finally {
        this.setFetching(false);
      }
    }
  },
  mounted() {
    this.fetchFilmsData(this.id);
  }
}
</script>

<style scoped>
.data-line {
  height: 46px;
  margin-top: 20px;
  padding-left: 20px;
  font-size: 20px;
  color: #fff;
  background-color: var(--green);
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.15);

  display: flex;
  align-items: center;
}
</style>