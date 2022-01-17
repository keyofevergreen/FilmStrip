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
<!--      <div class="row-numbers">-->
<!--        <div class='row-numbers__item'-->
<!--             v-for="row in setTypeHall"-->
<!--             :key="row">-->
<!--          {{ row.row }}-->
<!--        </div>-->
<!--      </div>-->
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
      session: state => state.selectedSession,
      halls: state => state.halls
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
  height: 20px;
  width: 100%;
  margin-bottom: 45px;
  color: #fff;
  text-align: center;
  background-color: var(--grey);
}

.container {
  width: 700px;
  margin: 40px auto 10px auto;
  display: flex;
  flex-direction: column;
  gap: 13px;
  align-items: center;
}

.row-number {
  height: 26px;
  font-size: 15px;
  color: var(--dark-grey);
  display: flex;
  align-items: center;
}

.seats {
  display: flex;
  flex-direction: column;
  gap: 1vw;
  margin: 0 auto;
}

.row {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 5px;
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