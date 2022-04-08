<template>
  <!-- 用户登陆 -->
  <div class="page-account-login">
    <!-- 导航条 -->
    <van-nav-bar title="用户登录"
      left-text="返回"
      left-arrow
      @click-left="goBack"/>
    <!-- 表单输入 -->
    <van-form @submit="onSubmit">
      <van-field
        v-model="username"
        label="用户名"
        placeholder="用户名"
        type="tel"
        maxlength="11"
        clearable
        :rules="ruleName"
      />
      <van-field
        v-model="password"
        type="password"
        name="密码"
        label="密码"
        placeholder="密码"
        :rules="[{ required: true, message: '请填写密码' }]"
      />
      <div style="margin: 16px;">
        <van-button round block type="info" native-type="submit">提交</van-button>
      </div>
    </van-form>
    <!-- //表单输入 -->
    <!-- 文字提示 -->
    <div class="tips">
      登陆表示同意 <a href="#">用户使用协议</a>及<a href="#">隐私政策</a>
    </div>
    <div class="tips">
      没有账号？ <router-link :to="{ name: 'AccountRegister'}">立即注册</router-link>
    </div>
    <!-- 版权信息 -->
    <Copyright/>
  </div>
</template>

<script>
import * as types from '@/store/mutation-types'
import Copyright from '@/components/common/Copyright.vue'
import { AccountsApis } from '@/utils/apis'
import { ajax } from '@/utils/ajax'
export default {
  components: {
    Copyright
  },
  data () {
    return {
      // 用户名的验证规则
      ruleName: [{
        required: true,
        message: '请填写用户名'
      }, {
        pattern: /1\d{10}/,
        message: '请填写用户名'
      }],
      username: '',
      password: ''
    }
  },
  methods: {
    onSubmit () {
      // 1.调用接口
      ajax.post(AccountsApis.loginUrl, {
        username: this.username,
        password: this.password
      }).then(({ data }) => {
        // 2.拿到用户信息，存储到vuex
        this.$store.commit(types.UPDATE_USER_INFO, data)
        this.$toast('登录成功')
        this.$router.replace({name: 'Mine'})
      }).catch(({ response: { data } }) => {
        console.log(data)
        this.$toast(`${data.error_code}, ${data.error_msg}`)
      })
    },
    goBack () {
      this.$router.go(-1)
    }
  }
}
</script>
