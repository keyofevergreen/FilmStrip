<template>
  <header class="cinema-header">
    <div class="logo-line-wrap">
      <div class="wrap logo-line">
        <router-link to="/">
          <svg xmlns="http://www.w3.org/2000/svg" class="logo-line__logo">
            <use :href='`${logo}#fillStrip-logo`'></use>
          </svg>
        </router-link>
        <ProfileDropdown/>
      </div>
    </div>
    <div class="menu-line">
      <nav class="wrap menu-line__nav">
        <router-link :to='ref.value' v-for='ref in refs' :key='ref.value' tag="li">
          <button :value="ref.value" class="btn">
            {{ ref.label }}
          </button>
        </router-link>
      </nav>
    </div>
  </header>
</template>

<script>
import logo from '../assets/logo.svg';
import ProfileDropdown from './ProfileDropdown';

export default {
  name: 'my-header',
  components: { ProfileDropdown },
  data() {
    return {
      logo,
      refs: [
        {
          value: '/online-cinema',
          label: 'Онлайн-кинотеатр',
        },
        {
          value: '/films',
          label: 'Фильмы'
        },
        {
          value: '/cinema-rent',
          label: 'Аренда кинозала'
        }
      ]
    };
  }
};
</script>

<style scoped>
.cinema-header {
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  z-index: 980;
  display: flex;
  flex-direction: column;
  background-color: #fff;
}


.logo-line-wrap {
  z-index: 100;
  width: 100%;
  height: 68px;
  box-shadow: 0 4px 8px 0 rgb(0 0 0 / 6%);
}

.logo-line__logo {
  width: 236px;
  height: 68px;
}

.logo-line {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.logo-line a {
  max-height: 68px;
}

.menu-line {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 57px;
  font-size: 20px;
  background-color: var(--light-grey);
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.15);
}

.menu-line__nav {
  display: flex;
  align-items: center;
  justify-content: center;
}

.menu-line__nav button {
  width: auto;
  height: 50px;
  padding-right: 32px;
  padding-left: 32px;
  color: var(--dark-grey);
  transition: transform .5s;
}

.menu-line__nav button:hover {
  transform: scale(1.1)
}

.menu-line__nav .router-link-active:hover,
.menu-line__nav .router-link-active button,
.menu-line__nav .router-link-exact-active button {
  color: var(--green);
}

@media (max-width: 736px) {
  .menu-line__nav li {
    padding-right: 32px;
    padding-left: 15px;
  }

  .menu-line__nav button {
    padding-right: 15px;
    padding-left: 15px;
    font-size: 18px;
  }
}


@media (max-width: 487px) {
  .logo-line-wrap {
    height: 58px;
  }

  .logo-line a {
    max-height: 58px;
  }

  .logo-line {
    height: 58px;
  }

  .logo-line__logo {
    width: 200px;
    height: 58px;
  }

  .menu-line {
    height: 110px;
  }

  .menu-line__nav {
    flex-direction: column;
  }

  .menu-line__nav a {
    width: 100%;
  }

  .menu-line__nav button {
    width: 100%;
    height: 36px;
  }
}
</style>