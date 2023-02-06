<template>
  <div class='login'>

    <van-nav-bar
      title='京东登录'
      left-arrow
      @click-left='$router.back()'
    />

    <div class="form">
      <div>
        <input
          type="text"
          placeholder='用户名/手机/邮箱'
          @blur='uClear=false'
          @focus='uClear=true'
          v-model.trim='username'
        />
        <img
          class='clear'
          v-show='uClear'
          src="/icon/clear.png"
        />
      </div>
      <!-- 第一个密码框 -->
      <div>
        <input
          type='password'
          placeholder='请输入密码'
          v-model.trim='password'
        />
        <span class='forget'>忘记密码</span>
      </div>

      <span
        class='button'
        @click='submit'
      >登录</span>
    </div>

    <span
      class='tip'
      @click='$router.replace("/regist")'>
      没有账号？立即注册
    </span>

  </div>
</template>

<script>
import { fetchLogin } from '@/utils/api'
import { mapMutations } from 'vuex'
export default {
  data () {
    return {
      uClear: false,
      username: '',
      password: ''
    }
  },
  mounted () {
    console.log('--$route', this.$route)
  },
  methods: {
    ...mapMutations('user', ['setToken']),
    submit () {
      // 登录提交
      const data = {
        username: this.username,
        password: this.password
      }
      fetchLogin(data).then(res=>{
        console.log('---登录', res)
        if (res && res.token) {
          // 把token存储到本地（localStorage、cookie）
          localStorage.setItem('token', res.token)
          // [今天不做]用token调接口获取用户信息
          // 把token存储到状态管理中去
          this.setToken(res.token)
          // 如果登录成功，跳转到上一页
          this.$router.back()
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
  .form {
    &>div {
      height: 1.6rem;
      border-bottom: .03rem solid #eee;
      width: 9.33rem;
      margin: 0 auto;
      position: relative;
      &>input {
        border: none;
        font-size: .4rem;
        padding-left: .27rem;
      }
      .clear {
        position: absolute;
        top: .53rem;
        right: .13rem;
        width: .53rem;
        height: .53rem;
      }
      .forget {
        font-size: .37rem;
        color: #dddddd;
        position: absolute;
        top: .53rem;
        right: 0;
        line-height: .53rem;
        padding: 0 .4rem;
        border-left: .05rem solid #dddddd;
      }
    }
    .button {
      display: block;
      height: 1.33rem;
      width: 9.33rem;
      margin: auto;
      border-radius: .67rem;
      background-color: #f63515;
      color: white;
      text-align: center;
      line-height: 1.33rem;
      font-size: .43rem;
      margin-top: .53rem;
    }
  }
  .tip {
    display: block;
    font-size: .37rem;
    box-sizing: border-box;
    padding: .4rem .4rem;
  }
</style>
