<template>
  <div class='login'>

    <van-nav-bar
      :title='`京东注册`'
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
      </div>
      <!-- 再次输入密码框 -->
      <div>
        <input
          type='password'
          placeholder='请确认密码'
          v-model.trim='password2'
        />
      </div>

      <span
        class='button'
        @click='submit'
      >注册</span>
    </div>

    <span
      class='tip'
      @click='$router.replace("/login")'>
      已有账号，立即登录
    </span>
  </div>
</template>

<script>
import { fetchRegist } from '@/utils/api'
export default {
  data () {
    return {
      uClear: false,
      username: '',
      password: '',
      password2: ''
    }
  },
  mounted () {
    console.log('--$route', this.$route)
  },
  methods: {
    submit () {
      // 提交注册接口
      const data = {
        username: this.username,
        password: this.password,
        password2: this.password2
      }
      // 需求：用户要求以字母开头，并且长度是5-10位
      if (!/^[a-zA-Z][a-zA-Z0-9]{5,9}$/.test(data.username)) {
        return this.$toast.fail('用户名不合规范')
      }
      if (data.password !== data.password2) {
        // 在组件中，使用this.$toast访问
        return this.$toast.fail('两次密码不相同')
      }
      fetchRegist(data).then(res=>{
        // console.log('---注册', res)
        if (res) {
          this.$router.replace('/login')
        }
      })
    }
  }
}
</script>

<style lang='scss' scoped>

</style>

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
