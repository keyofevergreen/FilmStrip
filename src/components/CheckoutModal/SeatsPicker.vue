<template>
  <div class="container">
    <div class="screen">Экран</div>
      <div class="seats">
        <div v-for="row in setTypeHall"
             :key="row"
             class="row"
             :class="this.session.hallType"
        >
          <div class='row-number'>
            {{ row.row }}
          </div>
          <seat v-for="seat in row.seats"
                :key="`${row.row}-${seat.seat}`"
                :row="row.row"
                :seatInRow="seat.seat"
                :isOccupied="seat.isOccupied"
                :peopleCapacity="seat.peopleCapacity"/>
          <div class='row-number'>
            {{ row.row }}
          </div>
      </div>
    </div>
  </div>
</template>

<script>
import Seat from './Seat';
import { mapState } from 'vuex';

export default {
  name: 'SeatsPicker',
  components: { Seat },
  computed: {
    ...mapState({
      session: state => state.selectedFilm.selectedSession,
      halls: state => state.cinemaSession.halls
    }),
    setTypeHall() {
      const currentHallTypeOfSession = this.session.hallType;
      return this.halls.find(hall => hall.hallType === currentHallTypeOfSession).layout;
    }
  },
};
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Poiret+One&display=swap');

.screen {
  width: 100%;
  height: 20px;
  margin-bottom: 45px;
  color: #fff;
  text-align: center;
  background-color: var(--grey);
}

.container {
  display: flex;
  flex-direction: column;
  gap: 13px;
  align-items: center;
  width: 700px;
  margin: 40px auto 10px;
}

.row-number {
  display: flex;
  align-items: center;
  height: 26px;
  color: var(--dark-grey);
  font-size: 15px;
}

.seats {
  display: flex;
  flex-direction: column;
  gap: 1vw;
  margin: 0 auto;
}

.row {
  display: flex;
  gap: 5px;
  align-items: center;
  justify-content: center;
}

.row-number:nth-of-type(1),
.standart .seat:nth-of-type(3) {
  margin-right: 12px;
}

.row-number:nth-last-of-type(1),
.standart .seat:nth-last-of-type(3) {
  margin-left: 12px;
}

.vip .seat:nth-of-type(3) {
  margin-right: 18px;
}

.vip {
  gap: 10px;
}

@media (max-width: 850px) {
  .container {
    width: 100%;
  }
}

@media (max-width: 760px) {
  .seats {
    gap: calc(1vw / 2);
  }

  .row {
    gap: 3px;
  }

  .row-number:nth-of-type(1),
  .standart .seat:nth-of-type(3) {
    margin-right: 1em;
  }

  .row-number:nth-last-of-type(1),
  .standart .seat:nth-last-of-type(3) {
    margin-left: 1em;
  }
}

</style>