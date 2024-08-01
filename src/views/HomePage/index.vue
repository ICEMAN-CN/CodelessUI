<template>
  <div>
    <el-row>
      <div style="font-size: 20px; text-align: center">
        <p>亲爱的，<br>我们目前有以下最新产品，非常满足您的需求，推荐您了解一下</p>
      </div>
    </el-row>
    <el-row style="margin-top: 40px">
      <el-col :span="11">
        <div class="grid-content bg-purple">
          <el-button type="primary" style="float: right" @click="openLink">点开看看</el-button>
        </div>
      </el-col>
      <el-col :span="2">
        <div class="grid-content bg-purple-light"></div>
      </el-col>
      <el-col :span="11">
        <div class="grid-content bg-purple">
          <el-button type="info" @click="ignoreLink">不感兴趣</el-button>
        </div>
      </el-col>
    </el-row>


  </div>
</template>

<style>
.grid-content {
  border-radius: 4px;
  min-height: 36px;
}


.bg-purple {
  //background: #d3dce6;
}

.bg-purple-light {
  //background: #e5e9f2;
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
  },
  beforeDestroy() {
  },
  methods: {
    openLink() {
      let params = {
        refid: this.refid,
        clid: this.clidb1
      };
      userApi.clickLink(params)
          .then((res) => {
            console.log(res)
            if (res.code === 0) {
              this.$message({
                type: "success",
                message: "感谢参与"
              });
            } else {
              this.$message({
                type: "danger",
                message: res.message
              });
            }

          });
    },
    ignoreLink() {
      let params = {
        refid: this.refid,
        clid: this.clidb2
      };
      userApi.clickLink(params)
          .then((res) => {
            console.log(res)
            if (res.code === 0) {
              this.$message({
                type: "success",
                message: "感谢参与"
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
      refid: "",
      clidb1: "",
      clidb2: "",
    }
  }
}
</script>
