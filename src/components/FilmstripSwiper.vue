<template>
  <swiper
      :slidesPerView="3"
      :slidesPerGroup="1"
      :spaceBetween="0"
      :loop="true"
      :loopFillGroupWithBlank="true"
      :autoplay='{
        "delay": 4000,
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
  >
    <swiper-slide v-for='film in currentPremiers' :film='film' :key="film.kinopoiskId">
      <filmstrip-item :film="film"/>
    </swiper-slide>
  </swiper>
</template>

<script>
import { Swiper, SwiperSlide } from 'swiper/vue/swiper-vue';
import 'swiper/swiper-bundle.css';

import SwiperCore, { Autoplay, Navigation } from 'swiper';
import FilmstripItem from './FilmstripItem';
import { mapGetters } from 'vuex';

SwiperCore.use([Autoplay, Navigation]);

export default {
  name: 'FilmstripSwiper',
  components: {
    Swiper,
    SwiperSlide,
    FilmstripItem
  },
  computed: {
    ...mapGetters({
      currentPremiers: 'films/currentPremiers'
    }),
  }
}
</script>

<style scoped>
.swiper {
  padding: 10px;
  background: #000;
}

.swiper-slide {
  display: flex;
  -webkit-box-pack: center;
  -ms-flex-pack: center;
  align-items: center;
  justify-content: center;
  -webkit-box-align: center;
  -ms-flex-align: center;
}

@media (max-width: 420px) {
  .swiper {
    padding: 6px;
  }
}
</style>