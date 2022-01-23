<template>
  <div class="seats-info-wrap" v-if="type === 'crop'">
    <a-popover v-model="visible" trigger="click">
      <template #content>
        <div v-for="ticket in tickets" :key="`${ticket.row}-${ticket.seat}`" class="seats-info">
          <span>Ряд {{ ticket.row }}, Место {{ ticket.seat }} ― {{ session.price }}₽</span>
          <svg class="delete-button" @click='removeTicket(ticket.id)'
               xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="0 0 500 500"
               xml:space="preserve">
            <g>
	            <path d="M394,75.8L249.6,220.2L105.2,75.8c-8.2-8.2-21.6-8.2-29.8,0s-8.2,21.6,0,29.8L219.8,250L75.4,394.4
		          c-8.2,8.2-8.2,21.6,0,29.8c8.2,8.2,21.6,8.2,29.8,0l144.4-144.4L394,424.2c8.2,8.2,21.6,8.2,29.8,0c8.2-8.2,8.2-21.6,0-29.8
		          L279.4,250l144.4-144.4c8.2-8.2,8.2-21.6,0-29.8C415.6,67.6,402.3,67.6,394,75.8z"/>
            </g>
          </svg>
        </div>
      </template>
      <a type="primary">
        {{getCountInfoAboutTickets}}
      </a>
    </a-popover>
    <span>за {{ session.price * tickets.length }}₽</span>
  </div>

  <div v-else-if="type === 'full'" class="seats-info-wrap-full">
    <h1 class="film-name">{{film.nameRu}}</h1>
    <div class="tags-container">
      <my-tag :text="ageLimits" type="dotted"/>
      <my-tag :text="session.format"
              type="green"
              :is-animated="session.format === '3D'"
              :popover="session.format === '3D'">
        {{session.format === '3D' ? '3D-очки выдаются перед входом в зал 🕶' : null}}
      </my-tag>
    </div>
    <div class='cinema-address'>
      <p>{{ session.cinema.name }}, Зал {{ session.hall }}</p>
      <p>{{session.cinema.address}}</p>
    </div>
    <p class="session-time">Сегодня в {{session.time}}</p>
    <div class="order-info">
      <h3>{{getCountInfoAboutTickets}}</h3>
      <div class="order-info__ticket-item-wrap">
        <div class="order-info__ticket-item" v-for="ticket in tickets" :key="ticket.id">
          <div class="ticket-item__seat-info">Ряд {{ticket.row}}, Место {{ticket.seat}}</div>
          <div class="ticket-item__dotted-line"></div>
          <div class="ticket-item__seat-price">{{session.price}}₽</div>
        </div>
      </div>
      <div class="order-info__total-price">Итого: {{tickets.length * session.price}}₽</div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapMutations, mapState } from 'vuex';
import MyTag from '../UI/MyTag';

export default {
  name: 'ChosenSeatsInfo',
  components: { MyTag },
  props: {
    type: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      visible: false,
    }
  },
  computed: {
    ...mapState({
      tickets: state => state.selectedFilm.selectedTickets,
      session: state => state.selectedFilm.selectedSession,
      film: state => state.selectedFilm.film,
      ageLimits: state => state.selectedFilm.ageLimits
    }),
    ...mapGetters({
      getCountInfoAboutTickets: 'selectedFilm/getCountInfoAboutTickets'
    })
  },
  methods: {
    ...mapMutations({
      removeTicket: 'selectedFilm/removeTicket'
    }),
    hide() {
      this.visible = false;
    }
  }
}
</script>

<style scoped>
a:hover {
  color: var(--light-green);
}

.seats-info-wrap {
  display: flex;
  gap: 5px;
  align-items: center;
}

.seats-info {
  display: flex;
  gap: 30px;
  align-items: center;
  justify-content: space-between;
}

.delete-button {
  width: 20px;
  height: 20px;
  transition: fill 0.4s;
  fill: var(--green);
}

.delete-button:hover {
  cursor: pointer;
  fill: var(--light-green);
}

.film-name {
  margin-bottom: 7px;
  font-size: 27px;
}

.tags-container {
  display: flex;
  gap: 15px;
  align-items: center;
  margin-bottom: 10px;
}

.cinema-address {
  margin-bottom: 15px;
}

.cinema-address p {
  margin-bottom: 0;
  color: var(--grey);
}

.session-time {
  padding-bottom: 10px;
  font-size: 22px;
  border-bottom: 2px dashed var(--green);
}

.order-info {
  overflow: auto;
}

.order-info__ticket-item-wrap {
  margin-bottom: 4px;
  padding-bottom: 25px;
  border-bottom: 1px solid var(--light-grey);
}

.order-info__ticket-item {
  display: flex;
  align-items: center;
  justify-content: center;
}

.ticket-item__seat-info {
  white-space: nowrap;
}

.ticket-item__dotted-line {
  width: 100%;
  margin: 0 8px;
  border-bottom: 0.5px dashed var(--grey);
}

.ticket-item__seat-price {
  white-space: nowrap;
  text-align: right;
}

.order-info__total-price {
  font-weight: 600;
  font-size: 17px;
  text-align: right;
}
</style>