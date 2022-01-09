<template>
  <a-dropdown v-if="isAuth" :trigger="['click']" placement='bottomRight' :overlayClassName="isMobile ? 'mobile' : ''">
    <n-button class="profile-btn profile-btn-after-auth" @click="e => e.preventDefault()" text>
      <n-icon>
        <profile-icon/>
      </n-icon>
    </n-button>
    <template #overlay>
      <a-menu class="dropdown-menu">
        <div class="menu-wrap">
          Тестовый аккаунт
        </div>
        <a-menu-divider/>
        <a-menu-item key="0">
          Личные данные
        </a-menu-item>
        <a-menu-item key="1">
          История
        </a-menu-item>
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
  name: 'PersonalAccount',
  components: {
    ProfileIcon,
    LoginModal
  },
  data() {
    return {
      visible: false,
      widthDevice: 0
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

.menu-wrap {
  padding: 5px 12px;
  color: var(--grey);
}

.profile-btn {
  margin-right: 30px;
  transition: color .3s;
}

.profile-btn-before-auth {
  width: 150px;
  height: 38px;
  color: #fff;
  background-color: var(--green);
  border-radius: 10px;
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
  color: var(--grey);
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