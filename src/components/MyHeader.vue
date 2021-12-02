<template>
  <header class="cinema-header">
    <div class="logo-line">
      <div class="wrap space-between">
        <router-link to="/">
          <svg xmlns="http://www.w3.org/2000/svg" class="logo-line__logo">
            <use :href='href'></use>
          </svg>
        </router-link>
        <Profile/>
      </div>
    </div>
    <my-nav></my-nav>
  </header>
</template>

<script>
import logo from "../assets/logo.svg";
import Profile from "./Profile";
import MyNav from "./MyNav";

export default {
  name: "my-header",
  components: { Profile, MyNav },
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

.space-between {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

@media (max-width: 736px) {
  .menu-line__nav li {
    padding-left: 15px;
    padding-right: 15px;
  }
}

@media (max-width: 487px) {
  .logo-line {
    height: 58px;
  }

  .logo-line__logo {
    height: 58px;
    width: 200px;
  }
}
</style>