<template>
  <span class="tag" :class="type ? type : ''">
    {{ text }}
  </span>
</template>

<script>
export default {
  name: 'MyTag',
  props: {
    text: {
      type: [String, Number]
    },
    type: {
      type: String
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

.green {
  color: #fff;
  background-color: var(--green);
}

.dotted {
  border: 1px dashed var(--pretty-black);
}
</style>