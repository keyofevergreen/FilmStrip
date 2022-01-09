<template>
  <a-popover>
    <template #content>
      <div class="timer-description">
        <p>На время оплаты {{ tickets.length > 1 ? 'Ваши билеты забронированы, чтобы их могли' : 'Ваш билет забронирован, чтобы его могли' }} купить только Вы.</p>
        <p>Но если Вы не произведете оплату по окончанию таймера, бронь с {{ tickets.length > 1 ? 'билетов' : 'билета' }} будет снята 😥</p>
      </div>
    </template>
    <my-timer v-if="!isTimeExpired" :duration="900" :callback="setExpiredCallback" class="checkout-timer"></my-timer>
  </a-popover>
  <div v-if="isTimeExpired === false" class="checkout-step-content">
    <div class="step-header-wrap">
      <h1 class="step-header">{{ tickets.length > 1 ? 'Ваши билеты почти готовы!' : 'Ваш билет почти готов!' }} Осталось дело за малым..</h1>
      <h2 class="step-header-description">Проверьте Ваш заказ и выберете удобный способ оплаты.</h2>
    </div>
    <div class="pay-wrap">
      <div>
        <div class="pay-left-col">
          <h1 class="pay-left-col__film-name">{{film.nameRu}}</h1>
          <div class="pay-left-col__tags-container">
            <my-tag :text="ageLimits" type="dotted"></my-tag>
            <my-tag :text="session.format" type="green"></my-tag>
          </div>
          <chosen-seats-info type="full"></chosen-seats-info>
        </div>
      </div>
      <div>
        <button class="btn btn-checkout">Оплатить жопой</button>
      </div>
    </div>
    </div>
  <div v-else class="header-expired-wrap">
    <h1 class="step-header">Извините, время на оплату вышло.</h1>
    <h3 class="step-description">Приносим извинения за доставленные неудобства 😢</h3>
  </div>
</template>
<script>
import MyTimer from './UI/MyTimer';
import { mapGetters, mapMutations, mapState } from 'vuex';
import MyTag from './UI/MyTag';
import ChosenSeatsInfo from './ChosenSeatsInfo';

export default {
  name: 'CheckoutStep',
  components: { MyTimer, MyTag, ChosenSeatsInfo },
  data() {
    return {};
  },
  methods: {
    ...mapMutations({
      setIsTimeExpired: 'setIsTimeExpired',
      clearTickets: 'clearTickets'
    }),
    setExpiredCallback() {
      this.setIsTimeExpired(true);
      this.clearTickets();
    }
  },
  computed: {
    ...mapState({
      isTimeExpired: state => state.isTimeExpired,
      tickets: state => state.selectedTickets,
      session: state => state.selectedSession,
      film: state => state.selectedFilm,
      ageLimits: state => state.ageLimitsOfSelectedFilm
    }),
    ...mapGetters({
      getCountInfoAboutTickets: 'getCountInfoAboutTickets'
    })
  },
  unmounted() {
    this.setIsTimeExpired(false);
  }
};
</script>

<style scoped>
.checkout-timer {
  width: 100px;
  margin-bottom: 10px;
}

.timer-description {
  max-width: 400px;
}

.step-header-wrap {
  padding-bottom: 20px;
  border-bottom: 1px solid var(--light-grey);
}

.step-header {
  font-size: 23px;
  margin-bottom: 10px;
  line-height: 1.2;
}

.step-header-description {
  font-size: 17px;
  font-weight: 400;
}

.pay-wrap {
  display: grid;
  gap: 30px;
  grid-template-columns: repeat(auto-fit, minmax(282px, 1fr));
}

.pay-left-col__film-name {
  font-size: 27px;
  margin-bottom: 7px;
}

.pay-left-col__tags-container {
  display: flex;
  align-items: center;
  gap: 15px;
  margin-bottom: 10px;
}

.header-expired-wrap {
  text-align: center;
}

.btn-checkout {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  border-radius: 15px;
  margin: 15px;
  background-color: var(--green);
  color: #fff;
}

@media (max-width: 460px) {
  .step-header {
    font-size: 20px;
  }
}
</style>