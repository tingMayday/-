<template>
  <el-row class="total" type="flex" justify="space-between">
    <el-col>
      <div class="ico">
        <i class="el-icon-user"></i>
      </div>
      <div class="value">￥{{turnover}}</div>
      <div class="label">收入</div>
    </el-col>
    <el-col>
      <div class="ico">
        <i class="el-icon-document"></i>
      </div>
      <div class="value">{{order}}</div>
      <div class="label">订单</div>
    </el-col>
    <el-col>
      <div class="ico">
        <i class="el-icon-document"></i>
      </div>
      <div class="value">{{userVisits}}</div>
      <div class="label">用户</div>
    </el-col>
    <el-col>
      <div class="ico">
        <i class="el-icon-document"></i>
      </div>
      <div class="value">{{message}}</div>
      <div class="label">消息</div>
    </el-col>
  </el-row>
</template> 

<script>
export default {
  name: "Total",
   data() {
    return {
      turnover: 999.00,
      order: 18888.00,
      userVisits: 1234,
      message: 88
    };
  },
};
</script>


<style lang="stylus" scoped>
.total {
  .el-col {
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 24%;
    height: 100px;
    padding-left: 30px;
    background: #fff;
    color: #fff;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.01);
    border-radius: 3px;

    &:nth-child(1) {
      background: #2dce89;
    }

    &:nth-child(2) {
      background: #5e72e4;
    }

    &:nth-child(3) {
      background: #f5365c;
    }

    &:nth-child(4) {
      background: #11cdef;
    }

    .ico {
      position: absolute;
      right: 15px;
      width: 50px;
      height: 50px;
      line-height: 50px;
      text-align: center;
      font-size: 30px;
      color: #fff;
      border: 1px solid #fff;
      border-radius: 50%;
    }

    .value {
      padding-bottom: 5px;
      font-size: 24px;
      font-weight: bold;
    }

    .label {
      padding-left: 6px;
      color: #eeeeee;
      font-size: 14px;
    }
  }
}
</style>