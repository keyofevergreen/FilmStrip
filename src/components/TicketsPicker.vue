<template>
   <div class="container">
     <ul class="showcase">
       <li>
         <div class="seat"></div>
         <small>Свободно</small>
       </li>
       <li>
         <div class="seat selected"></div>
         <small>Выбрано</small>
       </li>
       <li>
         <div class="seat occupied"></div>
         <small>Занято</small>
       </li>
     </ul>
     <div class="screen">Экран</div>
     <div class="row" v-for="row in hall" :key="row">
       <seat class='seat' v-for="seat in row.seats" :key="`${row.row}-${seat.seat}`" :row="row.row" :seatInRow="seat.seat" :isOccupied="seat.isOccupied"></seat>
     </div>
   </div>
</template>

<script>
import Seat from './Seat';

export default {
  name: 'TicketsPicker',
  components: { Seat },
  props: {
    hall: {
      type: Object
    },
  },
}
</script>

<style scoped>
.showcase {
  display: flex;
  justify-content: center;
  gap: 20px;
  color: var(--grey);
  list-style-type: none;
}

.showcase li {
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 10px;
}

.showcase li small {
  margin-left: 4px;
}

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
  border: none;
  background-color: var(--green);
}

.seat.occupied {
  border: none;
  background-color: var(--light-grey);
}

.seat:not(.selected, .occupied).locked{
  opacity: 0.2;
}

.seat:not(.occupied):hover {
  cursor: pointer;
  transform: scale(1.2);
}

.showcase .seat:not(.occupied):hover,
.seat:not(.selected).locked:hover,
{
  cursor: default;
  transform: scale(1);
}
</style>