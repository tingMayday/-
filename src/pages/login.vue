<template>
  <div class="login">
    <transition-group name="rotate">
      <div class="inner" v-if="type==='login'" :key="1">
        <div class="title">登 录</div>
        <el-form :model="form" ref="form" status-icon :rules="rules">
          <el-form-item label="账户">
            <el-input type="text" v-model="form.username" name="username" placeholder="请输入您的账户"></el-input>
          </el-form-item>
          <el-form-item label="密码">
            <el-input type="password" v-model="form.password" name="password" placeholder="请输入密码"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="login(form)">提 交</el-button>
          </el-form-item>

          <div class="tip">
            <span>还没有账号？</span>
            <span @click="toRegister" class="link">立即注册</span>
          </div>
        </el-form>
      </div>

      <div class="inner" v-if="type==='register'" :key="2">
        <div class="title">注 册</div>
        <el-form :model="form" ref="form" status-icon :rules="rules">
          <el-form-item label="账户">
            <el-input type="text" v-model="form.username" name="username" placeholder="请输入您的账户"></el-input>
          </el-form-item>
          <el-form-item label="密码">
            <el-input type="password" v-model="form.password" name="password" placeholder="请输入密码"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="register(form)">注册</el-button>
          </el-form-item>

          <div class="tip">
            <span>已有账号</span>
            <span @click="toLogin" class="link">直接登录</span>
          </div>
        </el-form>
      </div>
    </transition-group>
  </div>
</template>

<script>
import request from "../utils/request";
export default {
  name: "Login",
  data() {
    return {
      type: "login",
      form: {
        username: "admin",
        password: "123456"
      },
      rules: {
        username: [
          {
            required: true,
            message: "请输入用户名",
            trigger: "blur"
          }
        ],
        password: [
          {
            required: true,
            message: "请输入密码",
            trigger: "blur"
          }
        ]
      }
    };
  },

  methods: {
    //   登录
    login(form) {
      let _this = this;
      request.apiRequest("POST", "/login", form).then(res => {
        // _this.$store.commit('sendUser', res.data)  //更新用户信息
        sessionStorage.setItem("user", JSON.stringify(res.data))
        localStorage.setItem("token", res.token);
        _this.$message.success(res.msg);

        setTimeout(() => {
          _this.$router.push("/index");
        }, 1000);
      });
    },

    //   注册
    register(form) {
      let _this = this;
      request.apiRequest("POST", "/register", form).then(res => {
        _this.$message.success(res.msg);
        setTimeout(() => {
          _this.type = 'login'
        }, 1000);
      });
    },

    // 前往注册
    toRegister() {
      this.type = "register";
      this.form.username = "";
      this.form.password = "";
    },

    // 直接登录
    toLogin() {
      this.type = "login";
      this.form.username = "";
      this.form.password = "";
    }
  }
};
</script>

<style lang="stylus" scoped>
.login {
  perspective: 1000;
  width: 100vw;
  height: 100vh;
}

.inner {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 400px;
  padding: 50px 50px 30px;
  transform: translate(-50%, -50%);
  background: rgba(40, 144, 250, 0.2);
  text-align: center;
  border: 1px solid #2890fa;
  border-radius: 5px;
  transform-origin: 0 center;
  transform-style: preserve-3d;

  .title {
    padding-bottom: 30px;
    color: #fff;
    font-size: 20px;
  }

  /deep/ .el-form {
    .el-form-item {
      display: flex;
      align-items: flex-end;

      .el-form-item__label {
        line-height: 1;
        color: #fff;
      }

      .el-form-item__content {
        flex: 1;

        .el-input__inner {
          color: #fff;
          background: none;
          border: none;
          border-bottom: 1px solid #2890fa;
          border-radius: 0;
        }

        .el-button {
          width: 200px;
          margin-top: 30px;
          background: #2890fa;
          border: none;
          border-radius: 0;
        }
      }
    }

    .tip {
      color: #fff;
      font-size: 14px;

      .link {
        color: #f8bc06;
        text-decoration: underline;
        cursor: pointer;
      }
    }
  }
}

.rotate-enter-active {
  animation: rotate-in 1s;
}

.rotate-leave-active {
  animation: rotate-out 1s;
}

@keyframes rotate-in {
  0% {
    transform: rotateY(-90deg) translate(-50%, -50%);
    opacity 0
  }

  100% {
    transform: rotateY(0) translate(-50%, -50%);
  }
}

@keyframes rotate-out {
  0% {
    transform: rotateY(0) translate(-50%, -50%);
  }

  100% {
    transform: rotateY(-90deg) translate(-50%, -50%);
    opacity 0
  }
}
</style>