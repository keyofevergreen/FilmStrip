<template>
  <a-modal v-model:visible="isVisible" :centered="true" width="420px" :footer="null" :afterClose="handleCancel"
           :closable="false" wrapClassName="modal">
    <h2 class="auth-header">Войти</h2>
    <div class="btn-wrap">
      <a-spin :spinning="isFetching">
        <button class="btn btn-auth" @click="handleOk">Тестовый вход</button>
      </a-spin>
    </div>
  </a-modal>
</template>

<script>
import { mapMutations, mapState } from 'vuex';

export default {
  name: 'LoginModal',
  data() {
    return {
      isVisible: false,
      isFetching: false,
    };
  },
  computed: {
    ...mapState({
      loginModalVisible: state => state.loginModalVisible,
    })
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