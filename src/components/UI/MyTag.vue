<template>
  <a-popover v-if="popover">
    <template #content>
      <div class="popover-description">
        <slot></slot>
      </div>
    </template>
    <div
        class="tag"
        :class="
        `${isAnimated ? 'animated' : ''}
         ${type ? type : ''}`">
      {{ text }}
    </div>
  </a-popover>
  <div
      v-else
      class="tag"
      :class="`${type ? type : ''}`">
    {{ text }}
  </div>
</template>

<script>
export default {
  name: 'MyTag',
  props: {
    text: {
      type: [String, Number],
      required: true
    },
    type: {
      type: String,
      required: true
    },
    isAnimated: {
      type: Boolean
    },
    popover: {
      type: Boolean
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

.popover-description {
  max-width: 400px;
}

.animated {
  -moz-animation: cycle 4s linear 3;
  -webkit-animation: cycle 4s linear 3;
}

@-moz-keyframes cycle {
  35% {transform: rotate(0) translate(0, 0);}
  40% {transform: rotate(5deg) translate(0, -2px);}
  45% {transform: rotate(-3deg) translate(0, -2px);}
  50% {transform: rotate(5deg) translate(0, -2px);}
  55% {transform: rotate(-3deg) translate(0, -2px);}
  60% {transform: rotate(5deg) translate(0, -2px);}
  65% {transform: rotate(-3deg) translate(0, -2px);}
  70% {transform: rotate(0) translate(0, 0);}
}

@-webkit-keyframes cycle {
  35% {transform: rotate(0) translate(0, 0);}
  40% {transform: rotate(5deg) translate(0, -2px);}
  45% {transform: rotate(-3deg) translate(0, -2px);}
  50% {transform: rotate(5deg) translate(0, -2px);}
  55% {transform: rotate(-3deg) translate(0, -2px);}
  60% {transform: rotate(5deg) translate(0, -2px);}
  65% {transform: rotate(-3deg) translate(0, -2px);}
  70% {transform: rotate(0) translate(0, 0);}
}
</style>