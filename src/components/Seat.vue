<template>
  <div :class="`${contains(tickets, id) ? 'selected' : ''} ${isLimit ? 'locked' : ''} ${isOccupied ? 'occupied' : ''}`" @click="handlerChange()">{{contains(tickets, id) ? seatInRow : null}}</div>
</template>

<script>
import { mapGetters, mapMutations, mapState } from 'vuex';

export default {
  name: 'Seat',
  props: {
    row: {
      type: Number
    },
    seatInRow: {
      type: Number
    },
    isOccupied: {
      type: Boolean
    }
  },
  data() {
    return {
      id: `${this.row}-${this.seatInRow}`
    }
  },
  methods: {
    ...mapMutations({
      setTicket: 'setTicket',
      removeTicket: 'removeTicket'
    }),
    contains(tickets, id) {
      return tickets.find((ticket) => ticket.id === id);
    },
    handlerChange() {
      const isContains = this.tickets.length ? this.contains(this.tickets, this.id) : false;
      if (this.isLimit) {
        if (isContains) {
          this.removeTicket(this.id);
        }
      } else {
        if (isContains) {
          this.removeTicket(this.id);
        } else {
          this.setTicket({row: this.row, seat: this.seatInRow, id: this.id});
        }
      }
    }
  },
  computed: {
    ...mapState({
      tickets: state => state.selectedTickets
    }),
    ...mapGetters({
      isLimit: 'isLimitOfTickets'
    })
  },
}
</script>

<style scoped>

</style>