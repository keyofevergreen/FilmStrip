<template>
  <swiper
      :slidesPerView="3"
      :slidesPerGroup="1"
      :spaceBetween="0"
      :loop="true"
      :loopFillGroupWithBlank="true"
      :autoplay='{
        "delay": 5000,
        "disableOnInteraction": false
      }'
      :breakpoints='{
        "411": {
        "slidesPerView": 4,
        },
        "768": {
          "slidesPerView": 5,
        },
        "1026": {
          "slidesPerView": 6,
      }
     }'
      class="mySwiper"
  >
    <swiper-slide v-for='film in currentPremiers' :film='film' :key="film.kinopoiskId" class="filmstrip-item">
      <div class="filmstrip-item__perforation top">
        <div></div>
        <div></div>
      </div>
      <div class='filmstrip-item__poster'>
        <img :src='film.posterUrlPreview' :alt='film.nameRu'>
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
import { mapGetters } from 'vuex'

import SwiperCore, { Autoplay, Navigation } from 'swiper';

SwiperCore.use([Autoplay, Navigation]);

export default {
  components: {
    Swiper,
    SwiperSlide,
  },
  methods: {},
  computed: {
    ...mapGetters({
      currentPremiers: 'getCurrentPremiers'
    }),
  },
  name: "FilmstripSwiper"
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

.filmstrip-item__poster img {
  grid-area: poster;
  width: 100%;
  height: 265px;
}

.filmstrip-item__perforation {
  display: flex;
  justify-content: space-around;
}

.filmstrip-item__perforation div {
  width: 12%;
  height: 30px;
  background-color: #fff;
}

@media (max-width: 811px) {
  .filmstrip-item__poster img {
    height: 225px;
  }

  .filmstrip-item__perforation div {
    height: 25px;
  }
}

@media (max-width: 648px) {
  .filmstrip-item__poster img {
    height: 195px;
  }
}

@media (max-width: 548px) {
  .filmstrip-item__poster img {
    height: 160px;
  }

  .filmstrip-item__perforation div {
    height: 20px;
  }
}

@media (max-width: 420px) {
  .swiper {
    padding: 6px;
  }

  .top {
    margin-bottom: 6px;
  }

  .down {
    margin-top: 6px;
  }

  .filmstrip-item__poster img {
    height: 150px;
  }
}
</style>