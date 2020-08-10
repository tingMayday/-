<template>
  <div class="home">
    <user-info :user="user" :weather="weather" />
    <total />
    <data-chart />
    <el-row :gutter="20" type="flex" justify="space-between">
      <el-col :span="12">
        <map-chart />
      </el-col>
      <el-col :span="12">
        <hot-sale />
      </el-col>
    </el-row>

    <el-row :gutter="20" type="flex" justify="space-between" class="mt20">
      <el-col :span="16">
        <orders />
      </el-col>
      <el-col :span="8">
        <todo-list />
      </el-col>
    </el-row>
  </div>
</template> 

<script>
import UserInfo from "./components/userinfo";
import Total from "./components/total";
import DataChart from "./components/datachart";
import MapChart from "./components/map";
import HotSale from "./components/hotsale";
import Orders from "./components/orders";
import TodoList from "./components/todolist";
export default {
  name: "Home",
  components: {
    UserInfo,
    Total,
    DataChart,
    MapChart,
    HotSale,
    Orders,
    TodoList
  },
  data() {
    return {
      user: {},
      weather: {},
      turnover: 999,
      order: 18888,
      userVisits: 1234,
      message: 88,
    };
  },
  mounted() {
    this.user = JSON.parse(sessionStorage.getItem("user"));
    this.getWeather();
  },

  methods: {
    //   获取天气数据
    getWeather() {
      let _this = this;
      this.$axios({
        method: "get",
        url:
          "https://tianqiapi.com/api?version=v6&appid=49915636&appsecret=4SPztjEo",
      })
        .then((res) => {
          _this.weather = res;
        })
        .catch((err) => {
          _this.$message({
            message: err.msg || "error",
            type: "error",
            duration: 5 * 1000,
          });
        });
    },
  },
};
</script>
