<template>
  <form class="form-wrap" @submit.prevent novalidate>
    <label>
      Электронная почта
      <a-input class="input"
               v-model:value="form.userMail"
               @blur="v$.form.userMail.$touch"
               type="email"
               placeholder="filmstrip@gmail.com"
               pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
      />
      <p v-if="v$.form.userMail.$error" class="error-message">
        {{ userMailErrors }}
      </p>
    </label>
    <label>
      Ваш номер телефона
      <a-input class="input"
               v-model:value="form.userPhoneNumber"
               @blur="v$.form.userPhoneNumber.$touch"
               type="email"
               placeholder="+7 999 666 99 99"
               pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
      />
      <p v-if="v$.form.userPhoneNumber.$error" class="error-message">
        {{ userPhoneNumberErrors }}
      </p>
    </label>
    <label>
      Пароль
      <a-input class="input"
               v-model:value="form.userPassword"
               @blur="v$.form.userPassword.$touch"
               type="password"
               placeholder="Минимум 8 символов"
      />
      <p v-if="v$.form.userPassword.$error" class="error-message">
        {{ userPasswordErrors }}
      </p>
    </label>
    <label>
      Подтвердите пароль
      <a-input class="input"
               v-model:value="form.userPasswordRepeat"
               @blur="v$.form.userPasswordRepeat.$touch"
               type="password"
               placeholder="Минимум 8 символов"
      />
      <p v-if="v$.form.userPassword.$error" class="error-message">
        {{ userPasswordErrors }}
      </p>
    </label>
    <div class="btn-wrap">
      <a-spin :spinning="isFetching">
        <button class="btn btn-registration" @click="handleSuccess">Зарегистрироваться</button>
      </a-spin>
    </div>
  </form>
</template>

<script>
import useVuelidate from '@vuelidate/core';
import { email, required, minLength, sameAs } from '@vuelidate/validators';
import { mapMutations, mapState } from 'vuex';
import { hasUnregisteredMail, hasUnregisteredPhoneNumber, hasValidPhoneNumber } from '../../functions/validators';

export default {
  name: 'RegistrationForm',
  setup() {
    return { v$: useVuelidate() };
  },
  data() {
    return {
      isFetching: false,
      form: {
        userMail: '',
        userPhoneNumber: '',
        userPassword: '',
        userPasswordRepeat: ''
      }
    };
  },
  validations() {
    return {
      form: {
        userMail: { required, email, hasUnregisteredMail },
        userPhoneNumber: { required, hasValidPhoneNumber, hasUnregisteredPhoneNumber },
        userPassword: {
          required,
          minLength: minLength(8),
          sameAs: sameAs(this.form.userPasswordRepeat)
        },
        userPasswordRepeat: { required },
      }
    };
  },
  computed: {
    ...mapState({
      authModalVisible: state => state.authModalVisible
    }),
    userMailErrors() {
      if (this.v$.form.userMail.required.$invalid) return '* Обязательно для заполнения.';
      if (this.v$.form.userMail.email.$invalid) return '* Неправильный формат почты.';
      if (this.v$.form.userMail.hasUnregisteredMail.$invalid) return '* Аккаунт с такой почтой уже существует.';
      return null;
    },
    userPhoneNumberErrors() {
      if (this.v$.form.userPhoneNumber.required.$invalid) return '* Обязательно для заполнения.';
      if (this.v$.form.userPhoneNumber.hasValidPhoneNumber.$invalid) return '* Неправильный формат номера.';
      if (this.v$.form.userPhoneNumber.hasUnregisteredPhoneNumber.$invalid) return '* Аккаунт с таким номером уже существует.';
      return null;
    },
    userPasswordErrors() {
      if (this.v$.form.userPassword.required.$invalid) return '* Обязательно для заполнения.';
      if (this.v$.form.userPassword.minLength.$invalid) return '* Минимальная длинна пароля - 8 символов.';
      if (this.v$.form.userPassword.sameAs.$invalid) return '* Пароли не совпадают.';
      return null;
    },
  },
  methods: {
    ...mapMutations({
      setAuthModalVisible: 'setAuthModalVisible',
      setAuthAccount: 'setAuthAccount'
    }),
    setFetching(bool) {
      this.isFetching = bool;
    },
    createAccount() {
      const users = JSON.parse(localStorage.users);
      const user = {mail: this.form.userMail, phoneNumber: this.form.userPhoneNumber, password: this.form.userPassword, ticketsHistory: []};
      users.push(user);
      localStorage.setItem("users", JSON.stringify(users));
      this.setAuthAccount(user);
    },
    handleSuccess() {
      this.v$.$touch();
      this.setFetching(true);
      if (!this.v$.$invalid) {
        setTimeout(() => {
          this.setAuthModalVisible(false);
          this.createAccount();
          this.setFetching(false);
        }, 1000);
      } else {
        this.setFetching(false);
      }
    },
  },
};
</script>

<style scoped>
.form-wrap {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.btn-wrap {
  margin-top: 20px;
}

.btn-registration {
  width: 100%;
  min-height: 45px;
  color: #fff;
  background-color: var(--green);
  border-radius: 5px;
  transition: background-color 0.4s;
}

.btn-registration:hover {
  background-color: var(--light-green);
}
</style>