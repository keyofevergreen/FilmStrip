<template>
  <form class="form-wrap" @submit.prevent novalidate>
    <label>
      <a-input
          class="input"
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
          class="input"
          v-model:value="form.userPassword"
          type="password"
          placeholder="Введите ваш пароль"
      />
      <p v-if="v$.form.userPassword.$error" class="error-message">
        {{ userPasswordErrors }}
      </p>
    </label>
    <div class="btn-wrap">
      <a-spin :spinning="isFetching">
        <button class="btn btn-auth" @click="handleSuccess">Войти</button>
      </a-spin>
    </div>
  </form>
</template>

<script>
import useVuelidate from '@vuelidate/core';
import { email, required, sameAs } from '@vuelidate/validators';
import { mapMutations, mapState } from 'vuex';
import { hasRegisteredMail } from '../../functions/validators';

export default {
  name: 'AuthForm',
  setup() {
    return { v$: useVuelidate() };
  },
  data() {
    const users = JSON.parse(localStorage.users);
    return {
      users,
      isFetching: false,
      form: {
        userMail: '',
        userPassword: '',
      },
    };
  },
  validations() {
    return {
      form: {
        userMail: {
          required,
          email,
          hasRegisteredMail,
        },
        userPassword: {
          required,
          sameAs: this.searchedAccount
              ? sameAs(this.searchedAccount.password)
              : '',
          $lazy: true,
        },
      },
    };
  },
  computed: {
    ...mapState({
      authModalVisible: (state) => state.auth.authModalVisible,
    }),
    searchedAccount() {
      return this.users.find((user) => user.mail === this.form.userMail);
    },
    userMailErrors() {
      if (this.v$.form.userMail.required.$invalid)
        return '* Обязательно для заполнения.';
      if (this.v$.form.userMail.email.$invalid)
        return '* Неправильный формат почты.';
      if (this.v$.form.userMail.hasRegisteredMail.$invalid)
        return '* Аккаунта с такой почтой не существует.';
      return null;
    },
    userPasswordErrors() {
      if (this.v$.form.userPassword.required.$invalid)
        return '* Обязательно для заполнения.';
      if (this.v$.form.userPassword.sameAs.$invalid)
        return '* Неправильный пароль.';
      return null;
    },
  },
  methods: {
    ...mapMutations({
      setAuthModalVisible: 'setAuthModalVisible',
      setAuthAccount: 'setAuthAccount',
    }),
    setFetching(bool) {
      this.isFetching = bool;
    },
    handleSuccess() {
      this.v$.$touch();
      this.setFetching(true);
      if (!this.v$.$invalid) {
        setTimeout(() => {
          this.setAuthModalVisible(false);
          this.setAuthAccount(this.searchedAccount);
          this.setFetching(false);
        }, 1000);
      } else {
        this.setFetching(false);
      }
    },
  },
  watch: {
    authModalVisible(newValue) {
      if (newValue === false) {
        this.v$.$reset();
        this.form.userMail = '';
        this.form.userPassword = '';
      }
    },
  },
};
</script>

<style scoped>
.form-wrap {
  display: flex;
  flex-direction: column;
  gap: 25px;
}

.btn-wrap {
  margin-top: 20px;
}

.btn-auth {
  width: 100%;
  min-height: 45px;
  border: 1px solid var(--green);
  border-radius: 5px;
  transition: border 0.4s;
}

.btn-auth:hover {
  border: 1px solid var(--light-green);
}
</style>
