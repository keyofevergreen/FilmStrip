<template>
  <swiper
      :slidesPerView="3"
      :slidesPerGroup="1"
      :loop="true"
      :loopFillGroupWithBlank="true"
      :autoplay='{
        "delay": 5000,
        "disableOnInteraction": false
      }'
      :breakpoints='{
        "640": {
        "slidesPerView": 3,
        "spaceBetween": 20
        },
        "768": {
          "slidesPerView": 5,
          "spaceBetween": 40
        },
        "1024": {
          "slidesPerView": 6,
          "spaceBetween": 0
      }
     }'
      class="mySwiper"
  >
    <swiper-slide v-for=' premier in premiers.items
  ' :premier='premier' :key="premier.kinopoiskId" class="filmstrip">
  <div class="filmstrip__perforation top">
    <div></div>
    <div></div>
  </div>
  <img :src='premier.posterUrl' :alt='premier.nameRu' class='filmstrip__poster'>
  <div class="filmstrip__perforation down">
    <div></div>
    <div></div>
  </div>
  </swiper-slide>
  </swiper>
</template>

<script>
import { Swiper, SwiperSlide } from "swiper/vue/swiper-vue";
import "swiper/swiper-bundle.css";


import SwiperCore, { Autoplay, Navigation } from 'swiper';

// install Swiper modules
SwiperCore.use([Autoplay, Navigation]);

export default {
  components: {
    Swiper,
    SwiperSlide,
  },
  props: {
    premiers: {
      type: Object
    }
  },
  methods: {
    stop: function (e) {
      e.preventDefault();
    }
  },
  name: "FilmSwiper"
}
</script>

<style scoped>
.swiper {
  margin-top: 20px;
  padding: 10px;
  width: 100%;
  height: 100%;
  background: black;
}

.swiper-slide {
  display: -webkit-box;
  display: -ms-flexbox;
  display: -webkit-flex;
  display: flex;
  -webkit-box-pack: center;
  -ms-flex-pack: center;
  -webkit-justify-content: center;
  justify-content: center;
  -webkit-box-align: center;
  -ms-flex-align: center;
  -webkit-align-items: center;
  align-items: center;
}

.filmstrip {
  display: grid;
  grid-template-areas:
  'top-perforation'
  '     poster    '
  'down-perforation'
}

.top {
  grid-area: top-perforation;
  margin-bottom: 10px;
}

.down {
  grid-area: down-perforation;
  margin-top: 10px;
}

.filmstrip__poster {
  grid-area: poster;
  height: 255px;
  width: 180px;
}

.filmstrip__perforation {
  display: flex;
  justify-content: space-around;
}

.filmstrip__perforation div {
  width: 20px;
  height: 30px;
  background-color: #fff;
}
</style>