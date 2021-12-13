<template>
  <div>
    Это страница фильма с ID {{ $route.params.id }}
    <film-item :film="filmData" :trailerURL="trailerURL"></film-item>
  </div>
</template>

<script>
import FilmItem from '../components/FilmItem';

export default {
  name: 'FilmPage',
  components: {
    FilmItem
  },
  props: {
    id: String
  },
  data() {
    return {
      filmData: {},
      trailerURL: null,
      isFetching: false
    }
  },
  methods: {
    setDuration(duration) {
      const lastSymbol = duration.toString().slice(-1);
      if (lastSymbol === '1') {
        return `${duration} минута`
      }
      if (lastSymbol > 1 && lastSymbol < 5) {
        return `${duration} минуты`
      }
      return `${duration} минут`
    },
    setFetching(bool) {
      this.isFetching = bool;
    },
    setFilmData(film) {
      this.filmData = film;
    },
    setTrailerData(trailers) {
      const trailer = trailers?.items.filter(trailer => trailer.site === 'YOUTUBE' && /(Трейлер)/i.test(trailer.name));
      if(trailer.length) {
        const regex = /(?:https?:\/\/)?(?:www\.)?youtu\.?be(?:\.com)?\/?.*(?:watch|embed)?(?:.*v=|v\/|\/)([\w\-_]+)?/;
        const url = trailer[0]?.url;
        this.trailerURL = `https://www.youtube.com/embed/${url.match(regex)[1]}`;
      }
    },
    async fetchFilmsData(id) {
      try {
        this.setFetching(true);
        const filmData = await fetch(`https://kinopoiskapiunofficial.tech//api/v2.2/films/${id}`, {
          method: 'GET',
          headers: {
            'X-API-KEY': 'bbd5c8d2-662f-428b-9b73-5fb961a663ad',
            'Content-Type': 'application/json',
          },
        });
        const film = await filmData.json();
        await this.setFilmData(film)

        const trailerData = await fetch(`https://kinopoiskapiunofficial.tech//api/v2.2/films/${id}/videos`, {
          method: 'GET',
          headers: {
            'X-API-KEY': 'bbd5c8d2-662f-428b-9b73-5fb961a663ad',
            'Content-Type': 'application/json',
          },
        });
        const trailer = await trailerData.json();
        await this.setTrailerData(trailer)

      } catch (e) {
        console.error(e)
      } finally {
        this.setFetching(false);
      }
    },

    setAgeRatingLimits(film) {
      if (film.ratingAgeLimits === null) {
        return '0+'
      } else {
        return `${film.ratingAgeLimits.match(/\d{1,2}/g)}+`
      }
    }
  },
  mounted() {
    this.fetchFilmsData(this.id);
  },
  watch: {
    film(newValue) {
      this.ageRatingLimits = this.setAgeRatingLimits(newValue);
    }
  }
}
</script>

<style scoped>

</style>