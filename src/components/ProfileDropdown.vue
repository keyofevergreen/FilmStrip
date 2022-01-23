<template>
  <a-dropdown v-if="authAccount" :trigger="['click']" placement='bottomRight'>
    <n-button class="profile-btn profile-btn-after-auth" text>
      <!--      UI from Naive library-->
      <n-icon>
        <profile-icon/>
      </n-icon>
    </n-button>
    <template #overlay>
      <a-menu class="dropdown-menu" style="max-width: 250px">
        <div class="menu-item-wrap dropdown-menu__header">
          {{ authAccount.mail }}
        </div>
        <a-menu-divider/>
        <router-link :to='ref.value' v-for='ref in refs' :key='ref.value' tag="li">
          <a-menu-item :key="ref.value">
            {{ ref.label }}
          </a-menu-item>
        </router-link>
        <a-menu-divider/>
        <button :key="refs.length" class="menu-item-wrap btn btn-logout" @click="logout">
          Выход
        </button>
      </a-menu>
    </template>
  </a-dropdown>
  <button v-else class="btn btn-green profile-btn profile-btn-before-auth" @click="setModalVisible(true)">Вход</button>
  <auth-modal></auth-modal>
</template>

<script>
import { UserCircle as ProfileIcon } from '@vicons/fa';
import { mapMutations, mapState } from 'vuex';
import AuthModal from './AuthModal/AuthModal';

export default {
  name: 'ProfileDropdown',
  components: {
    ProfileIcon,
    AuthModal
  },
  data() {
    return {
      isModalVisible: false,
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
      authAccount: state => state.auth.authAccount
    })
  },
  methods: {
    ...mapMutations({
      setAuthModalVisible: 'setAuthModalVisible',
      clearAuthAccount: 'clearAuthAccount'
    }),
    hide() {
      this.isModalVisible = false;
    },
    setModalVisible(bool) {
      this.setAuthModalVisible(bool);
    },
    logout() {
      this.clearAuthAccount();
      delete localStorage.authUser;
    }
  }
};
</script>

<style scoped>

.dropdown-menu__header {
  padding-right: 5px;
  overflow: hidden;
  color: var(--grey);
  text-overflow: ellipsis;
}

.menu-item-wrap {
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
}

.profile-btn-after-auth {
  font-size: 45px;
}

.btn-logout {
  width: 100%;
  color: var(--red);
  font-size: 14px;
  text-align: left;
  border-radius: 0;
  opacity: 0.8;
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
    margin-right: 20px;
    font-size: 35px;
  }
}
</style>