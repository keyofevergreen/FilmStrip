<template>
  <div class="session-item">
    <button class="session-item__time" @click="setSession(session)">{{ session.time }}</button>
    <span class="session-item__price">{{ session.price }} ₽</span>
  </div>
</template>

<script>
import { mapMutations } from 'vuex';

export default {
  name: 'SessionItem',
  props: {
    session: {
      type: Object
    }
  },
  methods: {
    ...mapMutations({
      setTicketsPickerModalVisible: 'setTicketsPickerModalVisible',
      setSelectedSession: 'setSelectedSession'
    }),
    setSession(session) {
      this.setTicketsPickerModalVisible(true);
      this.setSelectedSession(session);
    }
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

.session-item__time:hover {
  transform: scale(1.1);
  color: #fff;
  background-color: var(--green);
}
</style>