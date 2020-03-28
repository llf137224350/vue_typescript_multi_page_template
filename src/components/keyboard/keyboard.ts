import {Vue, Watch, Prop, Component} from 'vue-property-decorator';

@Component({
  name: 'keyboard'
})
export default class Keyboard extends Vue {
  // props
  @Prop({type: Number, default: -1})
  private index: any;
  @Prop({type: Boolean, default: false})
  private show: any;
  @Prop(
    {
      type: Array, default() {
        return [];
      }
    })
  private carNo: any;

  // data
  private provinces: string[] = [];
  private letters: string[] = [];
  private currentDatas: string[] = [];
  private myCarNo = this.carNo;
  private myShow = this.show;
  private myIndex = this.index;

  // watch
  @Watch('show')
  showChanged(val: boolean): void {
    this.myShow = val;
  }

  @Watch('carNo')
  carNoChanged(val: string[]): void {
    if (val && val.length !== 0) {
      if (val.length === 7) {
        val.push('');
      }
      this.myCarNo = [...val];
    }
  }

  @Watch('index')
  indexChanged(val: number): void {
    this.myIndex = val;
    if (this.provinces.length === 0) {
      this.provinces = '京津沪渝苏浙豫粤川陕冀辽吉皖闽鄂湘鲁晋黑赣贵甘桂琼云青蒙藏宁新'.split('');
      this.letters = '0123456789ABCDEFGHJKLMNOPQRSTUVWXYZ警'.split('');
    }
    const datas = [];
    for (let i = 0; i < 37; i++) {
      if (val === 0) {
        if (this.provinces[i] !== undefined) {
          datas.push(this.provinces[i]);
        } else {
          datas.push('');
        }
      } else {
        if (this.letters[i] !== undefined) {
          datas.push(this.letters[i]);
        } else {
          datas.push('');
        }
      }
    }
    // datas.push('b');
    datas.push('del');
    datas.push('完成');
    this.currentDatas = datas;
  }

  // methods
  private afterLeave(): void {
    this.$emit('valueChange', {
        carNo: this.carNo,
        index: this.myIndex,
        show: false
      }
    );
  }

  private clickKeyboard(index: number): void {
    if (this.myIndex === 1 && index <= 9) {
      return;
    }
    if (this.currentDatas[index] === '完成') {
      this.myShow = false;
      return;
    }
    if (this.currentDatas[index] === 'b' || !this.currentDatas[index]) {
      return;
    } else if (this.currentDatas[index] === 'del') {
      this.myCarNo[this.myIndex] = '';
      this.myIndex -= 1;
      if (this.myIndex === -1) {
        this.myIndex = 0;
      }
    } else {
      this.myCarNo[this.myIndex] = this.currentDatas[index];
      this.myIndex += 1;
    }
    this.$emit('valueChange', {
      carNo: this.myCarNo,
      index: this.myIndex,
      show: true
    });
    if (this.myIndex === this.myCarNo.length) {
      this.myShow = false;
    }
  }
}
