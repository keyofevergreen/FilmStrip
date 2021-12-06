<template>
  <div class="filmstrip-item">
    <div class="filmstrip-item__perforation top">
      <div></div>
      <div></div>
    </div>
    <div class='filmstrip-item__poster'>
      <img :src='film.posterUrlPreview' :alt='film.nameRu'>
    </div>
    <div class="filmstrip-item__perforation down">
      <div></div>
      <div></div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'FilmstripItem',
  props: {
    film: Object
  }
}
</script>

<style scoped>
.filmstrip-item {
  display: grid;
  grid-template-areas:
  'top-perforation'
  '     poster    '
  'down-perforation'
}

.top {
  grid-area: top-perforation;
  margin-bottom: 10px;
}

.down {
  grid-area: down-perforation;
  margin-top: 10px;
}

.filmstrip-item__poster {
  display: flex;
  justify-content: center;
}

.filmstrip-item__poster img {
  grid-area: poster;
  width: 100%;
  height: 265px;
}

.filmstrip-item__perforation {
  display: flex;
  justify-content: space-around;
}

.filmstrip-item__perforation div {
  width: 12%;
  height: 30px;
  background-color: #fff;
}

@media (max-width: 811px) {
  .filmstrip-item__poster img {
    height: 225px;
  }

  .filmstrip-item__perforation div {
    height: 25px;
  }
}

@media (max-width: 648px) {
  .filmstrip-item__poster img {
    height: 195px;
  }
}

@media (max-width: 548px) {
  .filmstrip-item__poster img {
    height: 160px;
  }

  .filmstrip-item__perforation div {
    height: 20px;
  }
}

@media (max-width: 420px) {
  .top {
    margin-bottom: 6px;
  }

  .down {
    margin-top: 6px;
  }

  .filmstrip-item__poster img {
    height: 150px;
  }
}
</style>