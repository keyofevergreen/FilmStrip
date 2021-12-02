<template>
  <div class="release-sort">
    <div @click="setSort(true)" class='btn' :class='{ active: isReleasedFilms, inactive: !isReleasedFilms }'>
      <span>Сегодня в кино</span>
    </div>
    <div @click="setSort(false)" class='btn' :class='{ active: !isReleasedFilms, inactive: isReleasedFilms }'>
      <span>Скоро в кино</span>
    </div>
  </div>
</template>

<script>
import { mapMutations, mapState } from 'vuex';

export default {
  name: "FilmReleaseSort",
  methods: {
    ...mapMutations({
      setSort: 'setSortFilms'
    })
  },
  computed: {
    ...mapState({
      isReleasedFilms: state => state.isReleasedFilms
    }),
  }
}
</script>

<style scoped>
.release-sort {
  max-width: 444px;
  display: flex;
  gap: 20px;
  margin: 38px auto 25px;
}

.release-sort div {
  width: 100%;
  height: 40px;
  color: #333333;
  display: flex;
  justify-content: center;
}

.active {
  border-bottom: 4px solid #4FC08D;
  transition: transform 0.5s;
}

.active:hover {
  transform: scale(1.1);
}

.inactive {
  transition: transform 0.5s, color 0.3s;
}

.inactive:hover {
  transform: scale(1.1);
  color: #4FC08D;
}
</style>