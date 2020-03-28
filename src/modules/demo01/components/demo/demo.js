export default {
  name: 'demo',
  components: {},
  methods: {
    toastSucceedHandle () {
      this.$toast({
        icon: 'succeed',
        text: '添加成功'
      });
    },
    toastFailedHandle () {
      this.$toast({
        icon: 'failed',
        text: '添加失败'
      });
    },
    toastHandle () {
      this.$toast({
        text: '添加成功'
      });
    },
    showIndicatorHandle () {
      const indicator = this.$indicator({
        text: '请求中...'
      });
      indicator.show();
      setTimeout(() => {
        indicator.hide();
      }, 3000);
    },
    showActionSheetHandle () {
      const actionSheet = this.$actionSheet({
        title: '确定删除吗？',
        items: [
          {
            text: '删除',
            style: {
              color: 'red'
            }
          }
        ]
      });
      actionSheet.show();
      actionSheet.$on('onItemClickHandle', (index) => {
        actionSheet.hide();
        console.log(index);
      });
    }
  }
};
