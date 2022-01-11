<template>
  <div class="container">
    <div class="screen">Экран</div>
    <div class="seats-wrap">
      <div class="row-numbers">
        <div class='row-numbers__item'
             v-for="row in setTypeHall"
             :key="row">
          {{ row.row }}
        </div>
      </div>
      <div class="seats">
        <div v-for="row in setTypeHall"
             :key="row"
             class="row"
             :class="this.session.hallType"
        >
          <seat v-for="seat in row.seats"
                :key="`${row.row}-${seat.seat}`"
                :row="row.row"
                :seatInRow="seat.seat"
                :isOccupied="seat.isOccupied"
                :peopleCapacity="seat.peopleCapacity"/>
        </div>
      </div>
      <div class="row-numbers">
        <div class='row-numbers__item'
             v-for="row in setTypeHall"
             :key="row">
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
      session: state => state.selectedSession,
      halls: state => state.halls
    }),
    setTypeHall() {
      const currentHallTypeOfSession = this.session.hallType;
      console.log(currentHallTypeOfSession, this.halls.find(hall => hall.hallType === currentHallTypeOfSession).layout)
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

.seats-wrap {
  width: 100%;
  display: flex;
  justify-content: space-between;
}

.row-numbers {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.row-numbers__item {
  height: 26px;
  font-size: 15px;
  color: var(--dark-grey);
  display: flex;
  align-items: center;
}

.seats {
  display: flex;
  flex-direction: column;
  gap: 13px;
}

.row {
  display: flex;
  justify-content: center;
  gap: 5px;
}

.standart .seat:nth-of-type(2) {
  margin-right: 12px;
}

.standart .seat:nth-last-of-type(2) {
  margin-left: 12px;
}

.vip .seat:nth-of-type(2) {
  margin-right: 18px;
}

.vip {
  gap: 10px;
}
</style>