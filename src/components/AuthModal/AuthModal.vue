<template>
  <a-modal v-model:visible="isVisible" :centered="true" width="420px" :footer="null" :afterClose="handleCancel"
           :closable="false" wrapClassName="modal">
    <div v-if="currentModalPage === 0">
      <div class="registration-link-wrap">
        <a class="auth-header auth-header-registration-link" @click="linkToRegistrationForm">Регистрация</a>
      </div>
      <h2 class="auth-header">Войти</h2>
      <auth-form/>
    </div>
    <div v-else>
      <h2 class="auth-header">Регистрация</h2>
      <registration-form/>
    </div>
  </a-modal>
</template>

<script>
import { mapMutations, mapState } from 'vuex';
import AuthForm from './AuthForm';
import RegistrationForm from './RegistrationForm';

export default {
  name: 'AuthModal',
  components: { AuthForm, RegistrationForm },
  data() {
    return {
      isVisible: false,
      currentModalPage: 0
    }
  },
  computed: {
    ...mapState({
      authModalVisible: state => state.authModalVisible,
    }),
  },
  methods: {
    ...mapMutations({
      setAuthModalVisible: 'setAuthModalVisible'
    }),
    handleCancel() {
      this.setAuthModalVisible(false);
      this.currentModalPage = 0;
    },
    linkToRegistrationForm() {
      this.currentModalPage = 1;
    }
  },
  watch: {
    authModalVisible(newValue) {
      this.isVisible = (newValue);
    }
  },
  beforeMount() {
    if (this.isVisible === true) {
      this.isVisible = false;
      this.setAuthModalVisible(false);
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

.registration-link-wrap {
  text-align: right;
}

.auth-header-registration-link {
  font-size: 19px;
  color: var(--green);
  transition: color 0.4s;
}

.auth-header-registration-link:hover {
  color: var(--light-green);
}
</style>