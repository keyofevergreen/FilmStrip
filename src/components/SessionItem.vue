<template>
  <div class="session-item">
    <a-button class="session-item__time" :disabled="isDisabled" :class='isDisabled ? "disabled" : ""' @click="setSession(session)">{{ session.time }}</a-button>
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
      realTime : moment().unix(),
      interval: null,
      isDisabled: moment(this.session.time, 'hh:mm') < moment(),
    }
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
    stopTimer() {
      clearInterval(this.interval);
    },
    isSessionStarter() {
      if(moment(this.session.time, 'HH:mm').unix() < moment().unix()) {
        this.isDisabled = true;
        this.stopTimer();
      } else {
        this.realTime = moment().unix();
      }
    },
  },
  mounted() {
    this.startTimer();
  },
  unmounted() {
    this.stopTimer();
  }
}
</script>

<style scoped>
.session-item {
  position: relative;
  height: 50px;
}

.session-item__time {
  width: 80px;
  height: 30px;
  border: 1px solid var(--green);
  border-radius: 5px;

  font-size: 14px;
  color: var(--pretty-black);
  background-color: #fff;

  display: flex;
  justify-content: center;
  align-items: center;

  cursor: pointer;
  transition: transform .5s, background-color .5s;
}

.session-item__price {
  position: absolute;
  top: 31px;
  left: 5px;
  font-size: 11px;
  font-weight: 300;
}

.session-item__time:not(.disabled):hover {
  transform: scale(1.1);
  color: #fff;
  background-color: var(--green);
}
</style>