<template>
  <div class="cinema-header">
    <div class="wrap">
      <div class="logo-line">
        <h1 class="logo-line__header">FilmStrip</h1>
        <h3 class="logo-line__description">Catch the moments</h3>
      </div>
      <nav>
        <ul class="menu">
          <li>Онлайн-кинотеатр</li>
          <li>Фильмы</li>
          <li>Аренда кинозалов</li>
        </ul>
      </nav>
    </div>
  </div>
  <div class="wrap content">
    <FilmSwiper :premiers="premiers"/>
  </div>
</template>
<script>
import moment from "moment";
import FilmSwiper from "./components/FilmSwiper";

export default {
  name: "App",
  components: { FilmSwiper },
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
@import url('https://fonts.googleapis.com/css2?family=Estonia&family=Montserrat&display=swap');

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: 'Montserrat', sans-serif;
}

.wrap {
  width: 100%;
  max-width: 1140px;
  margin: 0 auto;
  padding: 15px;
}

.cinema-header {
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  z-index: 100;
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 100px;
  background-color: #fff;
  box-shadow: 0 4px 8px 0 rgb(0 0 0 / 6%);
}

.menu {
  min-width: 700px;
  height: 34px;
  font-size: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  list-style: none;
}

.menu li {
  flex: 1 1 0px;
  text-align: center;
}

.logo-line {
  width: 100%;
}

.logo-line__header {
  position: relative;
  font-size: 35px;
}

.logo-line__description {
  font-size: 12px;
  letter-spacing: 0.4em;
}

.content {
  margin-top: 110px;
}
</style>