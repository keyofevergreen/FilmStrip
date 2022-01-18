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
    if(!localStorage.getItem("users")) {
      localStorage.setItem("users", JSON.stringify([]));
    }
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
  --green: #4fc08d;
  --light-green: #51eda7;
  --pretty-black: #333333;
  --light-grey: #f6f6f6;
  --grey: #999da5;
  --dark-grey: #4f5959;
  --red: #d93025;

}

body {
  font-family: 'Inter', sans-serif;
  min-width: 365px;
  color: var(--pretty-black);
}

h1, h2, h3, h4 {
  color: var(--pretty-black);
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
  font-family: 'Inter', sans-serif;
  background-color: transparent;
  border: 0;
  border-radius: 5px;
  cursor: pointer;
}

.input {
  border-radius: 5px;
}

label {
  position: relative;
}

.error-message {
  position: absolute;
  font-size: 12px;
  color: var(--red);
  opacity: 0.8;
}

.btn-green {
  color: #fff;
  background-color: var(--green);
  transition: 0.4s background-color;
}

.btn-green:hover {
  background-color: var(--light-green);
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