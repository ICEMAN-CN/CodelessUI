<template>
    <div class="recommendedNodeCom boxWrap">
        <div class="header">
            <div class="header_title">
                <h3>{{ $route.meta.title }}</h3>
                <div class="QuestionInfo">
                    <div class="gsTooltip">
                        <img src="../../assets/image/question.png" />
                        <div class="content">
                            <b>曝光PV：</b>多少次文章露出在用户屏幕内<br />
                            <b>曝光UV：</b>文章露出在多少用户（设备ID）的屏幕内<br />
                            <b>点击PV：</b>多少次文章被点击<br />
                            <b>点击UV：</b>多少人（设备ID）点击了文章<br />
                            <b>点击率（PV）：</b>点击PV/曝光PV<br />
                            <b>点击率（UV）：</b>点击UV/曝光UV<br />
                            <b>内容浏览篇数：</b>总共有多少篇不重的内容被浏览过<br />
                           
                            <div ref="tooltipContentBtm"></div>
                            <div ref="tooltipContentTop"></div>
                        </div>
                    </div>
                </div>
            </div>
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
            <el-table-column prop="recommendCount" label="曝光PV" width="180"></el-table-column>
            <el-table-column prop="recommendUv" label="曝光UV"></el-table-column>
            <el-table-column prop="successRecommendCount" label="点击PV"></el-table-column>
            <el-table-column prop="successRecommendUv" label="点击UV"></el-table-column>
            <el-table-column prop="successRecommendRate" label="点击率(PV)">
                <template slot-scope="{ row }"> {{ row.successRecommendRate }}% </template>
            </el-table-column>
            <el-table-column prop="successRecommendUserRate" label="点击率(UV)">
                <template slot-scope="{ row }"> {{ row.successRecommendUvRate }}% </template>
            </el-table-column>
            <el-table-column prop="regularClickContentCount" label="内容浏览篇数"></el-table-column>
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
import contentpoolstatisticsApi from "../../api/contentpoolstatistics";
import chart from "./chart.vue";
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
                            end.setTime(end.getTime() - 3600 * 1000 * 24 * 1)
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
        let title = this.$route.meta.title;
        this.title = title;
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
    methods: {
        // 获取折线图数据
        getChartDiagramData() {
            let { pageIndex, pageSize, datePicker } = this;
            let paramsData = {
                groupId: this.groupId,
                isTotal: true,
                pageIndex: 0,
                pageSize: 30,
                beginTime: datePicker[0],
                endTime: datePicker[1],
            };
            contentpoolstatisticsApi.diagramData(paramsData).then((res) => {
                if (res.code == 0) {
                    this.diagramData = res.data.list;
                } else if (res.code == 403) {
                    this.$message({
                        message: res.message,
                        type: "warning",
                    });
                    this.$loginOut();
                }
            });
        },
        // 获取列表数据
        getDiagramData() {
            let { pageIndex, pageSize, datePicker } = this;
            let paramsData = {
                groupId: this.groupId,
                isTotal: false,
                pageIndex: pageIndex,
                pageSize: pageSize,
                beginTime: datePicker[0],
                endTime: datePicker[1],
            };
            contentpoolstatisticsApi.diagramData(paramsData).then((res) => {
                if (res.code == 0) {
                    // this.diagramData = res.data.list;
                    var dataList = res.data.list;
                    var monthSum = [res.data.dataSum];
                    this.dataList = monthSum.concat(dataList);
                    this.totalCount = res.data.totalCount;
                } else if (res.code == 403) {
                    this.$message({
                        message: res.message,
                        type: "warning",
                    });
                    this.$loginOut();
                }
            });
        },

        //选择日期
        datePickerChange() {
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
    .header_title {
        display: flex;
        .QuestionInfo{
            margin: 3px 0 0 10px;
            width: 16px;
            cursor: pointer;
        }
    }
    h3 {
        font-size: 18px;
        font-weight: bold;
        color: #222;
        line-height: 24px;
        // margin-bottom: 32px;
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
