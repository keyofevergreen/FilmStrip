<template>
  <div class="container">
    <n-select
        v-model:value="selectedValues"
        filterable
        max-tag-count="responsive"
        :placeholder="'Сортировка по жанрам'"
        :options="options"
    />
  </div>
</template>

<script>
import { ref } from 'vue';
import { mapMutations } from 'vuex';

export default {
  name: 'SortByGenres',
  props: {
    options: {
      type: Array,
      default: () => []
    }
  },
  setup() {
    return {
      selectedValues: ref(null),
    }
  },
  methods: {
    ...mapMutations({
      setSort: 'setGenresSort'
    })
  },
  watch: {
    selectedValues(newValue) {
      this.setSort(newValue);
    }
  }
}
</script>

<style scoped>
.container {
  max-width: 512px;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(212px, 1fr));
  gap: 20px;

  margin: 0 auto;
}

.select-input {
  width: 100%;
  padding: 13px;
  border-radius: 10px;
  border: 2px solid #4FC08D;
}
</style>