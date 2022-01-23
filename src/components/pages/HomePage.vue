<template>
  <main>
    <filmstrip-swiper/>
    <film-list :mode="'crop'"></film-list>
  </main>
</template>

<script>
import FilmstripSwiper from "../FilmstripSwiper";
import FilmList from '../FilmList';

export default {
  name: "HomePage",
  components: { FilmstripSwiper, FilmList }
}
</script>