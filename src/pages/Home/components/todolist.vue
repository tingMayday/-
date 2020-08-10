<template>
  <el-card class="todo-list">
    <div slot="header" class="flex-cs">
      <span>待办事项</span>
      <!-- <el-link type="primary" href="/todo">更多 >></el-link> -->
    </div>
    <div class="list">
      <div class="todo flexalign" v-for="(item) in todolist" :key="item.id">
        <el-checkbox
          class="flexalign"
          v-model="item.isdone"
          @change="editTodo(item.id, item.isdone)"
        >
          <i :class="'icon el-icon-star-' + (item.isdone ? 'on' : 'off')"></i>
          <div class="title">{{item.title}}</div>
        </el-checkbox>
        <div class="flexalign tools">
          <!-- <i class="el-icon-edit" @click="editTodo(item.id)"></i> -->
          <i class="el-icon-delete" @click="delTodo(item.id)"></i>
        </div>
      </div>
    </div>

    <div class="todo-add flexalign">
      <el-input v-model="todoadd" placeholder="请输入事项"></el-input>
      <el-button type="success" @click="addTodo">add</el-button>
    </div>
  </el-card>
</template>

<script>
import request from "@/utils/request";
export default {
  name: "TodoList",
  data() {
    return {
      todolist: [],
      todoadd: "",
      test: true,
    };
  },

  mounted() {
    this.getTodoList();
  },

  methods: {
    // 获取待办事项列表
    getTodoList() {
      let _this = this;
      request.apiRequest("POST", "/getTodoList").then((res) => {
        res.data.forEach((key) => {
          key.isdone = key.isdone === 1 ? true : false;
        });
        _this.todolist = res.data;
      });
    },

    // 编辑待办事项
    editTodo(id, isdone = false, title = "") {
      let _this = this;
      request
        .apiRequest("POST", "/editTodo", {
          id: id,
          isdone: isdone === true ? 1 : 0,
          title: title,
        })
        .then((res) => {
          _this.getTodoList();
          _this.$message.success(res.msg);
        });
    },

    // 删除待办事项
    delTodo(id) {
      let _this = this;
      _this
        .$confirm("确定删除该待办事项?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        })
        .then(() => {
          request.apiRequest("POST", "/delTodo", { id: id }).then((res) => {
            _this.getTodoList();
            _this.$message.success(res.msg);
          });
        });
    },

    // 新增待办事项
    addTodo() {
      let _this = this;
      request
        .apiRequest("POST", "/addTodo", { title: _this.todoadd })
        .then((res) => {
          _this.getTodoList();
          _this.$message.success(res.msg);
        });
    },
  },
};
</script>

<style lang="stylus" scoped>
.todo-list {
  height: 100%;
  background: #fff;

  .list {
    height: 300px;
    overflow-y: scroll;

    .todo {
      padding-bottom: 20px;

      /deep/ .el-checkbox {
        position: relative;
        width: 100%;
        padding-left: 20px;

        &.is-checked {
          .el-checkbox__label {
            color: #999;

            .title {
              text-decoration: line-through;
            }
          }
        }

        .el-checkbox__input {
          display: none;
        }

        .el-checkbox__label {
          flex: 1;
          display: flex;
          align-items: center;
          fon-size: 20px;

          [class*=' el-icon-'] {
            position: absolute;
            left: 0;
            font-size: 20px;
          }

          .title {
            flex: 1;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
          }
        }
      }

      .tools {
        color: #409EFF;

        i {
          padding: 0 5px;
          cursor: pointer;
        }
      }
    }
  }

  .todo-add {
    margin-top: 10px;

    /deep/ .el-input__inner {
      border-radius: 0;
    }

    .el-button {
      border-radius: 0;
    }
  }
}
</style>