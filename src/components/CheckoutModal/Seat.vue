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
      tickets: state => state.selectedFilm.selectedTickets
    }),
    ...mapGetters({
      isLimit: 'selectedFilm/isLimitOfTickets'
    })
  },
  methods: {
    ...mapMutations({
      setTicket: 'selectedFilm/setTicket',
      removeTicket: 'selectedFilm/removeTicket'
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
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  font-family: 'Poiret One', cursive;
  background-color: var(--green);
  border: none;
}

.seat.occupied {
  background-color: var(--light-grey);
  border: none;
}

.seat:not(.selected, .occupied).locked {
  opacity: 0.2;
}

.seat:not(.occupied):hover {
  transform: scale(1.2);
  cursor: pointer;
}

.seat:not(.selected).locked:hover {
  transform: scale(1);
  cursor: default;
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