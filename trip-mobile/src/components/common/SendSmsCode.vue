<template>
  <!-- 短信验证码发送相关的逻辑 -->
  <van-button
  size="small"
  type="primary"
  @click.prevent="sendSmsCode()"
  :disabled="isSmsSend"
  >{{ sendBtnText }}</van-button>
</template>
<script>
import { ajax } from '@/utils/ajax'
import { SystemApis } from '@/utils/apis'
export default {
  props: ['phoneNum'],
  data () {
    return {
      // 是否已经发送了短信验证码
      isSmsSend: false,
      sendBtnText: '点击发送验证码',
      timer: null,
      counter: 5
    }
  },
  methods: {
    reset () {
      this.isSmsSend = false
      this.sendBtnText = '点击发送验证码'
      if (this.timer) {
        clearInterval(this.timer)
        this.counter = 5
        this.timer = null
      }
    },
    /**
      * 倒计时
      */
    countDown () {
      this.timer = setInterval(() => {
        this.sendBtnText = `(${this.counter}秒)后重新发送`
        this.counter--
        if (this.counter < 0) {
          this.reset()
        }
      }, 1000)
    },
    // 发送短信验证码
    sendSmsCode () {
      // 判断手机号是否已经输入
      if (!this.phoneNum) {
        this.$notify('请先输入手机号')
        return false
      }
      // TODO 调用接口，发送短信验证码
      ajax.post(SystemApis.sendSmsCodeUrl, {
        phone_num: this.phoneNum
      }).then(({ data }) => {
        // 提示用户验证码已经发送
        this.$notify({
          message: `验证码为：${data.sms_code}, ${data.time_out / 60}分钟内有效 `,
          duration: 1000 * 10,
          type: 'success'
        })
        this.isSmsSend = true
        // 开启倒计时，60s后可以再次发送
        this.countDown()
      }).catch(err => {
        // 如果产生异常，提示用户重新操作
        this.isSmsSend = false
        this.sendBtnText = '点击发送验证码'
        console.log(err)
      })
    }
  }
}
</script>
