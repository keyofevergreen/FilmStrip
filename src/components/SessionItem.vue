<template>
  <div class="session-item">
    <a-button
        class="btn session-item__btn"
        :disabled="isDisabled"
        :class='isDisabled ? "disabled" : "available"'
        @click="setSession(session)">
      {{ session.time }}
    </a-button>
    <span class="session-item__price">{{ session.price }} ₽</span>
  </div>
</template>

<script>
import { mapMutations } from 'vuex';
import moment from 'moment';

export default {
  name: 'SessionItem',
  props: {
    session: {
      type: Object
    }
  },
  data() {
    return {
      interval: null,
      isDisabled: moment(this.session.time, 'hh:mm') < moment(),
    };
  },
  methods: {
    ...mapMutations({
      setCheckoutModalVisible: 'setCheckoutModalVisible',
      setSelectedSession: 'setSelectedSession'
    }),
    setSession(session) {
      this.setCheckoutModalVisible(true);
      this.setSelectedSession(session);
    },
    startTimer() {
      this.interval = setInterval(this.isSessionStarter, 1000);
    },
    isSessionStarter() {
      if (moment(this.session.time, 'hh:mm') < moment()) {
        this.isDisabled = true;
        this.stopTimer();
      } else {
        this.isDisabled = false;
      }
    },
    stopTimer() {
      clearInterval(this.interval);
    },
  },
  beforeMount() {
    this.startTimer();
  },
  unmounted() {
    this.stopTimer();
  }
};
</script>

<style scoped>
.session-item {
  position: relative;
  height: 50px;
}

.session-item__btn {
  width: 80px;
  height: 30px;

  font-size: 14px;

  display: flex;
  justify-content: center;
  align-items: center;

  border: 1px solid var(--green);
  border-radius: 5px;
  cursor: pointer;
  transition: transform .5s, background-color .5s;
}

.available {
  background-color: #fff;
  color: var(--pretty-black);
}

.session-item__price {
  position: absolute;
  top: 31px;
  left: 5px;
  font-size: 11px;
  font-weight: 300;
}

.session-item__btn:not(.disabled):hover {
  transform: scale(1.1);
  color: #fff;
  background-color: var(--green);
}

.ant-btn:focus {
  color: var(--pretty-black);
}
</style>