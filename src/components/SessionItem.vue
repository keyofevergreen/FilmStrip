<template>
  <div class="session">
    <a-button
        class="btn session__btn"
        :disabled="isDisabled"
        :class='isDisabled ? "session__btn-disabled" : "session__btn-available"'
        @click="setSession(session)">
      {{ session.time }}
    </a-button>
    <span class="session__price">{{ session.price }} ₽</span>
  </div>
</template>

<script>
import { mapMutations, mapState } from 'vuex';
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
      isDisabled: null,
    };
  },
  computed: {
    ...mapState({
      selectedDate: state => state.selectedFilm.selectedDate
    })
  },
  watch: {
    selectedDate(newValue) {
      console.log(newValue !== moment().format('DD.MM.YYYY'))
      if(newValue !== moment().format('DD.MM.YYYY')) {
        this.stopTimer();
        this.isDisabled = false;
      } else {
        this.startTimer();
      }
    }
  },
  methods: {
    ...mapMutations({
      setCheckoutModalVisible: 'selectedFilm/setCheckoutModalVisible',
      setSelectedSession: 'selectedFilm/setSelectedSession'
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
      if(this.interval) {
        clearInterval(this.interval)
      }
    },
  },
  beforeMount() {
    if(this.selectedDate === moment().format('DD.MM.YYYY')) {
      this.startTimer();
    }
  },
  unmounted() {
    this.stopTimer();
  }
};
</script>

<style scoped>
.session {
  position: relative;
  height: 50px;
}

.session__btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 80px;
  height: 30px;
  font-size: 14px;
  border-radius: 5px;
  cursor: pointer;
  transition: transform .5s, background-color .5s;
}

.session__btn-available {
  color: var(--pretty-black);
  background-color: #fff;
  border: 1px solid var(--green);
}

.session__price {
  position: absolute;
  top: 31px;
  left: 5px;
  font-weight: 300;
  font-size: 11px;
}

.session__btn:not(.session__btn-disabled):hover {
  color: #fff;
  background-color: var(--green);
  transform: scale(1.1);
}

.ant-btn:focus {
  color: var(--pretty-black);
}

.ant-btn[disabled] {
  cursor: default;
}
</style>