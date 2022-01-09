<template>
  <div class="seats-info-wrap">
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
</template>

<script>
import { mapGetters, mapMutations, mapState } from 'vuex';

export default {
  name: 'ChosenSeatsInfo',
  data() {
    return {
      visible: false,
    }
  },
  computed: {
    ...mapState({
      tickets: state => state.selectedTickets,
      session: state => state.selectedSession
    }),
    ...mapGetters({
      getCountInfoAboutTickets: 'getCountInfoAboutTickets'
    })
  },
  methods: {
    ...mapMutations({
      removeTicket: 'removeTicket'
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
  justify-content: space-between;
  align-items: center;
}

.delete-button {
  width: 20px;
  height: 20px;
  fill: var(--green);
  transition: fill 0.4s;
}

.delete-button:hover {
  cursor: pointer;
  fill: var(--light-green);
}
</style>