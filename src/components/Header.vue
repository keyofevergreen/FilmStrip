<template>
  <header class="cinema-header">
    <div class="logo-line">
      <div class="wrap space-between">
        <svg xmlns="http://www.w3.org/2000/svg" class="logo-line__logo">
          <use :href='href'></use>
        </svg>
        <Profile/>
      </div>
    </div>
    <div class="menu-line">
      <nav class="wrap">
        <ul class="menu-line__nav">
          <li>Онлайн-кинотеатр</li>
          <li>Фильмы</li>
          <li>Аренда кинозалов</li>
        </ul>
      </nav>
    </div>
  </header>
</template>

<script>
import logo from "../assets/logo.svg";
import Profile from "./Profile";

export default {
  name: "Header",
  components: { Profile },
  data() {
    return {
      href: `${logo}#fillStrip-logo`
    }
  }
}
</script>

<style scoped>
.cinema-header {
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  z-index: 200;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  background-color: #fff;
}


.logo-line {
  width: 100%;
  height: 68px;
  z-index: 100;
  box-shadow: 0 4px 8px 0 rgb(0 0 0 / 6%);
}
.logo-line__logo {
  height: 68px;
  width: 236px;
}

.menu-line {
  display: flex;
  justify-content: center;
  align-items: center;
  min-width: 700px;
  height: 57px;
  font-size: 20px;
  color: #4F5959;
  background-color: #F6F6F6;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.15);
}

.menu-line__nav {
  display: flex;
  justify-content: center;
  align-items: center;
  list-style: none;
}

.menu-line__nav li {
  margin-left: 32px;
  margin-right: 32px;
  text-align: center;
  transition: color .3s;
}

.menu-line__nav li:hover {
  color: #4FC08D;
}

.space-between {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>