<template>
  <my-select v-if="mode === 'full'"></my-select>
  <sort-by-release-buttons/>
  <div v-if="mode === 'full'">
    <div v-if="isReleasedFilms" class="film-list-full">
      <film-list-item v-for="film in releasedFilms" :key="film.kinopoiskId" :film="film"></film-list-item>
    </div>
    <div v-else class="film-list-full">
      <film-list-item v-for="film in unreleasedFilms" :key="film.kinopoiskId" :film="film"></film-list-item>
    </div>
  </div>
  <div v-else class="film-list-crop">
    <my-film-swiper :filmList="releasedFilms" v-if="isReleasedFilms"/>
    <my-film-swiper :filmList="unreleasedFilms" v-else/>
  </div>
</template>

<script>
import 'swiper/swiper-bundle.css';
import { mapGetters, mapState } from 'vuex';
import SortByReleaseButtons from './SortByReleaseButtons';
import MyFilmSwiper from './UI/MyFilmSwiper';
import FilmListItem from './FilmListItem';
import MySelect from './UI/MySelect';

export default {
  name: 'FilmList',
  props: {
    mode: String,
  },
  components: {
    SortByReleaseButtons,
    MyFilmSwiper,
    FilmListItem,
    MySelect
  },
  computed: {
    ...mapState({
      isReleasedFilms: state => state.isReleasedFilms
    }),
    ...mapGetters({
      releasedFilms: 'getReleasedFilms',
      unreleasedFilms: 'getUnreleasedFilms'
    })
  },
}
</script>

<style scoped>
.film-list-full {
  display: grid;
  gap: 20px;
  grid-template-columns: repeat(auto-fit, minmax(210px, 1fr));
}

@media (max-width: 440px) {
  .film-list-full {
    padding: 0 80px;
  }
}
</style>