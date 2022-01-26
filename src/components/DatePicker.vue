<template>
  <a-date-picker
      v-model:value="value"
      @change="onChange"
      :locale="locale"
      :disabled-date="disabledDate"
      format="DD.MM.YYYY"
      placeholder="Сегодня"
      :inputReadOnly="true"
      size="large"
  >
    <span>{{ time ? time : 'SelectTime' }}</span>
  </a-date-picker>
</template>

<script>
import { mapMutations, mapState } from 'vuex';
import locale from 'ant-design-vue/es/date-picker/locale/ru_RU.js';
import moment from 'moment';

export default {
  name: 'DatePicker',
  data() {
    return {
      locale,
      value: null
    }
  },
  computed: {
    ...mapState({
      dateOfDatePicker: state => state.selectedFilm.dateOfDatePicker
    })
  },
  methods: {
    ...mapMutations({
      setDate: 'selectedFilm/setSelectedDate',
    }),
    disabledDate(current) {
      // Can not select days before today and today
      return current < moment().subtract(1, 'd') || current > moment().add(7, 'd');
    },
    onChange(date) {
      this.setDate(date.format('DD.MM.YYYY'));
    }
  }
};
</script>