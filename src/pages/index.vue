<template>
  <el-container direction="vertical">
    <main-header @menuToggle="menuToggle" />
    <el-container>
      <main-aside
        :menuActive="menuActive"
        :isCollapse="isCollapse"
        :menus="menus"
        @menuSelect="menuSelect"
      />
      <el-container>
        <el-main>
          <bread :bread="bread" />
          <div class="content">
            <transition name="el-zoom-in-center">
              <keep-alive>
                <router-view></router-view>
              </keep-alive>
            </transition>
          </div>
        </el-main>
        <el-footer height="auto">后台管理系统@2020 ting</el-footer>
      </el-container>
    </el-container>
  </el-container>
</template>

<script>
import MainHeader from "@/components/Header";
import MainAside from "@/components/Aside";
import Bread from "@/components/Bread";
// import Home from "./home";

import request from "../utils/request";
export default {
  name: "Index",
  components: {
    MainHeader,
    MainAside,
    Bread,
    // Home
  },
  data() {
    return {
      menus: [], //侧边栏菜单
      isCollapse: false, //菜单折叠
      menuActive: "", //默认选中菜单
      bread: [], //面包屑
    };
  },

  mounted() {
    this.getMenus();
  },

  methods: {
    // 获取一级菜单列表
    getMenus() {
      let _this = this;
      request.apiRequest("POST", "/getMenus").then((res) => {
        res.data.forEach((key) => {
          key.children = [];
          _this.getSecondMenus(key.index).then((result) => {
            key.children = result;
          });
        });
        _this.menus = res.data;
        _this.menuActive = res.data[0].path
        _this.bread.push(res.data[0]);
      });
    },

    // 获取二级菜单列表
    getSecondMenus(index) {
      let _this = this;
      return new Promise((reslove, reject) => {
        request
          .apiRequest("POST", "/getSecondMenus", {
            parent_index: index,
          })
          .then((res) => {
            reslove(res.data);
          });
      });
    },

    //   菜单显示隐藏
    menuToggle() {
      this.isCollapse = !this.isCollapse;
    },

    // 菜单选择
    menuSelect(path) {
      console.log(222, path);
    },
  },
};
</script>

<style lang="stylus" scoped>
.el-main {
  height: calc(100vh - 98px);
  background: rgba(255, 255, 255, 0.95);
  overflow-y: scroll;

  // background: #f8f9fa;
  .content {
    padding: 10px 0;
  }
}

.el-footer {
  padding: 10px 0;
  text-align: center;
  background: rgba(255, 255, 255, 0.1);
  color: #ccc;
  font-size: 14px;
}
</style>