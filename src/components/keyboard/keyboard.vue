<template>
  <transition
    enter-active-class="animated slideInUp"
    leave-active-class="animated slideOutDown"
    @after-leave="afterLeave"
  >
    <div :class="$style.keyboard" v-if="myShow">
        <span v-for="(item,i) in currentDatas"
              :key="i"
              class="iconfont"
              :class="{[$style.disabled]: index === 1 && i <= 9, [$style.last]: i === 36, [$style.del]: item === 'del',[$style.half]: item === 'b', [$style.empty]: item === '', [$style.ok]:item === '完成' }"
              @click="clickKeyboard(i)"
        >{{item === 'del' || item === 'b' ? '' : item}}
        </span>
    </div>
  </transition>
</template>
<script lang="ts" src="./keyboard.ts"></script>
<style lang="stylus" src="./keyboard.styl" module></style>
