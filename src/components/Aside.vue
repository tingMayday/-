<template>
  <el-aside width="auto">
    <el-menu
      @select="select"
      :default-active="menuActive"
      :collapse="isCollapse"
      :router="true"
      background-color="rgba(2, 36, 54, .8)"
      text-color="#fff"
      active-text-color="#ffd04b"
      class="el-menu-vertical-demo"
    >
      <div v-for="item in menus" :key="item.index">
        <el-submenu :index="item.path" v-if="item.children.length">
          <template slot="title">
            <i :class="'el-icon-' + item.icon"></i>
            <span>{{item.name}}</span>
          </template>
          <el-menu-item
            :index="sitem.path"
            v-for="sitem in item.children"
            :key="sitem.index"
          >{{sitem.name}}</el-menu-item>
        </el-submenu>
        <el-menu-item :index="item.path" v-else>
          <i :class="'el-icon-' + (item.icon || 'star-off')"></i>
          <span slot="title">{{item.name}}</span>
        </el-menu-item>
      </div>
    </el-menu>
  </el-aside>
</template>

<script>
import request from "@/utils/request";
export default {
  name: "Aside",
  props: {
    menuActive: String,
    isCollapse: Boolean,
    menus: Array
  },

  methods: {
    select(index, path) {
      this.$emit("menuSelect", path);
    }
  }
};
</script>

<style lang="stylus" scoped>
.el-menu {
  height: calc(100vh - 60px);
  text-align: left;
  border-right-color: #000;

  &:not(.el-menu--collapse) {
    width: 200px;
  }
}
</style>