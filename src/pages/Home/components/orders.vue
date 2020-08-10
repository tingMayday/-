<template>
  <el-card class="orders" :body-style="{ padding: '0px' }">
    <div slot="header" class="flex-cs">
      <span>订单</span>
      <el-link type="primary" href="##">更多 >></el-link>
    </div>
    <el-table :data="orderList" height="385" style="width: 100%">
      <el-table-column label="头像">
        <template slot-scope="scope">
          <el-avatar
            :size="30"
            :src="scope.row.avatar || 'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png'"
          ></el-avatar>
        </template>
      </el-table-column>
      <el-table-column prop="id" label="ID"></el-table-column>
      <el-table-column prop="name" label="姓名"></el-table-column>
      <el-table-column prop="product" label="产品"></el-table-column>
      <el-table-column prop="quantity" label="数量"></el-table-column>
      <el-table-column label="状态">
        <template slot-scope="scope">
          <el-tag v-if="scope.row.status === 0">未支付</el-tag>
          <el-tag type="success" v-if="scope.row.status === 1">已支付</el-tag>
          <el-tag type="info" v-if="scope.row.status === 2">待发货</el-tag>
          <el-tag type="warning" v-if="scope.row.status === 3">待退款</el-tag>
          <el-tag type="success" v-if="scope.row.status === 4">已完成</el-tag>
          <el-tag type="danger" v-if="scope.row.status === 5">已关闭</el-tag>
        </template>
      </el-table-column>
    </el-table>
  </el-card>
</template> 

<script>
export default {
  name: "Orders",
  data() {
    return {
      orderList: [
        {
          id: "#001",
          avatar: "",
          name: "Mary Silva",
          product: "IPad",
          quantity: 10,
          status: 0, //未支付 0 已支付 1 待发货 2 待退款 3 订单完成 4 订单关闭 5
        },
        {
          id: "#001",
          avatar: "",
          name: "Mary Silva",
          product: "IPad",
          quantity: 10,
          status: 1,
        },
        {
          id: "#001",
          avatar: "",
          name: "Mary Silva",
          product: "IPad",
          quantity: 10,
          status: 2,
        },
        {
          id: "#001",
          avatar: "",
          name: "Mary Silva",
          product: "IPad",
          quantity: 10,
          status: 4,
        },
        {
          id: "#001",
          avatar: "",
          name: "Mary Silva",
          product: "IPad",
          quantity: 10,
          status: 5,
        },
        {
          id: "#001",
          avatar: "",
          name: "Mary Silva",
          product: "IPad",
          quantity: 10,
          status: 3,
        },
        {
          id: "#001",
          avatar: "",
          name: "Mary Silva",
          product: "IPad",
          quantity: 10,
          status: 3,
        },
        {
          id: "#001",
          avatar: "",
          name: "Mary Silva",
          product: "IPad",
          quantity: 10,
          status: 5,
        },
      ],
    };
  },
};
</script>

<style lang="stylus" scoped>
.orders {
  height: 100%;
  background: #fff;

  /deep/ .el-table {
    &:before {
      display: none;
    }

    td, th {
      text-align: center;
    }

    th {
      background: #eee;
    }

    td {
      border-bottom: 0;
    }
  }
}
</style>