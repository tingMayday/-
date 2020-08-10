<template>
  <div class="latest-msg">
    <ul>
      <li v-for="(item, index) in message" :key="index">
        <div class="top">
          <span class="username">{{item.username}}</span>
          <span>评论于{{item.time}}</span>
        </div>
        <div class="content">{{item.content}}</div>
      </li>
    </ul>
  </div>
</template> 

<script>
export default {
  name: "LatestMsg",
  data() {
    return {
      message: [
        {
          username: "智障",
          time: "2020-07-23 12:00",
          content: "内容内容内容内容内容内容内容内容内容内容    ",
        },
        {
          username: "智障",
          time: "2020-07-23 12:00",
          content: "内容内容内容内容内容内容内容内容内容内容    ",
        },
        {
          username: "智障",
          time: "2020-07-23 12:00",
          content: "内容内容内容内容内容内容内容内容内容内容    ",
        },
        {
          username: "智障",
          time: "2020-07-23 12:00",
          content: "内容内容内容内容内容内容内容内容内容内容    ",
        },
        {
          username: "智障",
          time: "2020-07-23 12:00",
          content: "内容内容内容内容内容内容内容内容内容内容    ",
        },
      ],
    };
  },
};
</script>

<style lang="stylus" scoped>
.latest-msg {
  padding: 10px;
  height: 100%;
  background: #fff;

  li {
    position: relative;
    margin-left: 34px;
    margin-bottom: 20px;
    font-size: 14px;
    border: 1px solid #dedede;
    border-radius: 2px;

    .top {
      padding: 10px 15px;
      background: #f8f8f8;
      color: #999;
      border-bottom: 1px solid #eee;

      .username {
        font-weight: bold;
      }
    }

    .content {
      padding: 15px;
    }
  }
}
</style>