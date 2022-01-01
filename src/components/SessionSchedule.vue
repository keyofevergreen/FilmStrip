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
                          :session="{time: session.time, price: session.price, hall: session.hall, format: format.format, cinema: {name: cinema.name, address: cinema.address}}"></session-item>
          </div>
        </div>
      </div>
    </div>
  </div>

  <order-process-modal></order-process-modal>
</template>

<script>
import SessionItem from './SessionItem';
import 'ant-design-vue/dist/antd.css';
import OrderProcessModal from './OrderProcessModal';

export default {
  name: 'SessionSchedule',
  props: {
    cinemas: {
      type: Object
    }
  },
  components: {
    OrderProcessModal,
    SessionItem
  }
}
</script>

<style scoped>
.session-schedule {
  margin-top: 20px;
}

.session-schedule__item {
  display: grid;
  gap: 50px;
  grid-template-columns: 1fr 2fr;
}

.place {
  padding-left: 20px;
}

.header {
  font-size: 20px;
  font-weight: 600;
  margin-bottom: 7px;
}

.place__address {
  max-width: 340px;
  font-size: 17px;
  color: var(--grey);
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
  gap: 15px;
  grid-template-columns: repeat(auto-fill, minmax(80px, 1fr));
}
</style>