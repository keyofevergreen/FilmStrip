<template>
  <div v-if="trailerURL" class="film-item">
    <iframe class="film-item__frame" :src="trailerURL" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
    <div class="film-item__text">
      <h1>{{film.nameRu}}</h1>
      <p>{{film.nameOriginal}} ({{film.year}}, {{film.countries.map(country => country.country).join(', ')}})</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'FilmItem',
  props: {
    trailerURL: {
      type: String
    },
    film: {
      type: Object
    }
  }
}
</script>

<style scoped>
.film-item {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 20px;
}

.film-item__frame {
  width: 100%;
  height: 300px;
}

.film-item__text {
  font-size: 15px;
}

.film-item__text h1 {
  font-size: 30px;
}

@media(max-width: 440px) {
  .film-item__frame {
    height: 200px;
  }
}
</style>