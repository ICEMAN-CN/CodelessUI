<template>
    <div>
        <el-tag size="medium" type="success">正常：{{successNum}}</el-tag>
        <el-tag size="medium" style="margin-left: 100px" type="danger">异常：{{errorNum}}</el-tag>
        <el-form-item label="错误列表">
            <el-input type="textarea" v-model=errorList></el-input>
        </el-form-item>
        <el-table
            :cell-style="cellStyle"
            :data="tableData"
            style="width: 100%"
            :row-class-name="tableRowClassName">
            <el-table-column
                prop="xuhao"
                label="序号"
                width="50">
            </el-table-column>
            <el-table-column
                prop="zhiwen"
                label="指纹编号"
                width="100">
            </el-table-column>
            <el-table-column
                prop="deviceId"
                label="设备号">
            </el-table-column>
            <el-table-column
                prop="status"
                label="状态"
                width="50">
            </el-table-column>
            <el-table-column
                prop="workStatus"
                label="工作状态"
                width="100">
            </el-table-column>
            <el-table-column
                prop="speed"
                label="速度"
                width="100">
            </el-table-column>
            <el-table-column
                prop="download"
                label="下载Mbps"
                width="100">
            </el-table-column>
            <el-table-column
                prop="upload"
                label="上传Mbps"
                width="100">
            </el-table-column>
            <el-table-column
                prop="rewards"
                label="区块链奖励"
                width="100">
            </el-table-column>
            <el-table-column
                prop="latestRewardsTime"
                label="上次奖励时间"
                width="120">
            </el-table-column>
            <el-table-column
                prop="latestRewardsAmount"
                label="上次奖励数量"
                width="120">
            </el-table-column>
            <el-table-column
                prop="yesterdayEarnings"
                label="昨日奖励"
                width="100">
            </el-table-column>
            <el-table-column
                prop="updateTime"
                label="更新时间">
            </el-table-column>
        </el-table>
    </div>
</template>

<style>
.el-table .warning-row {
    background: red;
}

.el-table .success-row {
    background: lightgreen;
}

.el-table .pending-row {
  background: darkgray;
}

.el-table .hired-row {
  background: deepskyblue;
}

</style>

<script>
import userApi from "@/api/userApi";

export default {
    mounted() {
        this.getIoStatus();
        // 每隔5分钟定时刷新
        this.timer = setInterval(() => {
          this.getIoStatus();
        }, 30000)
    },
    beforeDestroy() {
      clearInterval(this.timer);
    },
    methods: {
        tableRowClassName({row}) {
            if (row.status === 'up' && row.workStatus === 'Cluster Ready') {
                return 'success-row';
            }
          if (row.status === 'up' && row.workStatus === 'Hired') {
            return 'hired-row';
          }
          if (row.status === 'up' && row.workStatus === 'Pending') {
                return 'pending-row';
          }
          else {
                return 'warning-row';
          }
        },
        getIoStatus() {
            userApi.GetIoStatus()
                .then((res) => {
                    console.log(res)
                    if (res.code === 0) {
                        this.tableData = res.data.deviceList;
                        this.successNum = res.data.successNum;
                        this.errorNum = res.data.errorNum;
                        this.errorList = res.data.errorList;
                    } else {
                        this.$message({
                            type: "danger",
                            message: res.message
                        });
                    }

                });
        },
        cellStyle({row, column, rowIndex, columnIndex}){
            return {
                color: '#FFFFFF',
            }
        }
    },
    data() {
        return {
            timer: null,
            deviceList: [{
                xuhao: 'X4',
                zhiwen: '2033',
                deviceId: '835c9cd6-1d8e-4e4c-a867-8f8d1d24f20d',
                status: '正常',
                download: 0.0,
                upload: 0.0,
                speed: "",
                workStatus: 'Error',
                rewards: '0.0',
                latestRewardsTime : '',
                latestRewardsAmount : 0.0,
                yesterdayEarnings : 0.0,
            }],
            successNum: 0,
            errorNum: 0,
            errorList:[],
            tableData: []

        }
    }
}
</script>