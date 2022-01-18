<template>
  <a-popover>
    <template #content>
      <div class="popover-description">
        <p>На время оплаты {{ tickets.length > 1 ? 'Ваши билеты забронированы, чтобы их могли' : 'Ваш билет забронирован, чтобы его могли' }} купить только Вы.</p>
        <p>Но если Вы не произведете оплату по окончанию таймера, бронь с {{ tickets.length > 1 ? 'билетов' : 'билета' }} будет снята 😥</p>
      </div>
    </template>
    <my-timer v-if="!isTimeExpired" :duration="900" :callback="setExpiredCallback" class="checkout-timer"/>
  </a-popover>
  <div v-if="isTimeExpired === false" class="checkout-step-content">
    <div class="step-header-wrap">
      <h1 class="step-header">{{ tickets.length > 1 ? 'Ваши билеты почти готовы!' : 'Ваш билет почти готов!' }} Осталось дело за малым...</h1>
      <h2 class="step-header-description">Проверьте Ваш заказ и выберите удобный способ оплаты.</h2>
    </div>
    <div class="pay-wrap">
      <div>
        <div class="pay-left-col">
          <chosen-seats-info type="full"/>
        </div>
      </div>
      <div class="pay-right-col">
        <payment-form></payment-form>
      </div>
    </div>
    </div>
  <div v-else class="header-expired-wrap">
    <h1 class="step-header">Извините, время на оплату вышло.</h1>
    <h3 class="step-description">Приносим извинения за доставленные неудобства 😢</h3>
  </div>
</template>
<script>
import MyTimer from '../UI/MyTimer';
import { mapGetters, mapMutations, mapState } from 'vuex';
import ChosenSeatsInfo from './ChosenSeatsInfo';
import PaymentForm from './PaymentForm';

export default {
  name: 'CheckoutStep',
  components: { MyTimer, ChosenSeatsInfo, PaymentForm},
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

.popover-description {
  max-width: 400px;
}

.popover-description p {
  margin-bottom: 5px;
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
  margin-top: 15px;

  display: grid;
  gap: 40px;
  grid-template-columns: repeat(auto-fit, minmax(282px, 1fr));
}

.pay-left-col {
  height: 100%;
}

.header-expired-wrap {
  text-align: center;
}

@media (max-width: 460px) {
  .step-header {
    font-size: 20px;
  }
}
</style>