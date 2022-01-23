<template>
<div>
  <h1 class="page-header">Личный кабинет</h1>
  <div class="profile">
    <div class="avatar-wrap">
      <svg xmlns="http://www.w3.org/2000/svg" class="profile__avatar">
        <use :href='`${avatar}#avatar`'></use>
      </svg>
    </div>
    <div class="profile__info">
      <div>
        <h2 class="profile__info-header">Ваша почта</h2>
        <p class="profile__info-description">{{authAccount.mail}}</p>
      </div>
      <div>
        <h2 class="profile__info-header">Ваш номер телефона</h2>
        <p class="profile__info-description">{{authAccount.phoneNumber}}</p>
      </div>
    </div>
    <div class="btn-link-wrap">
      <router-link to='/profile/history' tag="li">
        <a-button type="primary">Перейти к истории билетов</a-button>
      </router-link>
    </div>
  </div>
</div>
</template>

<script>
import avatar from '../../assets/avatar.svg';
import { mapState } from 'vuex';

export default {
  name: 'ProfilePage',
  data() {
    return {
     avatar
    }
  },
  computed: {
    ...mapState({
      authAccount: state => state.auth.authAccount,

    })
  },
  watch: {
    authAccount(newValue) {
      if(newValue === null) {
        this.$router.push('/')
      }
    }
  }
};
</script>

<style scoped>

.profile {
  display: grid;
  grid-template-areas:
  'avatar info'
  'avatar info'
  'avatar info'
  'avatar btn';
  gap: 10px;
  max-width: 700px;
  margin: 0 auto;
  padding-bottom: 20px;
}

.avatar-wrap {
  display: flex;
  grid-area: avatar;
  align-items: center;
  justify-content: center;
  width: 250px;
  height: 250px;
  margin: 0 auto;
  border: 1px solid var(--light-grey);
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.06);
}

.profile__info {
  display: flex;
  flex-direction: column;
  grid-area: info;
}

.btn-link-wrap {
  grid-area: btn;
}

.profile__info-header {
  color: var(--green);
  font-size: 25px;
}

.profile__info-description {
  font-size: 20px;
}

@media(max-width: 575px) {
  .profile {
    grid-template-areas:
  'avatar'
  'info'
  'btn'
  }

  .profile__info {
    margin: 0 auto;
  }

  .profile__info-header {
    text-align: center;
  }

  .profile__info-description {
    text-align: center;
  }

  .btn-link-wrap {
    margin: 0 auto;
  }
}

</style>