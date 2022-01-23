<template>
  <div class="container">
    <a-select :default-value="null" v-model:value="selectedValues">
      <a-select-option
          v-for="option in options"
          :key="option.value"
          :value="option.value"
      >
        {{ option.label }}
      </a-select-option>
    </a-select>
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
      default: () => [],
    },
  },
  setup() {
    return {
      selectedValues: ref(null),
    };
  },
  methods: {
    ...mapMutations({
      setSort: 'setGenresSort',
    }),
  },
  watch: {
    selectedValues(newValue) {
      this.setSort(newValue);
    },
  },
};
</script>

<style scoped>
.container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(212px, 1fr));
  gap: 20px;
  max-width: 512px;
  margin: 0 auto;
  padding: 0 20px;
}

.select-input {
  width: 100%;
  padding: 13px;
  border: 2px solid #4FC08D;
  border-radius: 10px;
}
</style>
