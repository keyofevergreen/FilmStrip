<template>
<div class="tickets-list">
  <tickets-list-item v-for="ticket in reversedTicketHistory" :key="ticket.id" :ticket="ticket" />
</div>
</template>

<script>
import TicketsListItem from './TicketsListItem';
import { mapState } from 'vuex';

export default {
  name: 'TicketsList',
  components: { TicketsListItem },
  computed: {
    ...mapState({
      ticketsHistory: state => state.auth.authAccount.ticketsHistory
    }),
    reversedTicketHistory() {
      return this.ticketsHistory.map(el => el).reverse();
    }
  }
};
</script>

<style scoped>
.tickets-list {
  display: flex;
  flex-direction: column;
  gap: 25px;
  max-width: 600px;
  margin: 0 auto;
  padding: 20px 10px;
}
</style>