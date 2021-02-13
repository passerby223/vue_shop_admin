<template>
  <div class="login_container">
    <div class="login_box">
      <!--      头像区域-->
      <div class="avatar_box">
        <img src="../assets/logo.png" alt="登录logo">
      </div>
      <!--      登录表单区域-->
      <el-form :model="loginForm" :rules="loginFormRules" ref="loginFromRef" label-width="0px" class="login_form">
        <!--        用户名-->
        <el-form-item prop="username">
          <el-input v-model="loginForm.username" prefix-icon="iconfont icon-user"></el-input>
        </el-form-item>
        <!--        密码-->
        <el-form-item prop="password">
          <el-input v-model="loginForm.password" prefix-icon="iconfont icon-3702mima" type="password"></el-input>
        </el-form-item>
        <!--        登录/重置按钮-->
        <el-form-item class="btns">
          <el-button type="primary" @click="login">登录</el-button>
          <el-button type="info" @click="resetLoginForm">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>

export default {
  data () {
    return {
      // 登录表单的数据绑定对象
      loginForm: {
        username: 'admin',
        password: '123456'
      },
      // 登录表单的验证对象
      loginFormRules: {
        // 验证用户名是否合法
        username: [
          {
            required: true,
            message: '请输入用户名!',
            trigger: 'blur'
          },
          {
            min: 3,
            max: 10,
            message: '长度在3到10个字符!',
            trigger: 'blur'
          }
        ],
        // 验证密码是否合法
        password: [
          {
            required: true,
            message: '请输入密码!',
            trigger: 'blur'
          },
          {
            min: 6,
            max: 15,
            message: '长度在6到15个字符!',
            trigger: 'blur'
          }
        ]
      }
    }
  },
  methods: {
    // 重置表单数据
    resetLoginForm () {
      // console.log(this)
      this.$refs.loginFromRef.resetFields()
    },
    // 登录按钮提交时的预验证
    login () {
      // 当前方法内如果不使用async和await的话，请求返回的是一个promise对象。如果使用了就会直接返回具体的接口请求的响应对象
      this.$refs.loginFromRef.validate(async valid => {
        // console.log(valid)
        if (!valid) return
        // { data: res }：解构赋值并重命名为res
        const { data: res } = await this.$http.post('/login', this.loginForm)
        // console.log(res)
        if (res.meta.status !== 200) return this.$message.error('登录失败!')
        this.$message.success('登录成功!')
        /**
         1. 将登陆成功后的token，保存到客户端的sessionStorage中
         1.1 项目中除了登录的其他API接口，必须在登录之后才能访问。
         1.2 token只能在当前网页打开期间，所以将token保存在sessionStorage中
         */
        window.sessionStorage.setItem('token', res.data.token)
        /**
         * 通过编程式导航跳转到后台主页，路由地址是/home
         */
        await this.$router.push('/home')
      })
    }
  }
}
</script>

<style lang="less" scoped>
.login_container {
  background-color: #2b4b6b;
  height: 100%;
}

.login_box {
  width: 450px;
  height: 300px;
  background-color: #fff;
  border-radius: 3px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  .avatar_box {
    height: 130px;
    width: 130px;
    border: 1px solid #eee;
    border-radius: 50%;
    padding: 10px;
    box-shadow: 0 0 10px #ddd;
    position: absolute;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: #fff;

    img {
      width: 100%;
      height: 100%;
      border-radius: 50%;
      background-color: #eee;
    }
  }
}

.btns {
  display: flex;
  justify-content: flex-end;
}

.login_form {
  position: absolute;
  bottom: 0;
  width: 100%;
  padding: 0 20px;
  box-sizing: border-box;
}
</style>
