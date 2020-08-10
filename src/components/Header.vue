<template>
  <el-header class="header-nav">
    <el-row type="flex" justify="space-between">
      <el-col :span="6" class="flexalign">
        <i class="el-icon-menu menu-ico" @click="menuToggle"></i>
        <span class="title">后台管理系统</span>
      </el-col>
      <el-col :span="6" class="flexalign right-wrap">
        <div class="btn">
          <el-tooltip class="item" effect="dark" content="跳转到github" placement="bottom">
            <a href="https://github.com/tingMayday/vue-admin-master" target="_blank">
              <i class="el-icon-eleme icon"></i>
            </a>
          </el-tooltip>
        </div>
        <!-- 全屏显示 -->
        <div class="btn" @click="handleFullScreen">
          <el-tooltip effect="dark" :content="fullscreen?`取消全屏`:`全屏`" placement="bottom">
            <i class="el-icon-full-screen icon"></i>
          </el-tooltip>
        </div>
        <el-avatar
          :size="25"
          :src="users.avatar || 'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png'"
        ></el-avatar>
        <div class="name">{{users.userName}}</div>
        <span class="username">
          <el-dropdown trigger="click" @command="handleCommand">
            <span class="el-dropdown-link">
              <i class="el-icon-caret-bottom el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item command="info">个人信息</el-dropdown-item>
              <el-dropdown-item command="logout">退出</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </span>
      </el-col>
    </el-row>
  </el-header>
</template>

<script>
import request from "../utils/request";
export default {
  name: "Header",
  data() {
    return {
      fullscreen: false,
      users: {}
    };
  },

  mounted() {
    this.users =  JSON.parse(sessionStorage.getItem("user"));
  },

  methods: {
    // 菜单显示隐藏切换
    menuToggle() {
      this.$emit("menuToggle");
    },

    // 用户下拉框事件
    handleCommand(cmd) {
      switch (cmd) {
        case "info":
          this.$router.push("/Infoshow");
          break;
        case "logout":
          this.logout();
          break;
      }
    },

    // 退出登录
    logout() {
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
    },

    // 全屏
    handleFullScreen() {
      //获取到整个html
      let element = document.documentElement;
      // console.log(element)
      if (this.fullscreen) {
        if (document.exitFullscreen) {
          document.exitFullscreen();
        } else if (document.webkitCancelFullScreen) {
          document.webkitCancelFullScreen();
        } else if (document.mozCancelFullScreen) {
          document.mozCancelFullScreen();
        } else if (document.msExitFullscreen) {
          document.msExitFullscreen();
        }
      } else {
        if (element.requestFullscreen) {
          element.requestFullscreen();
        } else if (element.webkitRequestFullScreen) {
          element.webkitRequestFullScreen();
        } else if (element.mozRequestFullScreen) {
          element.mozRequestFullScreen();
        } else if (element.msRequestFullscreen) {
          // IE11
          element.msRequestFullscreen();
        }
      }
      this.fullscreen = !this.fullscreen;
    }
  }
};
</script>

<style lang="stylus" scoped>
.el-header {
  background: rgba(1, 197, 170, 0.8);
  color: #fff;

  .el-row {
    height: 60px;
  }

  .menu-ico {
    margin-right: 10px;
    font-size: 36px;
  }

  .title {
    vertical-align: middle;
    font-size: 22px;
    font-family: 'Microsoft YaHei';
    letter-spacing: 3px;
  }

  .right-wrap {
    justify-content: flex-end;

    a {
      color: #fff;
    }

    .btn {
      display: inline-block;
      margin-right: 20px;
      cursor: pointer;

      .icon {
        font-size: 26px;
      }
    }

    .name {
      padding: 0 5px;
    }

    .el-dropdown {
      color: #fff;
    }
  }
}
</style>
