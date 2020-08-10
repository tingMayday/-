<template>
  <el-card class="hot-sale">
    <div slot="header" class="flex-cs">
      <span>热销TOP10</span>
    </div>
    <div class="toplist" v-for="(item,index) in toplist" :key="index">
      <div class="toplist-top flex-cs">
        <div class="toplist-left">
          <span class="no">No.{{index + 1}}</span>
          <span class="name">{{item.name}}</span>
        </div>
        <span>{{item.quantity}}件</span>
      </div>
      <el-progress
        color="#2dce89"
        :show-text="false"
        :percentage="item.quantity * (100/toplist[0].quantity)"
      ></el-progress>
    </div>
  </el-card>
</template>

<script>
export default {
  name: "HotSale",
  data() {
    return {
      toplist: [
        {
          name: "产品1",
          quantity: 200,
        },
        {
          name: "产品2",
          quantity: 187,
        },
        {
          name: "产品3",
          quantity: 166,
        },
        {
          name: "产品4",
          quantity: 163,
        },
        {
          name: "产品5",
          quantity: 159,
        },
        {
          name: "产品6",
          quantity: 80,
        },
        {
          name: "产品7",
          quantity: 76,
        },
        {
          name: "产品8",
          quantity: 40,
        },
        {
          name: "产品9",
          quantity: 15,
        },
        {
          name: "产品10",
          quantity: 8,
        },
      ],
    };
  },
};
</script>

<style lang="stylus" scoped>
.hot-sale {
  height: 100%;
  background: #fff;

  .toplist {
    padding-bottom: 15px;

    .toplist-top {
      padding-bottom: 5px;
      color: #5e72e4;
      font-size: 14px;

      .no {
        padding-right: 10px;
        color: #2dce89;
        font-weight: bold;
      }
    }
  }
}
</style>