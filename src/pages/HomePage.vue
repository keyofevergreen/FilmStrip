<template>
  <main>
    <filmstrip-swiper/>
    <film-list-swiper></film-list-swiper>
  </main>
</template>

<script>
import { mapActions } from 'vuex';
import FilmstripSwiper from "../components/FilmstripSwiper";
import moment from 'moment';
import FilmListSwiper from '../components/FilmListSwiper';

export default {
  name: "HomePage",
  components: { FilmstripSwiper, FilmListSwiper },
  data() {
    return {
      films: []
    }
  },
  methods: {
    ...mapActions({
      setFetchedFilms: 'fetchFilms'
    })
  },
  mounted() {
    // Fetching films for the past, current and next month
    this.setFetchedFilms(moment().subtract(1, 'months'));
    this.setFetchedFilms(moment());
    this.setFetchedFilms(moment().add(1, 'months'));
  }
}
</script>

<style scoped>

</style>