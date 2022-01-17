<template>
<div>

</div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'TicketsHistoryPage',
  computed: {
    ...mapState({
      isAuth: state => state.isAuth
    })
  },
  watch: {
    isAuth(newValue) {
      if (newValue === false) {
        this.$router.push('/')
      }
    }
  }
};
</script>

<style scoped>

</style>