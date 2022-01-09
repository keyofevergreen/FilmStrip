<template>
  <div v-if="!isFetching">
    <div class="film-list__item-card" @click="$router.push(`/films/${film.kinopoiskId}`)">
      <div class="item-card__premiere">
        {{ setPremiere(film.premiereRu) }}
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
    setPremiere(date) {
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
    }
  },
  computed: {
    ...mapState({
      isFetching: state => state.isFetchingFilms
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
  height: 32px;
  font-size: 20px;
  color: #fff;
  background-color: var(--green);

  display: flex;
  justify-content: center;
  align-items: center;
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
  font-size: 12px;
  font-weight: 500;
  color: var(--grey);
  margin-bottom: 10px;
}

.film-list__item-name {
  font-size: 18px;
  font-weight: 500;
  color: var(--pretty-black);
}

.film-list__item-fetching {
  height: 332px;
  border: 4px dashed var(--pretty-black);
}

.item-fetching__premiere {
  height: 32px;
  font-size: 20px;
  border-bottom: 4px dashed var(--pretty-black);

  display: flex;
  justify-content: center;
  align-items: center;
}

.item-fetching__poster {
  width: 100%;
  height: 100%;
  background-image: url(../assets/chaplin.svg);
  background-position: center center;
  background-repeat: no-repeat;
  -webkit-background-size: 100% 100%;
  -moz-background-size: 100% 100%;
  -o-background-size: 100% 100%;
  background-size: 100% 100%;
}
.film-list__item-card:hover .item-card__premiere {
  transition: background-color .5s;
  background-color: var(--light-green);
}

</style>