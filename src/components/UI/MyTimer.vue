<template>
  <div class='timer' :class="seconds <= 45 ? 'timer-running-out' : ''">
    {{getMinutes}}:{{getSeconds}}
  </div>
</template>

<script>
export default {
  name: 'MyTimer',
  props: {
    duration: {
      type: Number
    },
    callback: {
      type: Function
    }
  },
  data() {
    return {
      seconds: this.duration,
      interval: null,
    }
  },
  methods: {
    startTimer() {
      this.interval = setInterval(this.decrementSeconds, 1000);
    },
    stopTimer() {
      clearInterval(this.interval);
    },
    decrementSeconds() {
      if(this.seconds > 0) {
        this.seconds--;
      } else {
        this.stopTimer();
        this.callback();
      }
    },
  },
  computed: {
    getMinutes() {
      const remainder = Math.floor(this.seconds / 60);
      return remainder < 10 ? `0${remainder}` : remainder;
    },
    getSeconds() {
      const remainder = this.seconds % 60;
      return remainder < 10 ? `0${remainder}` : remainder;
    }
  },
  mounted() {
    this.startTimer();
  },
  unmounted() {
    this.stopTimer();
  }
};
</script>

<style scoped>
.timer {
  color: var(--pretty-black);
  font-size: 20px;
  transition: color 30s;
}

.timer-running-out {
  color: #E34234;
}
</style>