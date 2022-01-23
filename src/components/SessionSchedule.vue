<template>
  <div v-for='cinema in cinemas' :key='cinema.id' class="session-schedule">
    <div class="session-schedule__item">
      <div class="place">
        <h3 class="place__name header">{{ cinema.name }}</h3>
        <div class="place__address">{{ cinema.address }}</div>
      </div>
      <div class="sessions">
        <div v-for='format in cinema.formats' :key="format">
          <h3 class="header">{{ format.format }}</h3>
          <div class="sessions__container">
            <session-item v-for="session in format.sessions"
                          :key="`${session.time}-${session.hall}-${format.format}`"
                          :session="setSession(cinema, format, session)"></session-item>
          </div>
        </div>
      </div>
    </div>
  </div>

  <checkout-modal></checkout-modal>
</template>

<script>
import SessionItem from './SessionItem';
import 'ant-design-vue/dist/antd.css';
import CheckoutModal from './CheckoutModal/CheckoutModal';
import { mapState } from 'vuex';

export default {
  name: 'SessionSchedule',
  components: {
    CheckoutModal,
    SessionItem
  },
  computed: {
    ...mapState({
      cinemas: state => state.cinemaSession.cinema
    })
  },
  methods: {
    setSession(cinema, format, session) {
      return {
        time: session.time,
        price: session.price,
        hall: session.hall,
        hallType: session.hallType,
        format: format.format,
        cinema: { name: cinema.name, address: cinema.address }
      };
    }
  }
};
</script>

<style scoped>
.session-schedule {
  margin-top: 20px;
}

.session-schedule__item {
  display: grid;
  grid-template-columns: 1fr 2fr;
  gap: 50px;
}

.place {
  padding-left: 20px;
}

.header {
  margin-bottom: 7px;
  font-weight: 600;
  font-size: 20px;
}

.place__address {
  max-width: 340px;
  color: var(--grey);
  font-size: 17px;
}

.sessions {
  display: flex;
  flex-direction: column;
  gap: 25px;
  padding-bottom: 55px;
  border-bottom: 1px solid var(--light-grey);
}

.sessions__container {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(80px, 1fr));
  gap: 15px;
}
</style>