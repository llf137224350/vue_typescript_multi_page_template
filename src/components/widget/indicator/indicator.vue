<template>
  <div class="indicator">
    <transition
      enter-active-class="animated fadeIn"
      leave-active-class="animated fadeOut"
      @after-leave="afterLeave"
    >
      <div v-show="visible">
        <div class="indicator-mask" @click.stop.prevent="onClickMaskHandle"></div>
        <div class="indication-content">
          <div>
            <img src="./loading.gif"/>
            <div>{{showText}}</div>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>
<script>
  export default {
    name: 'indicator',
    props: {
      text: {
        type: String,
        default: '加载中...'
      }
    },
    data () {
      return {
        showText: this.text,
        visible: false
      };
    },
    methods: {
      onClickMaskHandle () {
      },
      afterLeave () {
        this.$emit('hide');
      }
    }
  };
</script>
<style lang="stylus" scoped>
  @import "indicator.styl";
</style>
