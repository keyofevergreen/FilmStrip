<template>
  <div @click="linkToFilmPage">
    <div v-if="!isFetching">
      <div class="film-list__item-card">
        <div class="item-card__premiere">
          {{ setRelease(film.premiereRu) }}
        </div>
        <img :src="film.posterUrlPreview" :alt="film.nameRu" class="item-card__poster">
      </div>
      <div class="film-list__item-genres">
        {{film.genres.map(genre => genre.genre).join(', ')}}
      </div>
      <h4 class="film-list__item-name">{{ film.nameRu }}</h4>
    </div>
    <div v-else class="film-list__item-fetching">
      <div class="item-fetching__premiere">Loading</div>
      <div class="item-fetching__poster"></div>
    </div>
  </div>
</template>

<script>
import moment from 'moment';
import { mapState } from 'vuex';

export default {
  name: 'FilmListItem',
  props: {
    film: Object,
  },
  methods: {
    setRelease(date) {
      const currentDate = moment();
      const filmPremiere = moment(date, 'YYYY-MM-DD');
      const diff = Number(currentDate.diff(filmPremiere, 'days', true));
      if (diff >= 0) {
        return filmPremiere.calendar({
          sameDay: '[Премьера]',
          lastDay: '[Новинка]',
          lastWeek: '[Новинка]',
          sameElse: ' '
        });
      } else {
        return filmPremiere.calendar({
          nextDay: '[Завтра]',
          nextWeek: '[В кино с] DD.MM',
          sameElse: '[В кино с] DD.MM'
        });
      }
    },
    linkToFilmPage() {
      this.$router.push(`/films/${this.film.kinopoiskId}`)
      moment(this.film.premiereRu, 'YYYY-MM-DD')
    }
  },
  computed: {
    ...mapState({
      isFetching: state => state.films.isFetchingFilms
    })
  }
}
</script>

<style scoped>
.film-list__item-card {
  margin-bottom: 10px;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  cursor: pointer;
}

.item-card__premiere {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 32px;
  color: #fff;
  font-size: 20px;
  background-color: var(--green);
}

.item-card__poster {
  display: inline-block;
  width: 100%;
  height: 300px;
}

.film-list__item-genres {
  display: flex;
  flex-wrap: wrap;
  gap: 5px;
  margin-bottom: 10px;
  color: var(--grey);
  font-weight: 500;
  font-size: 12px;
}

.film-list__item-name {
  color: var(--pretty-black);
  font-weight: 500;
  font-size: 18px;
}

.film-list__item-fetching {
  height: 332px;
  border: 4px dashed var(--pretty-black);
}

.item-fetching__premiere {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 32px;
  font-size: 20px;
  border-bottom: 4px dashed var(--pretty-black);
}

.item-fetching__poster {
  width: 100%;
  height: 100%;
  background-image: url(../assets/chaplin.svg);
  background-repeat: no-repeat;
  background-position: center center;
  background-size: 100% 100%;
}

.film-list__item-card:hover .item-card__premiere {
  background-color: var(--light-green);
  transition: background-color .5s;
}

</style>