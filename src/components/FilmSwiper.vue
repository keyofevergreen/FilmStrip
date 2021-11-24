<template>
  <swiper
      :slidesPerView="2"
      :slidesPerGroup="1"
      :loop="true"
      :loopFillGroupWithBlank="true"
      :autoplay='{
        "delay": 5000,
        "disableOnInteraction": false
      }'
      :breakpoints='{
        "425": {
        "slidesPerView": 3,
        "spaceBetween": 20
        },
        "768": {
          "slidesPerView": 4,
          "spaceBetween": 0
        },
        "946": {
          "slidesPerView": 5,
          "spaceBetween": 0
        },
        "1026": {
          "slidesPerView": 6,
          "spaceBetween": 0
      }
     }'
      class="mySwiper"
  >
    <swiper-slide v-for=' premier in premiers.items
  ' :premier='premier' :key="premier.kinopoiskId" class="filmstrip-item">
      <div class="filmstrip-item__perforation top">
        <div></div>
        <div></div>
      </div>
      <div class='filmstrip-item__poster'>
        <img :src='premier.posterUrl' :alt='premier.nameRu'>
      </div>
      <div class="filmstrip-item__perforation down">
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
  background: #000;
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

.filmstrip-item {
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

.filmstrip-item__poster {
  display: flex;
  justify-content: center;
}

.filmstrip-item__poster img{
  grid-area: poster;
  height: 255px;
  width: 180px;
}

.filmstrip-item__perforation {
  display: flex;
  justify-content: space-around;
}

.filmstrip-item__perforation div {
  width: 20px;
  height: 30px;
  background-color: #fff;
}

@media (max-width: 1118px) {
  .filmstrip-item__poster img {
    height: 235px;
    width: 165px;
  }
}

@media (max-width: 1024px) {
  .filmstrip-item__poster img {
    height: 257px;
    width: 180px;
  }
}

@media (max-width: 768px) {
  .filmstrip-item__poster img {
    height: 286px;
    width: 200px;
  }
}

@media (max-width: 630px) {
  .filmstrip-item__poster img {
    height: 228px;
    width: 160px;
  }

  .filmstrip-item__perforation div {
    width: 17px;
    height: 26px;
  }
}

@media (max-width: 487px) {
  .filmstrip-item__poster img {
    height: 200px;
    width: 140px;
  }
}

@media (max-width: 425px) {
  .filmstrip-item__poster img {
    height: 242px;
    width: 170px;
  }
}
</style>