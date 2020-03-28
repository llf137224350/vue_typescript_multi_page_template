<template>
  <div :class="$style.demo">
    <button @click="toastSucceedHandle">成功提示</button>
    <button @click="toastFailedHandle">失败提示</button>
    <button @click="toastHandle">普通提示</button>
    <button @click="showIndicatorHandle">显示指示器</button>
    <button @click="showActionSheetHandle">显示层叠菜单</button>
  </div>
</template>

<script src="./demo.js"></script>
<style lang="stylus" src="./demo.styl" module></style>
