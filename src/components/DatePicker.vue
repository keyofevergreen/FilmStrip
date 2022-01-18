<template>
  <a-date-picker
      :locale="locale"
      :inputReadOnly="true"
      size="large"
      format="DD-MM-YYYY"
      :disabled-date="disabledDate"
  />
</template>

<script>
import moment from 'moment';
import locale from 'ant-design-vue/es/date-picker/locale/ru_RU';

export default {
  name: 'DatePicker',
  data() {
    return {
      locale
    }
  },
  methods: {
    disabledDate(current) {
      // Can not select days before today and today
      return current < moment().subtract(1, 'd') || current > moment().add(7, 'd');
    },
  }
};
</script>

<style scoped>

</style>