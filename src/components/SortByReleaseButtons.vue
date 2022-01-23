<template>
  <div class="release-sort">
    <div @click="setSort('released')" class='btn btn-sort-release' :class='isReleasedFilms === "released" ? "active" : "inactive"'>
      <span>Сегодня в кино</span>
    </div>
    <div @click="setSort('unreleased')" class='btn btn-sort-release' :class='isReleasedFilms === "unreleased" ? "active" : "inactive"'>
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
      setSort: 'setReleaseSort'
    })
  },

  computed: {
    ...mapState({
      isReleasedFilms: state => state.selectedReleaseSort
    }),
  }
}
</script>

<style scoped>
.release-sort {
  display: flex;
  gap: 20px;
  max-width: 444px;
  margin: 38px auto 25px;
  font-size: 20px;
  transition: transform 0.5s, color 0.3s;
}

.btn-sort-release {
  display: flex;
  justify-content: center;
  width: 100%;
  height: 40px;
  color: var(--pretty-black);
  border-radius: 0;
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
  color: var(--green);
  transform: scale(1.1);
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

  .btn-release {
    font-size: 18px;
  }
}
</style>