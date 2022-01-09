<template>
  <swiper
      :slidesPerView="1"
      :slidesPerGroup="1"
      :spaceBetween="10"
      :centeredSlides="true"
      :breakpoints='{
        "420": {
          "slidesPerView": 2,
          "spaceBetween": 20,
          "centeredSlides": false
        },
        "768": {
          "slidesPerView": 3,
          "spaceBetween": 30,
          "centeredSlides": false
        },
        "910": {
          "slidesPerView": 4,
          "spaceBetween": 20,
          "centeredSlides": false
        },
        "1141": {
          "slidesPerView": 5,
          "centeredSlides": false
      }
     }'
  >
    <swiper-slide v-for="film in filmList.slice(0, 4)" :key="film.kinopoiskId">
      <film-list-item :film="film" class="film-list__item"/>
    </swiper-slide>
    <swiper-slide class="film-list__item film-list__dashed-card">
      <router-link to="/films">
        <div class="dashed-card__content">
          <svg xmlns="http://www.w3.org/2000/svg">
            <use :href='svgHref'></use>
          </svg>
          <p>Все фильмы <br>({{ filmList.length }})</p>
        </div>
      </router-link>
    </swiper-slide>
  </swiper>
</template>

<script>
import { Swiper, SwiperSlide } from 'swiper/vue/swiper-vue';
import 'swiper/swiper-bundle.css';
import SwiperCore, { Navigation } from 'swiper';
import FilmListItem from '../FilmListItem';
import ticket from '../../assets/ticket.svg';

SwiperCore.use([Navigation]);

export default {
  name: 'FilmListSwiper',
  components: {
    Swiper,
    SwiperSlide,
    FilmListItem
  },
  props: {
    filmList: Array
  },
  data() {
    return {
      svgHref: `${ticket}#ticket`
    };
  }
};
</script>

<style scoped>
.swiper-slide {
  width: 212px;
}

.film-list__dashed-card {
  height: 339px;
  border: 4px dashed var(--pretty-black);
  transition: fill 0.3s, border-color 0.3s;
}

.film-list__dashed-card a {
  text-decoration: none;
  color: var(--pretty-black);
}

.dashed-card__content {
  width: 100%;
  height: 100%;
  font-size: 18px;
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 10px;
}

.dashed-card__content svg {
  width: 100%;
}

.film-list__dashed-card:hover {
  fill: var(--green);
  border-color: var(--green);
}

.film-list__dashed-card:hover a {
  color: var(--green);
  transition: color 0.3s;
}

@media (max-width: 768px) {
  .swiper {
    padding: 0 30px;
  }
}

@media (max-width: 487px) {
  .swiper {
    padding: 0 30px;
  }
}

@media (max-width: 411px) {
  .swiper {
    padding: 0 50px;
  }
}
</style>