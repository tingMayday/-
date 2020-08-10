<template>
  <div class="user-info flexalign">
    <el-avatar
      :size="50"
      :src="user.avatar || 'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png'"
    ></el-avatar>
    <div class="info">
      <div>早上好！{{user.userName}},欢迎使用后台管理系统</div>
      <div
        class="weather"
      >{{weather.city}}({{weather.week}}): 今天{{weather.tem2}}~{{weather.tem1}}°(当前:{{weather.tem}}°)， {{weather.air_tips}}</div>
    </div>
  </div>
</template> 

<script>
export default {
  name: "UserInfo",
  props: {
      user: Object,
      weather: Object
  }
};
</script>

<style lang="stylus" scoped>

.user-info {
  margin-bottom 30px;
  padding-bottom: 20px;
  font-size: 20px;
  color: #333;
  border-bottom: 1px solid #eee;

  .info {
    padding-left: 10px;
  }

  .weather {
    padding-top: 5px;
    font-size: 14px;
    color: #999;
  }
}
</style>