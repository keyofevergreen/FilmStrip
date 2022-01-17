<template>
  <a-modal v-model:visible="isVisible" :centered="true" width="420px" :footer="null" :afterClose="handleCancel"
           :closable="false" wrapClassName="modal">
      <h2 class="auth-header">Войти</h2>
      <h2 class="auth-header">Войти</h2>
    <form>
      <label>
        <a-input class="payment-form__input"
                 v-model:value="form.userMail"
                 @blur="v$.form.userMail.$touch"
                 type="email"
                 placeholder="Введите вашу почту"
                 pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
        />
        <p v-if="v$.form.userMail.$error" class="error-message">
          {{ userMailErrors }}
        </p>
      </label>
      <label>
        <a-input class="payment-form__input"
                 v-model:value="form.userPassword"
                 @blur="v$.form.userPassword.$touch"
                 type="email"
                 placeholder="Введите вашу почту"
                 pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
        />
        <p v-if="v$.form.userPassword.$error" class="error-message">
          {{ userPasswordErrors }}
        </p>
      </label>
    </form>
    <div class="btn-wrap">
      <a-spin :spinning="isFetching">
        <button class="btn btn-auth" @click="handleOk">Тестовый вход</button>
      </a-spin>
    </div>
  </a-modal>
</template>

<script>
import { mapMutations, mapState } from 'vuex';
import useVuelidate from '@vuelidate/core';
import { email, required } from '@vuelidate/validators';

export default {
  name: 'AuthModal',
  setup() {
    return { v$: useVuelidate() };
  },
  data() {
    return {
      isVisible: false,
      isFetching: false,
      form: {
        userMail: '',
        userPassword: '',
      }
    };
  },
  validations() {
    return {
      form: {
        userMail: { required, email },
        userPassword: { required },
      }
    };
  },
  computed: {
    ...mapState({
      loginModalVisible: state => state.loginModalVisible,
    }),
    userMailErrors() {
      if (this.v$.form.userMail.required.$invalid) return '* Обязательно для заполнения.';
      if (this.v$.form.userMail.email.$invalid) return '* Неправильный формат почты.';
      return null;
    },
    userPasswordErrors() {
      if (this.v$.form.userPassword.required.$invalid) return '* Обязательно для заполнения.';
      return null;
    },
  },
  methods: {
    ...mapMutations({
      setLoginModalVisible: 'setLoginModalVisible',
      setAuth: 'setAuth'
    }),
    setFetching(bool) {
      this.isFetching = bool;
    },
    handleOk() {
      this.setFetching(true);
      try {
        setTimeout(() => {
          this.setAuth(true);
          this.setLoginModalVisible(false)
          this.setFetching(false);
        }, 2000);
      } catch (e) {
        console.error(e);
      }

    },
    handleCancel() {
      this.setLoginModalVisible(false);
      this.form.userMail = '';
      this.form.userPassword = '';
    }
  },
  watch: {
    loginModalVisible(newValue) {
      this.isVisible = (newValue);
    }
  },
  beforeMount() {
    if (this.isVisible === true) {
      this.isVisible = false;
      this.setLoginModalVisible(false);
    }
  }
};
</script>

<style scoped>
.modal .ant-modal .ant-modal-content {
  padding: 25px 10px 0 10px;
}

.auth-header {
  font-weight: 400;
  color: var(--grey);
}

.btn-wrap {
  display: flex;
  flex-direction: column;
  gap: 10px;
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