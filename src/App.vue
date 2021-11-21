<template>
  <div>
    <div class="container">
      <h1 class="header">FilmStrip</h1>
      <h3 class="description">Catch the moments</h3>
      <FilmSwiper :premiers="premiers"/>
    </div>
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
          .catch(err => console.log(err))
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

.container {
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 100px;
}

.header {
  font-size: 6rem;
  font-family: 'Montserrat', sans-serif;
}

.description {
  font-size: 3rem;
  letter-spacing: 0.4em;
  font-family: 'Montserrat', sans-serif;
}

.main-content {
  overflow:hidden;
  position: relative;

  display: flex;
  align-items: center;
  justify-content: center;
  flex-flow: column;

  height: 100vh;

  background: linear-gradient(to right, rgba(36,31,31,1) 0%, rgba(36,31,31,1) 32%, rgba(74,71,70,1) 100%);
  color: #fff;
  text-align: center;
}

.vignette{
  position:absolute;
  width:100%; height:100%;
  box-shadow:inset 0px 0px 150px 20px black;
  mix-blend-mode: multiply;
  -webkit-animation: vignette-anim 3s infinite; /* Safari 4+ */
  -moz-animation:    vignette-anim 3s infinite; /* Fx 5+ */
  -o-animation:      vignette-anim 3s infinite; /* Opera 12+ */
  animation:         vignette-anim 3s infinite; /* IE 10+, Fx 29+ */
}

.noise {
  z-index: 100;
  position: absolute;
  top: 0;
  left: 0;

  width: 100%;
  height: 100%;

  pointer-events: none;
  opacity: .15;
}

.line{
  position:absolute;
  height:100%; width:1px;
  opacity:0.1;
  background-color:#000;
}

.titleCont{position:relative;}

.main-title {
  padding: .3em 1em .25em;
  font-weight: 400;
  font-size: 40px;
  color: white;
  font-family: 'Bellefair', serif;
  position:relative;
  line-height:1.3;
}

.overTitle{
  position:absolute;
  top:0;
  left:0;
}

.dot{
  width:3px;
  height:2px;
  background-color:white;
  position:absolute;
  opacity:0.3;
}


@-webkit-keyframes vignette-anim {
  0%   , 100%{ opacity: 1; }
  50% { opacity: 0.7; }
}
@-moz-keyframes vignette-anim {
  0%   , 100%{ opacity: 1; }
  50% { opacity: 0.7; }
}
@-o-keyframes vignette-anim {
  0%   , 100%{ opacity: 1; }
  50% { opacity: 0.7; }
}
@keyframes vignette-anim {
  0%   , 100%{ opacity: 1; }
  50% { opacity: 0.7; }
}
</style>