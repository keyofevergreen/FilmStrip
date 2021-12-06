<template>
  <div class="menu-line">
    <nav class="wrap menu-line__nav">
      <router-link :to='ref.value' v-for='ref in refs' :key='ref.value' tag="li">
        <button :value="ref.value" class="btn">
          {{ ref.label }}
        </button>
      </router-link>
    </nav>
  </div>
</template>

<script>
export default ({
  name: 'my-nav',
  data() {
    return {
      refs: [
        {
          value: "/online-cinema",
          label: "Онлайн-кинотеатр",
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
    }
  }
})
</script>

<style scoped>
.menu-line {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 57px;
  font-size: 20px;
  background-color: var(--light-gray);
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.15);
}

.menu-line__nav {
  display: flex;
  justify-content: center;
  align-items: center;
}

.menu-line__nav button {
  width: auto;
  height: 50px;
  padding-left: 32px;
  padding-right: 32px;
  color: var(--dark-gray);
  transition: transform .5s;
}

.menu-line__nav button:hover {
  transform: scale(1.1)
}

.menu-line__nav .router-link-active:hover,
.menu-line__nav .router-link-active button,
.menu-line__nav .router-link-exact-active button{
 color: var(--green);
}

@media (max-width: 736px) {
  .menu-line__nav button {
    font-size: 18px;
    padding-left: 15px;
    padding-right: 15px;
  }
}

@media (max-width: 487px) {
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