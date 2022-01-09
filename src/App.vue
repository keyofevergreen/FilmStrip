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