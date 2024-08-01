<template>
    <div class="recommendedNodeCom boxWrap">
        <div class="header">
            <h3>{{ $route.meta.title }}</h3>
            <div>
                <el-date-picker
                    class="Picker"
                    v-model="datePicker"
                    type="daterange"
                    align="left"
                    unlink-panels
                    range-separator="至"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期"
                    :picker-options="pickerOptions"
                    @change="datePickerChange"
                    format="yyyy-MM-dd"
                    value-format="yyyy-MM-dd"
                    size="small"
                >
                </el-date-picker>
            </div>
        </div>

        <chart :diagramData="diagramData"></chart>
        <el-table class="dataTable" :data="dataList" stripe style="width: 100%" >
            <el-table-column prop="date" label="日期" width="180">
                <template slot-scope="{ row }">
                    {{ row.date == "dateSum" ? "汇总" : row.date }}
                </template>
            </el-table-column>
            <el-table-column prop="commentPv" label="评论总数"></el-table-column>
            <el-table-column prop="commentUv" label="评论人数"></el-table-column>
            <el-table-column prop="userOwnedCommentPv" label="已拥有评论总数" width="120"></el-table-column>
            <el-table-column prop="userOwnedCommentUv" label="已拥有评论人数" width="120"></el-table-column>
            <el-table-column prop="unboundShopUserCommentPv" label="未绑定商店评论总数" width="160"></el-table-column>
            <el-table-column prop="unboundShopUserCommentUv" label="未绑定商店评论人数" width="160"></el-table-column>
            <el-table-column prop="likePv" label="点赞总数"></el-table-column>
            <el-table-column prop="likeUv" label="点赞人数"></el-table-column>
            <el-table-column prop="interactivePv" label="互动总数"></el-table-column>
            <el-table-column prop="userScorePv" label="评分总数"></el-table-column>
            <el-table-column prop="userScoreUv" label="评分人数"></el-table-column>
            <el-table-column prop="userOwnedScorePv" label="已拥有评分总数" width="120"></el-table-column>
            <el-table-column prop="userOwnedScoreUv" label="已拥有评分人数" width="120"></el-table-column>
            <el-table-column prop="unboundShopUserScorePv" label="未绑定商店评分总数" width="160"></el-table-column>
            <el-table-column prop="unboundShopUserScoreUv" label="未绑定商店评分人数" width="160"></el-table-column>
            <el-table-column prop="userTagPv" label="标签总数"></el-table-column>
            <el-table-column prop="userTagUv" label="标签人数"></el-table-column>
        </el-table>
        <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :page-sizes="[10, 20, 50, 100]"
            :current-page="pageIndex + 1"
            :page-size="pageSize"
            layout="total,sizes, prev, pager, next"
            :total="totalCount"
        >
        </el-pagination>
    </div>
</template>

<script>
import valorantApi from "../../api/valorantApi";
import chart from "./valorantInteractionChart.vue";
export default {
    name: "RecommendedNodeCom",
    props: {
        // groupId: Number,
    },
    data() {
        return {
            diagramData: [],
            dataList: [],
            pageIndex: 0,
            pageSize: 10,
            totalCount: 0,
            title: "",
            pickerOptions: {
                shortcuts: [
                    {
                        text: "今天",
                        onClick(picker) {
                            const end = new Date();
                            const start = new Date();
                            picker.$emit("pick", [start, end]);
                        },
                    },
                    {
                        text: "昨天",
                        onClick(picker) {
                            const end = new Date();
                            const start = new Date();
                            start.setTime(start.getTime() - 3600 * 1000 * 24 * 1);
                            picker.$emit("pick", [start, start]);
                        },
                    },
                    {
                        text: "过去7天",
                        onClick(picker) {
                            const end = new Date();
                            const start = new Date();
                            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
                            end.setTime(end.getTime() - 3600 * 1000 * 24 * 1);
                            picker.$emit("pick", [start, end]);
                        },
                    },
                    {
                        text: "过去30天",
                        onClick(picker) {
                            const end = new Date();
                            const start = new Date();
                            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
                            end.setTime(end.getTime() - 3600 * 1000 * 24 * 1);
                            picker.$emit("pick", [start, end]);
                        },
                    },
                    {
                        text: "过去60天",
                        onClick(picker) {
                            const end = new Date();
                            const start = new Date();
                            start.setTime(start.getTime() - 3600 * 1000 * 24 * 60);
                            end.setTime(end.getTime() - 3600 * 1000 * 24 * 1);
                            picker.$emit("pick", [start, end]);
                        },
                    },
                    {
                        text: "过去90天",
                        onClick(picker) {
                            const end = new Date();
                            const start = new Date();
                            start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
                            end.setTime(end.getTime() - 3600 * 1000 * 24 * 1);
                            picker.$emit("pick", [start, end]);
                        },
                    },
                    {
                        text: "过去120天",
                        onClick(picker) {
                            const end = new Date();
                            const start = new Date();
                            start.setTime(start.getTime() - 3600 * 1000 * 24 * 120);
                            end.setTime(end.getTime() - 3600 * 1000 * 24 * 1);
                            picker.$emit("pick", [start, end]);
                        },
                    },
                ],
            },
            datePicker: [],
        };
    },
    created() {
        // 设置开始日期为前30天,结束日期是当前日期,注意使用$set来设置!
        let startDate = this.getThreeDaysAgo();
        let endDate = this.getToday();
        this.$set(this, "datePicker", [startDate, endDate]);
    },
    mounted() {
        this.title = "无畏契约皮肤库互动统计";
        this.getChartDiagramData();
        this.getDiagramData();
    },
    methods: {
        // 获取折线图数据
        getChartDiagramData() {
            let { pageIndex, pageSize, datePicker } = this;
            let paramsData = {
                isTotal: true,
                pageIndex: 0,
                pageSize: 30,
                beginTime: datePicker[0],
                endTime: datePicker[1],
            };
            valorantApi.getInteractiveStatistics(paramsData).then((res) => {
                if(!res.error){
                    this.diagramData = res.list || [];
                }else{
                    this.$message({
                        message: res.message,
                        type: "warning",
                    });
                }
                // if (res.code == 0) {
                //     this.diagramData = res.list;
                // } else if (res.code == 403) {
                //     this.$message({
                //         message: res.message,
                //         type: "warning",
                //     });
                //     this.$loginOut();
                // }
            });
        },
        // 获取列表数据
        getDiagramData() {
            let { pageIndex, pageSize, datePicker } = this;
            let paramsData = {
                isTotal: false,
                pageIndex: pageIndex,
                pageSize: pageSize,
                beginTime: datePicker[0],
                endTime: datePicker[1],
            };
            valorantApi.getInteractiveStatistics(paramsData).then((res) => {
                if(!res.error) {
                    var dataList = res.list || [];
                    var monthSum = [res.dateSum || []];
                    this.dataList = monthSum.concat(dataList);
                    this.totalCount = res.total;
                }else{
                    this.$message({
                        message: res.message,
                        type: "warning",
                    });
                }
                // if (res.code == 0) {
                //     // this.diagramData = res.data.list;
                //     var dataList = res.data.list;
                //     var monthSum = [res.data.dataSum];
                //     this.dataList = monthSum.concat(dataList);
                //     this.totalCount = res.data.totalCount;
                // } else if (res.code == 403) {
                //     this.$message({
                //         message: res.message,
                //         type: "warning",
                //     });
                //     this.$loginOut();
                // }
            });
        },

        //选择日期
        datePickerChange() {
            this.pageIndex = 0;
            this.getDiagramData();
            this.getChartDiagramData();
        },

        // 获取当前日期
        getToday() {
            //获取当前日期
            let myDate = new Date();
            let nowY = myDate.getFullYear();
            let nowM = myDate.getMonth() + 1;
            let nowD = myDate.getDate();
            let endDate = nowY + "-" + (nowM < 10 ? "0" + nowM : nowM) + "-" + (nowD < 10 ? "0" + nowD : nowD); //当前日期
            return endDate;
        },

        // 获取三十天之前的日期
        getThreeDaysAgo() {
            let myDate = new Date();
            let lw = new Date(myDate - 1000 * 60 * 60 * 24 * 30); //最后一个数字30可改，30天的意思
            let lastY = lw.getFullYear();
            let lastM = lw.getMonth() + 1;
            let lastD = lw.getDate();
            let startData = lastY + "-" + (lastM < 10 ? "0" + lastM : lastM) + "-" + (lastD < 10 ? "0" + lastD : lastD); //三十天之前日期
            return startData;
        },

        // 改变每页显示数量
        handleSizeChange(size) {
            this.pageSize = size;
            this.pageIndex = 0;
            this.getDiagramData();
        },
        // 改变当前页
        handleCurrentChange(page) {
            this.pageIndex = page - 1;
            this.getDiagramData();
        },
    },
    components: { chart },
    watch: {
        // groupId(newDate) {
        //     this.getChartDiagramData();
        //     this.getDiagramData();
        // }
        "$route.meta": function(newVal) {
            let title = newVal.title;
            switch (title) {
                case "常规节点":
                    this.groupId = 2;
                    break;
                case "头条推荐位":
                    this.groupId = 4;
                    break;
            }
            this.getChartDiagramData();
            this.getDiagramData();
        },
    },
};
</script>

<style lang="scss" scoped>
.recommendedNodeCom {
    background: #fff;
    border-radius: 4px;
    height: 100%;
    overflow-x: hidden;
    // overflow-y: scroll;
    padding-bottom: 20px;
    .header {
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
    h3 {
        font-size: 18px;
        font-weight: bold;
        color: #222;
        line-height: 24px;
        margin-bottom: 32px;
    }
    .dataTable::-webkit-scrollbar-track {
        /*滚动条里面轨道*/
        box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
        background: #ededed;
        border-radius: 10px;
    }
    /deep/ .el-table--scrollable-y .el-table__body-wrapper::-webkit-scrollbar {
        display: none; /* Chrome Safari */
    }

    /deep/ .el-table--scrollable-y .el-table__body-wrapper {
        scrollbar-width: none; /* firefox */
        -ms-overflow-style: none; /* IE 10+ */
        overflow-x: hidden;
        overflow-y: auto;
    }
}
</style>
