<template>
  <div class="film-header">
    <h1>{{ film.nameRu }}</h1>
    <div class="film-header__tags-container">
      <my-tag :text="ageLimits" type="dotted"/>
      <my-tag :text="session.format"
              type="green"
              :is-animated="session.format === '3D'" :popover="session.format === '3D'">
        3D-очки выдаются перед входом в зал 🕶
      </my-tag>
    </div>
    <p class="film-header__cinema">{{ session.cinema.name }}, Зал {{ session.hall }}</p>
  </div>
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
  <div class="overflow-wrapper">
    <seats-picker/>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import MyTag from './UI/MyTag';
import SeatsPicker from './SeatsPicker';

export default {
  name: 'SeatsPickingStep',
  components: { SeatsPicker, MyTag },
  computed: {
    ...mapState({
      film: state => state.selectedFilm,
      ageLimits: state => state.ageLimitsOfSelectedFilm,
      session: state => state.selectedSession
    })
  }
};
</script>

<style scoped>
.overflow-wrapper {
  overflow: auto;
}

.overflow-wrapper::-webkit-scrollbar {
  width: 2.5px;
  height: 2.5px;
  border-radius: 5px;
}

.overflow-wrapper::-webkit-scrollbar-thumb {
  background: var(--green);
}

.film-header__tags-container {
  display: flex;
  align-items: center;
  gap: 15px;
}

.film-header__cinema {
  font-size: 16px;
  color: var(--grey);
  margin-top: 10px;
}

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

.seat {
  width: 35px;
  height: 26px;
  border: 1px solid var(--green);
  border-top-left-radius: 13px;
  border-top-right-radius: 13px;
  transition: transform 0.4s;
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

.showcase .seat:not(.occupied):hover,
.seat:not(.selected).locked:hover {
  cursor: default;
  transform: scale(1);
}

@media (max-width: 850px) {
  .overflow-wrapper {
    overflow: visible;
    position: relative;
  }

  .overflow-wrapper::before {
    position: absolute;
    content: '';
    display: inline-block;
    border-left: 1px dashed var(--grey);
    text-align: center;
    top:20px;
    left: 50%;
    height: 100%;
  }
}

@media (max-width: 760px) {
  .overflow-wrapper {
    max-height: 350px;
    padding-bottom: 40px;
  }
}

@media (max-width: 460px) {
  .showcase {
    margin-bottom: 0;
  }

  .showcase li {
    flex-direction: column;
    width: 56px;
  }

  .showcase li small {
    margin: 0;
  }
}
</style>