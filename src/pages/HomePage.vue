<template>
  <main>
    <filmstrip-swiper/>
    <film-list :mode="'crop'"></film-list>
  </main>
</template>

<script>
import FilmstripSwiper from "../components/FilmstripSwiper";
import FilmList from '../components/FilmList';

export default {
  name: "HomePage",
  components: { FilmstripSwiper, FilmList },
  data() {
    return {
      films: []
    }
  }
}
</script>

<style scoped>

</style>