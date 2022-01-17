<template>
  <form class="payment-form" id="payment-form" @submit.prevent>
      <div>
        <fieldset form="payment-form" class="payment-form__fieldset-wrap">
          <legend>1. Данные для получения заказа</legend>
          <a-input class="payment-form__input"
                   v-model:value="form.userMail"
                   type="email"
                   placeholder="Введите вашу почту"
                   pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
          />
          <a-input class="payment-form__input"
                   v-model:value="form.userPhoneNumber"
                   type="tel"
                   placeholder="Введите ваш номер телефона"/>
        </fieldset>
        <fieldset form="payment-form" class="payment-form__fieldset-wrap">
          <legend>2. Способ оплаты</legend>
          <a-radio-group class="payment-form__checkout-type" v-model:value="form.paymentMethod">
            <a-radio-button value="Банковская карта">
              Банковская карта
            </a-radio-button>
            <a-radio-button value="Google Pay">
              Google Pay
            </a-radio-button>
            <a-radio-button value="В кассе кинотеатра">
              В кассе кинотеатра перед сеансом
            </a-radio-button>
          </a-radio-group>
        </fieldset>
      </div>
    <a-spin :spinning="isFetching">
      <a-button type="primary" class="btn btn-submit" @click="handleSuccess">Оплатить {{ tickets.length * session.price }}₽</a-button>
    </a-spin>
  </form>
</template>

<script>
import { mapMutations, mapState } from 'vuex';

export default {
  name: 'PaymentForm',
  data() {
    return {
      isFetching: false,
      form: {
        userMail: '',
        userPhoneNumber: '',
        paymentMethod: '',
      }
    }
  },
  computed: {
    ...mapState ({
      tickets: state => state.selectedTickets,
      session: state => state.selectedSession,
    })
  },
  methods: {
    ...mapMutations({
      setCheckoutModalVisible: 'setCheckoutModalVisible',
      clearTickets: 'clearTickets'
    }),
    setFetching(bool) {
      this.isFetching = bool;
    },
    handleSuccess() {
      this.setFetching(true);
      try {
        setTimeout(() => {
          this.setCheckoutModalVisible(false)
          console.log(this.form);
          this.setFetching(false);
        }, 500);
      } catch (e) {
        console.error(e);
      }

    }
  }
};
</script>

<style scoped>
.payment-form {
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.payment-form__fieldset-wrap {
  margin-bottom: 25px;
  display: flex;
  flex-direction: column;
  gap: 25px;
}

legend {
  font-size: 17px;
}

.payment-form__input {
  border-radius: 5px;
}

.payment-form__checkout-type {
  display: flex;
  flex-direction: column;
  gap: 5px;
  max-width: 300px;
}

.btn-submit {
  width: 100%;
}

@media (max-width: 717px) {
  .payment-form__checkout-type {
    max-width: none;
    text-align: center;
  }
}
</style>