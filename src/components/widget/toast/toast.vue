<template>
  <div class="m-toast">
    <transition
      @after-leave="afterLeave"
      @after-enter="afterEnter"
      enter-active-class="animated fadeIn"
      leave-active-class="animated fadeOut"
    >
      <template v-if="icon">
        <div class="m-icon-content" v-show="visible">
          <div>
            <img :src="iconUrl"/>
            <div>{{text}}</div>
          </div>
        </div>
      </template>
      <template v-else>
        <div class="m-content" v-show="visible">
          <span>{{text}}</span>
        </div>
      </template>
    </transition>
  </div>
</template>
<script>
  const SUCCEED = 'data:image/png;base64,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';
  const FAILED = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAIAAAACACAMAAAD04JH5AAAAkFBMVEUAAADrTEzoTUz8TT/oTUvpTUvpTUvpTUv/AADwTUj/Q0PpTUzpTkzpTUvpTUvpTUzpTUvpTErsTUvpTUvpTUvpTUvpTEvuTErpTUvpTUvpTUvpTUvpTUvpTUvpTkvqTUvqTUvqTkrpTkvqTUrtS0voTUvpTUzpTUzrTEvpTkvpTUvpTUvqTEruTEnrTEjpTkxNcjLIAAAAL3RSTlMAQMAI9/x8ugEUBOna7rXP3jk006eXTx/Hoo5kWuTDgm07y0YO+ZuIPvKtcywcJuS464gAAAPaSURBVHjazdvZdptAEATQAoTYQUL7Zi3Wasep//+75CQPcdqWwjTDOPddOoXohtYMQCXZr5blfJRvijAsNvloXi5X+yOcCLx+lPFTWdT3AnQp9bb+iQ/1/K2XohOxNynYSDbxYti2n2Q0kE2GVg9+eqCx+RSWpOucKqN1Cgu8nGq5h7a+l2ylnKGN4zJkS6flUV97q4wWZCtlUyY+LfETKAwzWrOpYew1pEXhzvT0L2jZwqgQgpLWlYFB9z2xA0+NEyQjdqJK0MhswI7kb2ggGbAzg6RB/VXsUBXgH1KfnYpSPBS/sGPjGI/02bk+HvBCNnTwhYoNhXvclWRsqoYwZFNZcrcA5mxsCGHPxp7ulcGFze0hXNncFp+qacCD4NHAt09PwIgGniE808Ahxkc7tgowpYkVPkhuNDFtF6BIIC3oMgAXpm0srSGsKRi20cF1gINsorYBVjR0xXsRDa1aByjxzjcqA8gu1l6NxjS1ax9g/G4MDdsHeKWp8K3NGPLaKoAcTQb6D7c5iFzcBt0FkFPNkua2ELY0t8QvcWEjwIXmslgMUwYuEJZUGOpH8WWLALKSfCsBJlSI8FMQUmFiJUAvEMNcc2cIZ2p4snz1ARakspnm1FhAGFPjCUBIjbGdAGGMGVVeILxQ5Q2epQAlVTysqFJaCrDCxVKAiCoX7bmLIPhUFvMTVXwI6u+pqGxgYU6VA3KqzCEcqJJjQ5UKQkWVAQpLAUZUyRBSZQQhp0oPJ6rklgKcUGjPnTCgSqb94AbCRnsgI0sBMm0tzbU/nVBorycRVQoIN6pEWFDlBqFHlQX62v4VTlTpY02V0BOos0bNL1XjyC91FP3jWiaGOeci9UaZxS20K7/QVfw9dy1MxTzrmi+Wl5zbiu0mR+TOU3rjFylS/epK6P/tqc1C097C3TCgwlAMlO4CyMF2+zUB+mLDwnWAcCZWmFwHGOOPb84DyC300n2AEu9d3QeoxfqC6wA+/nZ1HaCGMHYbYAHprecywC3BB68uA7ziozR3FyBP8YlndwGGEMy3fU7e3541c4CUVnSiSnHH7EYHihnumtKBZzywZOcueCSNqGDzodLgQAWbj1cfR+xQdfz/H2wGZjk7ks/QSFKxE1WChgKfHYgCNJaOad04hYG4H9KqsO/2JRspG7p9zUiKEijEW2s/fwyduqIFVQ21dHdjS8UuRhvJgq0sErRVl1Qra9gwjKgS1bBlr4gQDWHT8FzQQHEewrZg+nJiI72XaYpOHKeTDf9hMJkG6NL3XdnjHb1y9x0OpLPrun+Ofr/+f/r1+n907q+vsxjmfgDMaWGjHB3nhwAAAABJRU5ErkJggg==';
  export default {
    name: 'toast',
    props: {
      icon: {
        type: String,
        default: ''
      },
      text: {
        type: String,
        default: '添加成功'
      },
      duration: {
        type: [Number, String],
        default: 1500
      }
    },
    data () {
      return {
        timer: undefined,
        visible: false
      };
    },
    computed: {
      iconUrl () {
        return this.icon === 'succeed' ? SUCCEED : FAILED;
      }
    },
    methods: {
      afterEnter () {
        this.createTimer();
      },
      createTimer () {
        this.timer = setTimeout(() => {
          this.visible = false;
        }, this.duration);
      },
      clearTimer () {
        if (this.timer) {
          clearTimeout(this.timer);
        }
      },
      afterLeave () {
        this.$emit('hide');
      }
    },
    beforeDestory () {
      this.clearTimer();
    }
  };
</script>
<style lang="stylus" scoped>
  @import "toast.styl";
</style>
