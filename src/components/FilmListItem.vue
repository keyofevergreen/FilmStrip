<template>
  <div v-if="!isFetching">
    <div class="film-list__item-rating">
      {{ setDuration(film.duration) }}
    </div>
    <img :src="film.posterUrlPreview" :alt="film.nameRu" class="film-list__item-poster">
    <div class="film-list__item-genres">
      <span v-for="genre in film.genres" :key="genre.genre">{{ genre.genre }}</span>
    </div>
    <h4 class="film-list__item-name">{{ film.nameRu }}</h4>
  </div>
  <div v-else class="film-list__item-fetching">
    <div class="item-fetching__rating">Loading</div>
    <div class="item-fetching__poster"></div>
  </div>
</template>

<script>
export default {
  name: 'FilmListItem',
  props: {
    film: Object,
  },
  data() {
    return {}
  },
  methods: {
    setDuration(duration) {
      const lastSymbol = duration.toString().slice(-1);
      if(lastSymbol === '1') {
        return `${duration} минута`
      }
      if(lastSymbol > 1 && lastSymbol < 5) {
        return `${duration} минуты`
      }
      return `${duration} минут`
    },
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
  }
}
</script>

<style scoped>
.film-list__item-rating {
  height: 32px;
  font-size: 20px;
  color: #fff;
  background-color: var(--green);

  display: flex;
  justify-content: center;
  align-items: center;
}

.film-list__item-poster {
  display: inline-block;
  width: 100%;
  height: 300px;
  margin-bottom: 10px;
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