<template>
  <el-card class="data-chart">
    <v-chart :options="options" />
  </el-card>
</template> 

<script>
export default {
  name: "Datachart",
  data() {
    return {
      options: {
        grid: {
          left: "0",
          right: "1.5%",
          bottom: "0",
          containLabel: true,
        },
        title: {
          text: "数据统计",
        },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "cross",
            label: {
              backgroundColor: "#6a7985",
            },
          },
        },
        legend: {
          data: ["产品1", "产品2", "产品3"],
        },
        toolbox: {
          feature: {
            magicType: {
              type: ["line", "bar", "stack", "tiled"],
            },
            restore: {},
            saveAsImage: {},
          },
        },
        xAxis: [
          {
            type: "category",
            boundaryGap: false,
            data: ["周一", "周二", "周三", "周四", "周五", "周六", "周日"],
          },
        ],
        yAxis: {
          type: "value",
        },
        series: [
          {
            name: "产品1",
            type: "line",
            symbol: "circle",
            symbolSize: 8,
            smooth: true,
            areaStyle: {
              normal: {
                color: "rgba(45, 206, 137, .5)",
              },
            },
            itemStyle: {
              normal: {
                color: "#2dce89",
                lineStyle: {
                  color: "#2dce89",
                },
              },
            },
            data: [500, 30, 101, 134, 90, 230, 600],
          },
          {
            name: "产品2",
            type: "line",
            symbol: "rect",
            symbolSize: 8,
            smooth: true,
            areaStyle: {
              normal: {
                color: "rgba(94, 114, 228, .5)",
              },
            },
            itemStyle: {
              normal: {
                color: "#5e72e4",
                lineStyle: {
                  color: "#5e72e4",
                },
              },
            },
            data: [220, 300, 191, 234, 290, 330, 310],
          },
          {
            name: "产品3",
            type: "line",
            symbol: "triangle",
            symbolSize: 8,
            smooth: true,
            areaStyle: {
              normal: {
                color: "rgba(17, 205, 239, .5)",
              },
            },
            itemStyle: {
              normal: {
                color: "#11cdef",
                lineStyle: {
                  color: "#11cdef",
                },
              },
            },
            data: [0, 20, 50, 80, 600, 50, 300],
          },
        ],
      },
    };
  },
};
</script>

<style lang="stylus" scoped>
.data-chart {
  margin-top: 20px;
  margin-bottom 20px;
  background: #fff;

  .echarts {
    width: 100%;
  }
}
</style>