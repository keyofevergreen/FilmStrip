<template>
  <div class="film-list-wrap">
    <film-release-sort/>
    <swiper
        v-if="isReleasedFilms"
        :slidesPerView="2"
        :slidesPerGroup="1"
        :spaceBetween="20"
        :loopFillGroupWithBlank="true"
        :breakpoints='{
        "411": {
        "slidesPerView": 3,
        },
        "768": {
          "slidesPerView": 4,
        },
        "1141": {
          "slidesPerView": 5,
      }
     }'
        class="mySwiper"
    >
      <swiper-slide class="film-list__item" v-for="film in latestReleased" :key="film.kinopoiskId">
        <film-list-item :id="film.kinopoiskId"/>
      </swiper-slide>
      <swiper-slide>
        <div class="film-list__dashed-card">{{ releasedFilms.length }}</div>
      </swiper-slide>
    </swiper>

    <swiper
        v-else
        :slidesPerView="2"
        :slidesPerGroup="1"
        :spaceBetween="20"
        :loopFillGroupWithBlank="true"
        :breakpoints='{
        "411": {
        "slidesPerView": 3,
        },
        "768": {
          "slidesPerView": 4,
        },
        "1024": {
          "slidesPerView": 5,
      }
     }'
        class="mySwiper"
    >
      <swiper-slide class="film-list__item" v-for="film in firstUnreleased" :key="film.kinopoiskId">
        <film-list-item :id="film.kinopoiskId"/>
      </swiper-slide>
      <swiper-slide>
        <div class="film-list__dashed-card">{{ releasedFilms.length }}</div>
      </swiper-slide>
    </swiper>
  </div>
</template>

<script>
import { Swiper, SwiperSlide } from 'swiper/vue/swiper-vue';
import 'swiper/swiper-bundle.css';
import { mapGetters, mapState } from 'vuex';

import SwiperCore, { Navigation } from 'swiper';
import FilmReleaseSort from './FilmReleaseSort';
import FilmListItem from './FilmListItem';

SwiperCore.use([Navigation]);

export default {
  name: 'FilmListSwiper',
  components: {
    Swiper,
    SwiperSlide,
    FilmReleaseSort,
    FilmListItem
  },
  data() {
    return {
      latestReleased: [],
      firstUnreleased: [],
    }
  },
  computed: {
    ...mapState({
      isReleasedFilms: state => state.isReleasedFilms
    }),
    ...mapGetters({
      releasedFilms: 'getReleasedFilms',
      unreleasedFilms: 'getUnreleasedFilms'
    })
  },
  watch: {
    releasedFilms(newValue) {
      this.latestReleased = newValue.slice(-4);
    },
    unreleasedFilms(newValue) {
      this.firstUnreleased = newValue.slice(0, 4);
    }
  }
}
</script>

<style scoped>
.swiper-slide {
  min-width: 212px;
}

.film-list-wrap {
  height: 645px;
  overflow: hidden;
}

.film-list__dashed-card {
  width: 212px;
  height: 332px;
  border: 4px dashed #333333;
}

@media (max-width: 1140px) {
  .swiper {
    padding-right: 60px;
  }
}
</style>