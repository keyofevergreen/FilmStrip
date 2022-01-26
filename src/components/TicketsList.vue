<template>
<div class="tickets-list">
  <tickets-list-item v-for="ticket in sortedByTimeTicketHistory" :key="ticket.id" :ticket="ticket" />
</div>
</template>

<script>
import TicketsListItem from './TicketsListItem';
import { mapState } from 'vuex';
import moment from 'moment';

export default {
  name: 'TicketsList',
  components: { TicketsListItem },
  computed: {
    ...mapState({
      ticketsHistory: state => state.auth.authAccount.ticketsHistory
    }),
    sortedByTimeTicketHistory() {
      return this.ticketsHistory.map(el => el).sort(function(a, b) {
        return moment(a.date, 'DD.MM.YYYY') - moment(b.date, 'DD.MM.YYYY') || moment(a.session.time, 'HH:mm') - moment(b.session.time, 'HH:mm');
      });
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