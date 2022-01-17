<template>
  <div
      @click="handleChange()"
      class='seat'
      :class="
      `${peopleCapacity}
       ${contains(tickets, id) ? 'selected' : ''}
       ${isLimit ? 'locked' : ''}
       ${isOccupied ? 'occupied' : ''}`"
  >
    {{ contains(tickets, id) ? seatInRow : null }}
  </div>
</template>

<script>
import { mapGetters, mapMutations, mapState } from 'vuex';

export default {
  name: 'Seat',
  props: {
    row: {
      type: Number,
      required: true
    },
    seatInRow: {
      type: Number,
      required: true
    },
    isOccupied: {
      type: Boolean,
      required: true
    },
    peopleCapacity: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      id: `${this.row}-${this.seatInRow}`
    };
  },
  computed: {
    ...mapState({
      tickets: state => state.selectedTickets
    }),
    ...mapGetters({
      isLimit: 'isLimitOfTickets'
    })
  },
  methods: {
    ...mapMutations({
      setTicket: 'setTicket',
      removeTicket: 'removeTicket'
    }),
    contains(tickets, id) {
      return tickets.find((ticket) => ticket.id === id);
    },
    handleChange() {
      const isContains = this.tickets.length ? this.contains(this.tickets, this.id) : false;
      if (this.isLimit) {
        if (isContains) {
          this.removeTicket(this.id);
        }
      } else {
        if (isContains) {
          this.removeTicket(this.id);
        } else {
          this.setTicket({ row: this.row, seat: this.seatInRow, id: this.id });
        }
      }
    }
  },
};
</script>

<style scoped>
.seat {
  height: 26px;
  font-size: 1em;
  border: 1px solid var(--green);
  border-top-left-radius: 12px;
  border-top-right-radius: 12px;
  transition: transform 0.4s;
}

.single {
  width: 35px;
}

.double {
  width: 70px;
}

.seat.selected {
  font-family: 'Poiret One', cursive;
  color: #fff;
  background-color: var(--green);
  border: none;
  display: flex;
  justify-content: center;
  align-items: center;
}

.seat.occupied {
  border: none;
  background-color: var(--light-grey);
}

.seat:not(.selected, .occupied).locked {
  opacity: 0.2;
}

.seat:not(.occupied):hover {
  cursor: pointer;
  transform: scale(1.2);
}

.seat:not(.selected).locked:hover {
  cursor: default;
  transform: scale(1);
}

@media (max-width: 850px) {
  .seat {
    height: 2.2em;
    font-size: 8px;
  }

  .single {
    width: 4vw;
    min-width: 15px;
  }

  .double {
    width: 10vw;
    min-width: 30px;
  }
}

@media (max-width: 430px) {
  .seat {
    height: 1.7em;
    border-top-left-radius: 8px;
    border-top-right-radius: 8px;
  }
}
</style>