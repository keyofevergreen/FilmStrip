<template>
  <n-button class="profile-btn" text>
      <n-icon>
        <profile-icon/>
      </n-icon>
  </n-button>
</template>

<script>
import { UserCircle as ProfileIcon } from '@vicons/fa'

export default {
  name: "PersonalAccount",
  components: {
    ProfileIcon
  },
}
</script>

<style scoped>
.profile-btn {
  font-size: 45px;
  margin-right: 30px;
  transition: color .3s;
}

@media (max-width: 487px) {
  .profile-btn {
    font-size: 35px;
    margin-right: 20px;
  }
}
</style>