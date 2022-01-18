<template>
  <form class="payment-form" id="payment-form" @submit.prevent novalidate>
    <div>
      <fieldset form="payment-form" class="payment-form__fieldset-wrap">
        <legend>1. Данные для получения заказа</legend>
        <label>
          <a-input class="input payment-form__input"
                   v-model:value="form.userMail"
                   @blur="v$.form.userMail.$touch"
                   type="email"
                   placeholder="Введите вашу почту"
          />
          <p v-if="v$.form.userMail.$error" class="error-message">
            {{ userMailErrors }}
          </p>
        </label>
        <label>
          <a-input class="input payment-form__input"
                   v-model:value="form.userPhoneNumber"
                   @blur="v$.form.userPhoneNumber.$touch"
                   type="tel"
                   placeholder="Введите ваш номер телефона"/>
          <p v-if="v$.form.userPhoneNumber.$error" class="error-message">
            {{ userPhoneNumberErrors }}
          </p>
        </label>
      </fieldset>
      <fieldset form="payment-form" class="payment-form__fieldset-wrap">
        <legend>2. Способ оплаты</legend>
        <label>
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
          <p v-if="v$.form.paymentMethod.$error" class="error-message">
            {{ paymentMethodErrors }}
          </p>
        </label>
      </fieldset>
    </div>
    <a-spin :spinning="isFetching">
      <a-button type="primary" class="btn btn-submit" @click="handleSuccess">Оплатить {{
          tickets.length * session.price
        }}₽
      </a-button>
    </a-spin>
  </form>
</template>

<script>
import { mapMutations, mapState } from 'vuex';
import useVuelidate from '@vuelidate/core';
import { email, required } from '@vuelidate/validators';
import { hasValidPhoneNumber } from '../../functions/validators';

export default {
  name: 'PaymentForm',
  setup() {
    return { v$: useVuelidate() };
  },
  data() {
    return {
      isFetching: false,
      form: {
        userMail: '',
        userPhoneNumber: '',
        paymentMethod: '',
      },
    };
  },
  validations() {
    return {
      form: {
        userMail: { required, email },
        userPhoneNumber: { required, hasValidPhoneNumber },
        paymentMethod: { required },
      }
    };
  },
  computed: {
    ...mapState({
      tickets: state => state.selectedTickets,
      session: state => state.selectedSession,
    }),
    userMailErrors() {
      if (this.v$.form.userMail.required.$invalid) return '* Обязательно для заполнения.';
      if (this.v$.form.userMail.email.$invalid) return '* Неправильный формат почты.';
      return null;
    },
    userPhoneNumberErrors() {
      if (this.v$.form.userPhoneNumber.required.$invalid) return '* Обязательно для заполнения.';
      if (this.v$.form.userPhoneNumber.hasValidPhoneNumber) return '* Неправильный формат номера.';
      return null;
    },
    paymentMethodErrors() {
      if (this.v$.form.paymentMethod.required.$invalid) return '* Выберете способ оплаты.';
      return null;
    }
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
      this.v$.$touch();
      this.setFetching(true);
      console.log(this.authAccount);
      if (!this.v$.$invalid) {
          setTimeout(() => {
            this.setCheckoutModalVisible(false);
            console.log(this.form);
            this.setFetching(false);
          }, 500);
      } else {
        this.setFetching(false);
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