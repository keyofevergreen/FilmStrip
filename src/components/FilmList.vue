<template>
  <sort-by-release-buttons/>
  <div v-if="mode === 'crop'" class="film-list-wrap">
    <my-film-swiper :filmList="releasedFilms" v-if="isReleasedFilms"/>
    <my-film-swiper :filmList="unreleasedFilms" v-else/>
  </div>
  <div v-else>
    <div v-if="isReleasedFilms">
      <film-list-item v-for="film in releasedFilms.slice(0, 5)" :key="film.kinopoiskId" :id="film.kinopoiskId"></film-list-item>
    </div>
  </div>
</template>

<script>
import 'swiper/swiper-bundle.css';
import { mapGetters, mapState } from 'vuex';
import SortByReleaseButtons from './SortByReleaseButtons';
import MyFilmSwiper from './UI/MyFilmSwiper';
import FilmListItem from './FilmListItem';

export default {
  name: 'FilmList',
  props: {
    mode: String
  },
  components: {
    SortByReleaseButtons,
    MyFilmSwiper,
    FilmListItem
  },
  computed: {
    ...mapState({
      isReleasedFilms: state => state.isReleasedFilms
    }),
    ...mapGetters({
      releasedFilms: 'getReleasedFilms',
      unreleasedFilms: 'getUnreleasedFilms'
    })
  }
}
</script>

<style scoped>
.film-list-wrap {
  height: 605px;
}
</style>