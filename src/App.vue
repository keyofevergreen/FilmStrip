<template>
  <my-header></my-header>
  <router-view>
  </router-view>
</template>

<script>
import MyHeader from "./components/MyHeader";

export default {
  name: "App",
  components: { MyHeader },
  methods: {},
}
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Inter&family=Montserrat&display=swap');

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
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
}

.btn {
  font-size: 20px;
  font-family: 'Inter', sans-serif;
  background-color: transparent;
  border: 0;
}

@media (max-width: 487px) {
  .content {
    margin-top: 188px;
  }
}
</style>