<template>
  <div class="film-list__item">
    <div class="film-list__item-card">
      <div class="item-card__rating">
        {{ ageLimits }}
      </div>
        <img :src="film.posterUrlPreview" :alt="film.nameRu" class="item-card__poster">
    </div>
    <div class="film-list__item-genres">
      <span v-for="genre in film.genres" :key="genre.genre">{{ genre.genre }}</span>
    </div>
    <h4 class="film-list__item-name">{{ film.nameRu }}</h4>
  </div>
</template>

<script>
export default {
  name: 'FilmListItem',
  props: {
    id: Number,
  },
  data() {
    return {
      film: {},
      ageLimits: ''
    }
  },
  methods: {
    setFilm(film) {
      this.film = film;
    },
    fetchFilm(id) {
      fetch(`https://kinopoiskapiunofficial.tech//api/v2.2/films/${id}`, {
        method: 'GET',
        headers: {
          'X-API-KEY': 'bbd5c8d2-662f-428b-9b73-5fb961a663ad',
          'Content-Type': 'application/json',
        },
      })
          .then(res => res.json())
          .then(film => {
            this.setFilm(film)
          })
          .catch(err => console.log(err));
    },
    setAgeRatingLimits(film) {
      if(!film.ratingAgeLimits) {
        return '0+'
      } else {
        return `${film.ratingAgeLimits.match(/\d[1-9]/g)}+`
      }
    }
  },
  mounted() {
    this.fetchFilm(this.id)
  },
  watch: {
    film(newValue) {
      this.ageLimits = this.setAgeRatingLimits(newValue);
    }
  }
}
</script>

<style scoped>
.film-list__item-card {
  width: 212px;
  margin-bottom: 10px;
}

.item-card__rating {
  height: 32px;
  font-size: 20px;
  color: #fff;
  background-color: #4FC08D;

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
  color: #999DA5;
}

.film-list__item-name {
  font-size: 18px;
  font-weight: 500;
  color: #333333;
}
</style>