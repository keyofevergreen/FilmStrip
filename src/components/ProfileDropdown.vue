<template>
  <a-dropdown v-if="isAuth" :trigger="['click']" placement='bottomRight' :overlayClassName="isMobile ? 'mobile' : ''">
    <n-button class="profile-btn profile-btn-after-auth" @click="e => e.preventDefault()" text>
      <n-icon>
        <profile-icon/>
      </n-icon>
    </n-button>
    <template #overlay>
      <a-menu class="dropdown-menu">
        <div class="menu-wrap dropdown-menu__header">
          Тестовый аккаунт
        </div>
        <a-menu-divider/>
        <router-link :to='ref.value' v-for='ref in refs' :key='ref.value' tag="li">
          <a-menu-item :key="ref.value">
            {{ ref.label }}
          </a-menu-item>
        </router-link>
        <a-menu-divider/>
        <button key="3" class="menu-wrap btn btn-logout" @click="logout">
          Выход
        </button>
      </a-menu>
    </template>
  </a-dropdown>
  <button v-else class="btn profile-btn profile-btn-before-auth" @click="setModalVisible(true)">Вход</button>
  <login-modal></login-modal>
</template>

<script>
import { UserCircle as ProfileIcon } from '@vicons/fa';
import { mapMutations, mapState } from 'vuex';
import LoginModal from './LoginModal';

export default {
  name: 'ProfileDropdown',
  components: {
    ProfileIcon,
    LoginModal
  },
  data() {
    return {
      visible: false,
      refs: [
        {
          value: '/profile',
          label: 'Личный кабинет',
        },
        {
          value: '/profile/history',
          label: 'История'
        }
      ]
    };
  },
  computed: {
    ...mapState({
      isAuth: state => state.isAuth
    })
  },
  methods: {
    ...mapMutations({
      setLoginModalVisible: 'setLoginModalVisible',
      setAuth: 'setAuth'
    }),
    hide() {
      this.visible = false;
    },
    setModalVisible(bool) {
      this.setLoginModalVisible(bool);
    },
    logout() {
      this.setAuth(false);
    }
  }
};
</script>

<style scoped>
.dropdown-menu {
  margin-right: 30px;
  width: 200px;
}

.dropdown-menu__header {
  color: var(--grey);
}

.menu-wrap {
  padding: 5px 12px;;
}

.profile-btn {
  margin-right: 30px;
  transition: color .3s;
}

.profile-btn-before-auth {
  width: 160px;
  height: 38px;
  font-size: 20px;
  color: #fff;
  background-color: var(--green);
  border-radius: 5px;
  transition: background-color .4s;
}

.profile-btn-before-auth:hover {
  background-color: var(--light-green);
}

.profile-btn-after-auth {
  font-size: 45px;
}

.btn-logout {
  width: 100%;
  font-size: 14px;
  color: var(--red);
  opacity: 0.8;
  text-align: left;
  transition: background-color 0.3s;
}

.btn-logout:hover {
  background-color: #f5f5f5;
}

@media (max-width: 487px) {
  .profile-btn-before-auth {
    width: 120px;
    height: 35px;
  }

  .profile-btn-after-auth {
    font-size: 35px;
    margin-right: 20px;
  }
}
</style>