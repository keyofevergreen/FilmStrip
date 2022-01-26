<template>
<div>
  <h2 class="page-header">История билетов</h2>
  <tickets-list></tickets-list>
</div>
</template>

<script>
import { mapState } from 'vuex';
import TicketsList from '../TicketsList';

export default {
  name: 'TicketsHistoryPage',
  components: { TicketsList },
  computed: {
    ...mapState({
      authAccount: state => state.auth.authAccount
    })
  },
  watch: {
    authAccount(newValue) {
      if(newValue === null) {
        this.$router.push('/')
      }
    }
  }
};
</script>

<style scoped>

</style>