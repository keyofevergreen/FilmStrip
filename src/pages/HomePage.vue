<template>
  <Header/>
  <main class="wrap content">
    <FilmSwiper/>
  </main>
</template>

<script>
import FilmSwiper from "../components/FilmSwiper";
import Header from "../components/MyHeader";
import { mapActions } from 'vuex';

export default {
  name: "HomePage",
  components: { FilmSwiper, Header },
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
    this.setFetchedFilms();
  }
}
</script>

<style scoped>

</style>