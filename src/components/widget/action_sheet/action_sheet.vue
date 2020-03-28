<template>
  <div class="action-sheet">
    <transition
      enter-active-class="animated fadeIn"
      leave-active-class="animated fadeOut"
    >
      <div class="action-sheet-mask" v-show="visible"></div>
    </transition>
    <transition
      enter-active-class="animated slideInUp"
      leave-active-class="animated slideOutDown"
      @after-leave="afterLeave"
    >
      <div class="action-sheet-wrapper" v-show="visible">
        <div class="title" v-if="title">
          <span>{{title}}</span>
        </div>
        <div class="item " :style="item.style" :class="{last: items.length - 1 === index}"
             v-for="(item, index) in items"
             :key="item.text"
             @click.stop="onItemClickHandle(index)"
        >
          <span>{{item.text}}</span>
        </div>
        <div class="cancel" @click.stop="onCancelHandle">
          <span>取消</span>
        </div>
      </div>
    </transition>
  </div>
</template>
<script>
  export default {
    name: 'actionSheet',
    props: {
      title: {
        type: String,
        default: ''
      },
      items: {
        type: Array,
        default () {
          return [];
        }
      }
    },
    data () {
      return {
        visible: false
      };
    },
    methods: {
      onItemClickHandle (index) {
        this.$emit('onItemClickHandle', index);
      },
      onCancelHandle () {
        this.$emit('onCancelHandle');
      },
      afterLeave () {
        this.$emit('hide');
      }
    }
  };
</script>
<style lang="stylus" scoped>
  @import "action_sheet.styl";
</style>
