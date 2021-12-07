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
  name: 'SortByReleaseButtons',
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
  color: var(--pretty-black);
  display: flex;
  justify-content: center;
}

.active {
  border-bottom: 4px solid var(--green);
  transition: transform 0.5s;
}

.inactive {
  transition: transform 0.5s, color 0.3s;
}

.active:hover {
  transform: scale(1.1);
}

.inactive:hover {
  transform: scale(1.1);
  color: var(--green);
}

@media (max-width: 768px) {
  .release-sort {
    margin: 48px auto 35px;
  }
}

@media (max-width: 487px) {
  .release-sort {
    padding: 0 20px;
  }
}
</style>