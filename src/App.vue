<template>
  <my-header></my-header>
  <router-view class="wrap content">
  </router-view>
</template>

<script>
import MyHeader from "./components/MyHeader";
import { mapActions } from 'vuex';

export default {
  name: "App",
  components: { MyHeader },
  methods: {
    ...mapActions({
      setFetchedFilms: 'fetchFilms'
    })
  },
  mounted() {
    this.setFetchedFilms();
  }
}
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Inter&family=Montserrat&display=swap');

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

:root {
  --green: #4FC08D;
  --pretty-black: #333333;
  --light-gray: #F6F6F6;
  --gray: #999DA5;
  --dark-gray: #4F5959;

}

body {
  font-family: 'Inter', sans-serif;
  min-width: 365px;
}

.wrap {
  width: 100%;
  max-width: 1140px;
  margin: 0 auto;
}

.content {
  margin-top: 155px;
  overflow: hidden;
}

.btn {
  font-size: 20px;
  font-family: 'Inter', sans-serif;
  background-color: transparent;
  border: 0;
  cursor: pointer;
}

@media (max-width: 1140px) {
  .content {
    padding: 0 30px;
  }
}

@media (max-width: 811px) {
  .content {
    padding: 0 10px;
  }
}
@media (max-width: 487px) {
  .content {
    margin-top: 188px;
    padding: 0;
  }
}
</style>