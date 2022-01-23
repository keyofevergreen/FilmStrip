<template>
  <div class="film-item">
    <iframe v-if="trailerURL" class="film-item__frame" :src="trailerURL" title="YouTube video player" frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowfullscreen></iframe>
    <div v-else class='film-item__poster'>
      <img :src="film.posterUrlPreview" :alt="`Постер ${film.nameRu}`">
    </div>
    <div class="film-item__content">
      <h1 class="film-item__header">{{ film.nameRu }}</h1>
      <p class="film-item__country">{{ film.nameOriginal }} ({{ film.year }},
        {{ film.countries.map(country => country.country).join(', ') }})</p>
      <div class="film-item__tags">
        <my-tag :text="ageLimits" type="dotted"></my-tag>
        <my-tag
            v-if="film.ratingImdb"
            :text="film.ratingImdb"
            :popover="true"
            type="green">
          Рейтинг фильма по версии Imdb
        </my-tag>
      </div>
      <p class="film-item__genres">{{ film.genres.length > 1 ? 'Жанры: ' : 'Жанр: ' }}
        {{ film.genres.map(genre => genre.genre).join(', ') }}</p>
      <p v-if="film.filmLength" class="film-item__duration">Длительность: {{ setDuration(film.filmLength) }}</p>
      <p class="film-item__description">{{ film.description }}</p>
    </div>
  </div>
</template>

<script>
import MyTag from './UI/MyTag';
import { mapState } from 'vuex';

export default {
  name: 'FilmItem',
  components: {
    MyTag
  },
  props: {
    trailerURL: {
      type: String
    },
    film: {
      type: Object
    }
  },
  computed: {
    ...mapState({
      ageLimits: state => state.selectedFilm.ageLimits
    })
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
    }
  }
}
</script>

<style scoped>
.film-item {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(310px, 1fr));
  gap: 20px;
}

.film-item__frame {
  width: 100%;
  height: 300px;
  border-radius: 10px;
}

.film-item__poster {
  display: flex;
  justify-content: center;
}

.film-item__poster img {
  max-height: 480px;
  border-radius: 5px;
}

.film-item__content {
  font-size: 15px;
}

.film-item__header {
  font-size: 30px;
}
.film-item__country {
  margin-bottom: 15px;
  color: var(--grey);
}


.film-item__genres {
  margin-bottom: 5px;
}

.film-item__duration {
  margin-bottom: 15px;
}

.film-item__tags {
  display: flex;
  gap: 15px;
  margin-bottom: 5px;
}

@media (max-width: 440px) {
  .film-item__frame {
    height: 200px;
  }
}

@media (max-width: 739px) {
  .film-item {
    padding: 0 20px;
  }
}

@media (max-width: 310px) {
  .film-item {
    grid-template-columns: repeat(auto-fit, minmax(305px, 1fr));
  }
}
</style>