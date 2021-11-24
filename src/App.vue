<template>
  <Header/>
  <main class="wrap content">
    <FilmSwiper :premiers="premiers"/>
  </main>
</template>
<script>
import moment from "moment";
import FilmSwiper from "./components/FilmSwiper";
import Header from "./components/Header";

export default {
  name: "App",
  components: { FilmSwiper, Header },
  data() {
    return {
      premiers: []
    }
  },
  methods: {},
  mounted() {
    fetch(`https://kinopoiskapiunofficial.tech/api/v2.2/films/premieres?year=${moment().format('YYYY')}&month=${moment().format('MMMM').toUpperCase()}`, {
      method: 'GET',
      headers: {
        'X-API-KEY': 'bbd5c8d2-662f-428b-9b73-5fb961a663ad',
        'Content-Type': 'application/json',
      },
    })
        .then(res => res.json())
        .then(json => {
          console.log(json)
          this.premiers = json;
        })
        .catch(err => console.log(err));
  }
}
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Inter&family=Montserrat&display=swap');

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: 'Inter', sans-serif;
}

.wrap {
  width: 100%;
  min-width: 365px;
  max-width: 1140px;
  margin: 0 auto;
}

.content {
  margin-top: 125px;
}
</style>