<template>
  <sort-by-release-buttons/>
  <div v-if="mode === 'full'" class="film-list-full">
    <film-list-item
        v-for="film in films"
        :key="film.kinopoiskId"
        :film="film"
    >
    </film-list-item>
  </div>
  <div v-else class="film-list-crop">
    <my-film-swiper :filmList="films"/>
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
    mode: String,
  },
  components: {
    SortByReleaseButtons,
    MyFilmSwiper,
    FilmListItem,
  },
  computed: {
    ...mapState({
      isReleasedFilms: state => state.selectedReleaseSort,
      selectedGenreSort: state => state.selectedGenreSort
    }),
    ...mapGetters({
      films: 'filmsAfterSorts',
    }),
  }
}
</script>

<style scoped>
.film-list-full {
  display: grid;
  gap: 20px;
  grid-template-columns: repeat(auto-fill, minmax(210px, 1fr));
}

@media (max-width: 440px) {
  .film-list-full {
    padding: 0 80px;
  }
}
</style>