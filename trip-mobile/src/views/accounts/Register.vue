<template>
  <!-- 用户注册 -->
  <div class="page-account-register">
    <!-- 导航条 -->
    <van-nav-bar
      title="用户注册"
      left-text="返回"
      left-arrow
      @click-left="goBack"
    />
    <!-- 表单输入 -->
    <van-form @submit="onSubmit">
      <van-field
        v-model="form.username"
        label="手机号码"
        placeholder="手机号码"
        type="tel"
        maxlength="11"
        clearable
        :rules="ruleName"
        @input="onPhoneChange"
      />
      <van-field
        v-model="form.sms_code"
        center
        clearable
        label="短信验证码"
        placeholder="短信验证码"
        :rules="[{ required: true, message: '请输入短信验证码' }]"
      >
        <template #button>
          <SendSmsCode  ref="refSms" :phoneNum="form.username"/>
        </template>
      </van-field>
      <van-field
        v-model="form.nickname"
        label="用户昵称"
        placeholder="用户昵称"
        maxlength="32"
        clearable
        :rules="[{ required: true, message: '请输入用户昵称' }]"
      />
      <van-field
        v-model="form.password"
        type="password"
        label="密码"
        placeholder="密码"
        :rules="[{ required: true, message: '请填写密码' }]"
      />
      <van-field
        v-model="form.passwordRepeat"
        type="password"
        label="确认密码"
        placeholder="确认密码"
        :rules="rulePassword"
      />
      <div style="margin: 16px">
        <van-button round block type="info" native-type="submit"
          >提交</van-button
        >
      </div>
    </van-form>
    <!-- //表单输入 -->
    <!-- 文字提示 -->
    <div class="tips">
      注册表示同意 <a href="#">用户使用协议</a>及<a href="#">隐私政策</a>
    </div>
    <div class="tips">
      已有账号 <router-link :to="{ name: 'AccountLogin'}">点击登录</router-link>
    </div>
    <!-- 版权信息 -->
    <Copyright />
  </div>
</template>

<script>
import * as types from '@/store/mutation-types'
import { ajax } from '@/utils/ajax'
import { AccountsApis } from '@/utils/apis'
import Copyright from '@/components/common/Copyright.vue'
import SendSmsCode from '@/components/common/SendSmsCode.vue'
export default {
  components: {
    Copyright,
    SendSmsCode
  },
  data () {
    return {
      // 用户名的验证规则
      ruleName: [
        {
          required: true,
          message: '请填写用户名'
        },
        {
          pattern: /1\d{10}/,
          message: '请填写正确的手机号码'
        }],
      // 重复密码验证
      rulePassword: [
        {
          required: true,
          message: '请重复一次密码'
        }, {
          validator: () => this.form.password === this.form.passwordRepeat,
          message: '两次输入的密码不一致'
        }],
      form: {
        username: '',
        nickname: '',
        sms_code: '',
        password: '',
        passwordRepeat: ''
      }
    }
  },
  methods: {
    /**
     * 手机号发生变化时，重置验证码组件状态
     */
    onPhoneChange () {
      this.$refs.refSms.reset()
    },
    /**
     * 提交表单
     */
    onSubmit () {
      // 1.调用接口
      ajax.post(AccountsApis.registerUrl, {
        username: this.form.username,
        password: this.form.passwordRepeat,
        sms_code: this.form.sms_code,
        nickname: this.form.nickname
      }).then(({ data }) => {
        // 2.成功返回结果，用户信息写入vuex
        this.$store.commit(types.UPDATE_USER_INFO, data)
        // 3.提示用户
        this.$notify({
          message: '注册成功',
          type: 'success'
        })
        // 4.跳转到个人中心页面
        this.$router.replace({name: 'Mine'})
      })
    },
    goBack () {
      this.$router.go(-1)
    }
  }
}
</script>
