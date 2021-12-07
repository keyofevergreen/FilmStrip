<template>
  <div v-if="!isFetching">
    <div class="film-list__item-card">
      <div class="item-card__premiere">
        {{ setPremiere(film.premiereRu) }}
      </div>
      <img :src="film.posterUrlPreview" :alt="film.nameRu" class="item-card__poster">
    </div>
    <div class="film-list__item-genres">
      <span v-for="genre in film.genres" :key="genre.genre">{{ genre.genre }}</span>
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
    setDuration(duration) {
      const lastSymbol = duration.toString().slice(-1);
      if (lastSymbol === '1') {
        return `${duration} минута`
      }
      if (lastSymbol > 1 && lastSymbol < 5) {
        return `${duration} минуты`
      }
      return `${duration} минут`
    },
    setPremiere(date) {
      const currentDate = moment();
      const filmPremiere = moment(date, 'YYYY-MM-DD');
      const diff = Number(currentDate.diff(filmPremiere, 'days', true));
      if (diff >= 0) {
        return filmPremiere.calendar({
          sameDay: '[Премьера]',
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
      // if (diff < 0) {
      //   if(diff > -1) {
      //     return 'Завтра';
      //   }
      //   else if(diff > -2) {
      //     return `Через ${Math.abs(diff.toFixed())} день`;
      //   }
      //   else {
      //     return `В кино с ${filmPremiere.format('DD.MM')}`;
      //   }
      // }
      // if(diff >= 0) {
      //   if(diff < 1) {
      //     return 'Премьера'
      //   }
      //   if(diff < 7) {
      //     return 'Новинка'
      //   }
      // } else {
      //   return ''
      // }
    }
    // setFetching(bool) {
    //   this.isFetching = bool
    // },
    // setFilm(film) {
    //   this.film = film;
    // },
    // async fetchFilm(id) {
    //   try {
    //     this.setFetching(true);
    //     const response = await fetch(`https://kinopoiskapiunofficial.tech//api/v2.2/films/${id}`, {
    //       method: 'GET',
    //       headers: {
    //         'X-API-KEY': 'bbd5c8d2-662f-428b-9b73-5fb961a663ad',
    //         'Content-Type': 'application/json',
    //       },
    //     });
    //     const film = await response.json();
    //     await this.setFilm(film)
    //   } catch (e) {
    //     console.error(e)
    //   } finally {
    //     this.setFetching(false);
    //   }
    // },
    //   setAgeRatingLimits(film) {
    //     if (film.ratingAgeLimits === null) {
    //       return '0+'
    //     } else {
    //       return `${film.ratingAgeLimits.match(/\d{1,2}/g)}+`
    //     }
    //   }
    // },
    // mounted() {
    //   this.fetchFilm(this.id)
    // },
    // watch: {
    //   film(newValue) {
    //     this.ageRatingLimits = this.setAgeRatingLimits(newValue);
    //   }
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
  color: var(--gray);
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

.item-fetching__rating {
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
</style>