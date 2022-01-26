<template>
  <div v-if="hasRelease()">
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
              <session-item
                  v-for="session in format.sessions"
                  :key="`${session.time}-${session.hall}-${format.format}`"
                  :session="setSession(cinema, format, session)"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div v-else class="session-schedule-empty">
    Премьера фильма назначена на {{premiereDate}}.
  </div>

  <checkout-modal></checkout-modal>
</template>

<script>
import SessionItem from './SessionItem';
import 'ant-design-vue/dist/antd.css';
import CheckoutModal from './CheckoutModal/CheckoutModal';
import { mapState } from 'vuex';
import moment from 'moment';

export default {
  name: 'SessionSchedule',
  components: {
    CheckoutModal,
    SessionItem
  },
  computed: {
    ...mapState({
      cinemas: state => state.cinemaSession.cinema,
      premiereDate: state => state.selectedFilm.premiereDate,
      selectedDate: state => state.selectedFilm.selectedDate
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
    },
    hasRelease() {
      return moment(this.premiereDate, 'DD.MM.YYYY').unix() <= moment(this.selectedDate, 'DD.MM.YYYY').unix();
    }
  }
};
</script>

<style scoped>
.session-schedule {
  margin-top: 20px;
  margin-bottom: 40px;
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

.session-schedule-empty {
  margin: 40px 0  60px;
  font-size: 25px;
  text-align: center;
}

@media (max-width: 500px) {
  .session-schedule-empty {
    margin-bottom: 40px;
    font-size: 20px;
  }
}
</style>