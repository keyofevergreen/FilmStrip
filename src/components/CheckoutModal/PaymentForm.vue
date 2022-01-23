<template>
  <form
    v-if="authAccount"
    class="payment-form"
    id="payment-form"
    @submit.prevent
    novalidate
  >
    <div>
      <fieldset form="payment-form" class="payment-form__fieldset-wrap">
        <legend>1. Данные для получения заказа</legend>
        <label>
          <a-input
            class="input payment-form__input"
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
          <a-input
            class="input payment-form__input"
            v-model:value="form.userPhoneNumber"
            @blur="v$.form.userPhoneNumber.$touch"
            type="tel"
            placeholder="Введите ваш номер телефона"
          />
          <p v-if="v$.form.userPhoneNumber.$error" class="error-message">
            {{ userPhoneNumberErrors }}
          </p>
        </label>
      </fieldset>
      <fieldset form="payment-form" class="payment-form__fieldset-wrap">
        <legend>2. Способ оплаты</legend>
        <label>
          <a-radio-group
            class="payment-form__checkout-type"
            v-model:value="form.paymentMethod"
          >
            <a-radio-button value="Банковская карта">
              Банковская карта
            </a-radio-button>
            <a-radio-button value="Google Pay"> Google Pay </a-radio-button>
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
      <a-button type="primary" class="btn-submit" @click="handleSuccess"
        >Оплатить {{ tickets.length * session.price }}₽
      </a-button>
    </a-spin>
  </form>
  <div v-else class="auth-wrap">
    <h2 class="auth-header">Чтобы оплатить заказ, нужно авторизоваться</h2>
    <a-button type="primary" class="btn-auth" @click="setModalVisible(true)"
      >Вход</a-button
    >
  </div>
</template>

<script>
import { mapMutations, mapState } from "vuex";
import useVuelidate from "@vuelidate/core";
import { email, required } from "@vuelidate/validators";
import { hasValidPhoneNumber } from "../../functions/validators";
import moment from "moment";

export default {
  name: "PaymentForm",
  setup() {
    return { v$: useVuelidate() };
  },
  data() {
    return {
      isFetching: false,
      form: {
        userMail: "",
        userPhoneNumber: "",
        paymentMethod: "",
      },
    };
  },
  validations() {
    return {
      form: {
        userMail: { required, email },
        userPhoneNumber: { required, hasValidPhoneNumber },
        paymentMethod: { required },
      },
    };
  },
  computed: {
    ...mapState({
      tickets: (state) => state.selectedFilm.selectedTickets,
      session: (state) => state.selectedFilm.selectedSession,
      film: (state) => state.selectedFilm.film,
      ageLimits: (state) => state.selectedFilm.ageLimits,
      authAccount: (state) => state.auth.authAccount,
    }),
    userMailErrors() {
      if (this.v$.form.userMail.required.$invalid)
        return "* Обязательно для заполнения.";
      if (this.v$.form.userMail.email.$invalid)
        return "* Неправильный формат почты.";
      return null;
    },
    userPhoneNumberErrors() {
      if (this.v$.form.userPhoneNumber.required.$invalid)
        return "* Обязательно для заполнения.";
      if (this.v$.form.userPhoneNumber.hasValidPhoneNumber)
        return "* Неправильный формат номера.";
      return null;
    },
    paymentMethodErrors() {
      if (this.v$.form.paymentMethod.required.$invalid)
        return "* Выберете способ оплаты.";
      return null;
    },
  },
  methods: {
    ...mapMutations({
      setCheckoutModalVisible: "selectedFilm/setCheckoutModalVisible",
      setAuthModalVisible: "setAuthModalVisible",
      clearTickets: "selectedFilm/clearTickets",
      updateAccountHistory: "updateTicketsHistory",
    }),
    setFetching(bool) {
      this.isFetching = bool;
    },
    openNotification() {
      this.$notification["success"]({
        message: "Запасайтесь попкорном!",
        description: `${
          this.tickets.length > 1
            ? "Билеты успешно оплачены. Информация о билетах"
            : "Билет успешно оплачен. Информация о билете"
        }  хранится в личном кабинете, а так же будет продублирована на почту и телефон, указанные Вами перед оплатой.`,
      });
    },
    addTicketToAccountHistory(ticketInfo) {
      //Update info in AuthAccount
      const authUser = this.authAccount;
      authUser.ticketsHistory.push(ticketInfo);
      this.updateAccountHistory(authUser);
      //Update info in LocalStorage.users
      const users = JSON.parse(localStorage.users);
      const usersAfterUpdateHistory = users.map((user) =>
        user.mail === authUser.mail ? authUser : user
      );
      localStorage.setItem("users", JSON.stringify(usersAfterUpdateHistory));
    },
    handleSuccess() {
      this.v$.$touch();
      this.setFetching(true);
      if (!this.v$.$invalid) {
        setTimeout(() => {
          this.addTicketToAccountHistory({
            id: moment().unix(),
            filmName: this.film.nameRu,
            filmLength: this.film.filmLength,
            session: this.session,
            ageLimits: this.ageLimits,
            ticketsInfo: this.tickets,
            userMail: this.form.userMail,
            paymentMethod: this.form.paymentMethod,
          });
          this.setCheckoutModalVisible(false);
          this.setFetching(false);
          this.openNotification();
        }, 500);
      } else {
        this.setFetching(false);
      }
    },
    setModalVisible(bool) {
      this.setAuthModalVisible(bool);
    },
  },
};
</script>

<style scoped>
.payment-form {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
}

.payment-form__fieldset-wrap {
  display: flex;
  flex-direction: column;
  gap: 25px;
  margin-bottom: 25px;
}

.payment-form__checkout-type {
  display: flex;
  flex-direction: column;
  gap: 5px;
  max-width: 300px;
}

.btn-submit {
  width: 100%;
  font-family: "Inter", sans-serif;
  border-radius: 5px;
}

.auth-wrap {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
}

.auth-header {
  font-weight: 400;
  font-size: 17px;
  text-align: center;
}

.btn-auth {
  width: 80%;
  min-height: 35px;
  border: 1px solid var(--green);
  border-radius: 5px;
  transition: border 0.4s;
}

@media (max-width: 717px) {
  .payment-form__checkout-type {
    max-width: none;
    text-align: center;
  }
}

@media (max-width: 420px) {
  .payment-form__fieldset-wrap legend {
    font-size: 1.3em;
  }
}
</style>
