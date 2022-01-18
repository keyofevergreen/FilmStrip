<template>
  <div class="release-sort">
    <div @click="setSort('released')" class='btn btn-release' :class='isReleasedFilms === "released" ? "active" : "inactive"'>
      <span>Сегодня в кино</span>
    </div>
    <div @click="setSort('unreleased')" class='btn btn-release' :class='isReleasedFilms === "unreleased" ? "active" : "inactive"'>
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
  max-width: 444px;
  font-size: 20px;
  display: flex;
  gap: 20px;
  margin: 38px auto 25px;
  transition: transform 0.5s, color 0.3s;
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

  .btn-release {
    font-size: 18px;
  }
}
</style>