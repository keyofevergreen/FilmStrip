<template>
  <span class="tag">
    {{ text }}
  </span>
</template>

<script>
export default {
  name: 'MyOldRatingTag',
  props: {
    text: {
      type: String, Number
    }
  }
}
</script>

<style scoped>
.tag {
  height: 27px;
  padding: 0 10px;
  width: 60px;
  font-size: 17px;
  font-weight: 300;
  border-radius: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>