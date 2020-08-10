<template>
  <el-header>
    <div class="left flexalign">
      <i class="el-icon-menu menu-ico" @click="menuToggle"></i>
      <span>后台管理系统</span>
    </div>
    <div class="right flexalign">
      <i class="el-icon-full-screen full"></i>
      <el-badge is-dot>
        <i class="el-icon-bell notice"></i>
      </el-badge>
      <el-avatar
        :size="25"
        :src="user.avatar || 'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png'"
      ></el-avatar>
      <span>{{user.userName}}</span>
      <el-button type="text" icon="el-icon-switch-button" plain @click="loginout">退出登录</el-button>
    </div>
  </el-header>
</template>

<script>
import request from "../utils/request";
export default {
  name: "Header",
  computed: {
    user() {
      return this.$store.state.user;
    }
  },
  methods: {
    // 菜单切换
    menuToggle() {
      this.$emit("menuToggle");
    },

    //   退出
    loginout() {
      let _this = this;
      request
        .apiRequest("POST", "/loginOut", {
          id: _this.$store.state.user.id
        })
        .then(res => {
          // 清除缓存
          localStorage.clear();
          _this.$router.push("/login");
          _this.$message.success(res.msg);
        });
    }
  }
};
</script>

<style lang="stylus" scoped>
.el-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: rgba(1, 197, 170, 0.8);
  color: #fff;

  .left {
    line-height: 1;
    font-size: 18px;

    .menu-ico {
      line-height: 1;
      margin-right: 15px;
      font-size: 20px;
      cursor: pointer;
    }
  }

  .right {
    .full {
      margin-right: 10px;
      font-size: 24px;
    }

    .notice {
      font-size: 20px;
    }

    .el-avatar {
      margin-right: 10px;
      margin-left: 30px;
    }

    .el-button {
      margin-left: 30px;
      padding: 0;
      color: #eee;
      background: none;
      border: 0;
      font-size: 16px;
    }
  }
}
</style>