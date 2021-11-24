<template>
  <n-button class="profile-btn" text style="font-size: 45px;">
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
  margin-right: 30px;
  transition: color .3s;
}

.profile-btn:hover {
  color: #4FC08D;
}
</style>