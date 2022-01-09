<template>
  <div class="container">
    <div class="screen">Экран</div>
    <div class="seats-wrap">
      <div class="row-numbers">
        <div class='row-numbers__item' v-for="row in hall" :key="row">{{ row.row }}</div>
      </div>
      <div class="seats">
        <div class="row" v-for="row in hall" :key="row">
          <seat class='seat' v-for="seat in row.seats" :key="`${row.row}-${seat.seat}`" :row="row.row"
                :seatInRow="seat.seat" :isOccupied="seat.isOccupied"></seat>
        </div>
      </div>
      <div class="row-numbers">
        <div class='row-numbers__item' v-for="row in hall" :key="row">{{ row.row }}</div>
      </div>
    </div>
  </div>
</template>

<script>
import Seat from './Seat';

export default {
  name: 'SeatsPicker',
  components: { Seat },
  props: {
    hall: {
      type: Object
    },
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
  gap: 5px;
}

.seat {
  width: 35px;
  height: 26px;
  border: 1px solid var(--green);
  border-top-left-radius: 13px;
  border-top-right-radius: 13px;
  transition: transform 0.4s;
}

.seat:nth-of-type(2) {
  margin-right: 12px;
}

.seat:nth-last-of-type(2) {
  margin-left: 12px;
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
</style>