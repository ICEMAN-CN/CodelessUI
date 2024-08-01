<template>
  <div>
    <el-row style="margin-top: 40px">
      <el-col :span="6">
        <div class="grid-content bg-purple-light"></div>
      </el-col>
      <el-col :span="4">
        <div class="grid-content bg-purple">
          <el-button type="primary" @click="batchAddEmail">批量生成email推广链接</el-button>
        </div>
      </el-col>
      <el-col :span="4">
        <div class="grid-content bg-purple">
          <el-button type="info" @click="batchAddWeb">批量生成web推广链接</el-button>
        </div>
      </el-col>
      <el-col :span="4">
        <div class="grid-content bg-purple">
          <el-button type="info" @click="manualUpdate">手动触发统计更新</el-button>
        </div>
      </el-col>
    </el-row>
    <el-table :data="tableDate" stripe style="margin-top:30px"
              :header-cell-style="{ background: '#F5F7F9', color: '#222222' }">
      <el-table-column prop="id" label="ID" width="50"></el-table-column>
      <el-table-column prop="clIdForButton1" label="按钮1-clid" width="300"></el-table-column>
      <el-table-column prop="clIdForButton2" label="按钮2-clid" width="300"></el-table-column>
      <el-table-column prop="refSource" label="点击来源" width="100"></el-table-column>
      <el-table-column prop="customerEmail" label="客户邮箱" width="200"></el-table-column>
      <el-table-column prop="businessCode" label="业务方编码" width="100"></el-table-column>
      <el-table-column prop="createTime" label="创建时间" width="250"></el-table-column>
      <el-table-column label="操作" width="250">
        <el-button type="text" plain size="small" @click="generateText()">生成推广信息</el-button>
      </el-table-column>
    </el-table>
    <el-pagination :current-page.sync="this.pageIndex" :page-sizes="pagesizeList"
                   layout="total, sizes, prev, pager, next, jumper" :page-size="pageSize" @size-change="handleSizeChange"
                   @current-change="currentChange" :total="total || tableDate.length"
                   :class="{ noPagination: total <= pageSize }">
    </el-pagination>

  </div>
</template>

<style>
.grid-content {
  border-radius: 4px;
  min-height: 36px;
}


.bg-purple {
  background: #d3dce6;
}

.bg-purple-light {
  background: #e5e9f2;
}
</style>

<script>
import userApi from "@/api/userApi";

export default {
  created() {
    // 获取链接参数user_id和nickName值，然后存进内存中
    this.refid = this.$route.query.refid;
    this.clidb1 = this.$route.query.clidb1;
    this.clidb2 = this.$route.query.clidb2;
    console.log(this.refid)
    console.log(this.clidb1)
    console.log(this.clidb2)
  },
  mounted() {
    this.linkList();
  },
  beforeDestroy() {
  },
  methods: {
    generateText(row) {
      userApi.generateText({
        clIdForButton1: "fe2bb696a730486e93108ebc4ab6be5c",
        clIdForButton2: "23d5150a0c054923bf78630396d30358"
      })
          .then((res) => {
            console.log(res)
            if (res.code === 0) {

            } else {
              this.$message({
                type: "danger",
                message: res.message
              });
            }

          });
    },
    // 改变每页显示数量
    handleSizeChange(size) {
      console.log('SIZE',size)
      this.pageSize = size
      this.linkList();
    },
    currentChange(val) {
      console.log('val', val,this.pageIndex)

      this.linkList()
    },
    batchAddWeb() {
      userApi.batchAddWeb({
        businessCode: "google",
      })
          .then((res) => {
            console.log(res)
            if (res.code === 0) {
              this.pageIndex = 1;
              this.pageSize = 20;
              this.linkList();
              this.$message({
                type: "success",
                message: "添加成功"
              });
            } else {
              this.$message({
                type: "danger",
                message: res.message
              });
            }

          });
    },
    batchAddEmail() {
      userApi.batchAddEmail({
        businessCode: "google",
      })
          .then((res) => {
            console.log(res)
            if (res.code === 0) {
              this.pageIndex = 1;
              this.pageSize = 20;
              this.linkList();
              this.$message({
                type: "success",
                message: "添加成功"
              });
            } else {
              this.$message({
                type: "danger",
                message: res.message
              });
            }

          });
    },
    linkList() {
      userApi.linkList({
        businessCode: "google",
        pageIndex: this.pageIndex,
        pageSize: this.pageSize,
      })
          .then((res) => {
            console.log(res)
            if (res.code === 0) {
              this.total = res.data.total
              this.tableDate = res.data.list
              this.$message({
                type: "success",
                message: "刷新成功"
              });
            } else {
              this.$message({
                type: "danger",
                message: res.message
              });
            }

          });
    },
    manualUpdate() {
      userApi.manualUpdate()
          .then((res) => {
            console.log(res)
            if (res.code === 0) {
              this.$message({
                type: "success",
                message: "刷新成功"
              });
            } else {
              this.$message({
                type: "danger",
                message: res.message
              });
            }

          });
    },

  },
  data() {
    return {
      pagesizeList:  [10, 20, 50, 100],
      pageIndex: 1,
      pageSize: 20,
      total: 0,
      tableDate:[],
      rows: [
        { key: 'id', name: "ID", width: "20" },
        { key: 'clIdForButton1', name: "按钮1-clid", width: "200" },
        { key: 'clIdForButton2', name: "按钮2-clid", width: "200" },
        { key: 'refSource', name: "点击来源", width: "40" },
        { key: 'customerEmail', name: "客户邮箱", width: "100" },
        { key: 'businessCode', name: "业务方编码", width: "20" },
        { key: 'createTime', name: "创建时间", width: "150" },
      ],
    }
  }
}
</script>
