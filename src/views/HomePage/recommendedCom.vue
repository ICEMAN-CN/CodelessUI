<template>
    <div class="recommendedNodeCom boxWrap">
      <div style="height: 50%; margin-top: 20px">
        <div class="header">
          <div class="header_title">
            <h3>来源、按钮-重复点击天维度</h3>
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
                @change="datePickerChange1"
                format="yyyy-MM-dd"
                value-format="yyyy-MM-dd"
                size="small"
            >
            </el-date-picker>
          </div>
        </div>
        <chart-app style="width: 100%" :diagramData="repeatOpenButtonDayDiagramData" ></chart-app>
      </div>

      <el-divider></el-divider>
      <div style="height: 50%; margin-top: 20px">
        <div class="header">
          <div class="header_title">
            <h3>来源-重复点击天维度</h3>
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
                @change="datePickerChange2"
                format="yyyy-MM-dd"
                value-format="yyyy-MM-dd"
                size="small"
            >
            </el-date-picker>
          </div>
        </div>
        <chart-app2 :diagramData="repeatOpenRefDayDiagramData" ></chart-app2>
      </div>

      <el-divider></el-divider>
      <div style="height: 50%; margin-top: 20px">
        <div class="header">
          <div class="header_title">
            <h3>来源、按钮-首次点击天维度</h3>
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
                @change="datePickerChange3"
                format="yyyy-MM-dd"
                value-format="yyyy-MM-dd"
                size="small"
            >
            </el-date-picker>
          </div>
        </div>
        <chart-app3 :diagramData="firstOpenButtonDayDiagramData" ></chart-app3>
      </div>

      <el-divider></el-divider>
      <div style="height: 50%; margin-top: 20px">
        <div class="header">
          <div class="header_title">
            <h3>来源-首次点击天维度</h3>
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
                @change="datePickerChange4"
                format="yyyy-MM-dd"
                value-format="yyyy-MM-dd"
                size="small"
            >
            </el-date-picker>
          </div>
        </div>
        <chart-app4 :diagramData="firstOpenRefDayDiagramData" ></chart-app4>

        <el-divider></el-divider>
        <div class="header_title"><h3>按钮总点击来源分布-重复打开</h3></div>
        <el-table :data="repeatOpenButtonTotalData" stripe style="width: 100%;margin-top:30px"
                  :header-cell-style="{ background: '#F5F7F9', color: '#222222' }">
          <el-table-column v-for="(item, index) in rows1" :label="item.name" :prop="item.key"></el-table-column>
        </el-table>

        <el-divider></el-divider>
        <div class="header_title"><h3>点击来源分布-重复打开</h3></div>
        <el-table :data="repeatOpenRefTotalData" stripe style="width: 100%;margin-top:30px"
                  :header-cell-style="{ background: '#F5F7F9', color: '#222222' }">
          <el-table-column v-for="(item, index) in rows2" :label="item.name" :prop="item.key"></el-table-column>
        </el-table>

        <el-divider></el-divider>
        <div class="header_title"><h3>按钮总点击来源分布-首次打开</h3></div>
        <el-table :data="firstOpenButtonTotalData" stripe style="width: 100%;margin-top:30px"
                  :header-cell-style="{ background: '#F5F7F9', color: '#222222' }">
          <el-table-column v-for="(item, index) in rows3" :label="item.name" :prop="item.key"></el-table-column>
        </el-table>

        <el-divider></el-divider>
        <div class="header_title"><h3>点击来源分布-首次打开</h3></div>
        <el-table :data="firstOpenRefTotalData" stripe style="width: 100%;margin-top:30px"
                  :header-cell-style="{ background: '#F5F7F9', color: '#222222' }">
          <el-table-column v-for="(item, index) in rows4" :label="item.name" :prop="item.key"></el-table-column>
        </el-table>
        <el-divider></el-divider>
        <div class="header_title"><h3>来源-邮箱打开次数排名倒序</h3></div>
        <el-table :data="emailClickTotalData" stripe style="width: 100%;margin-top:30px"
                  :header-cell-style="{ background: '#F5F7F9', color: '#222222' }">
          <el-table-column v-for="(item, index) in rows5" :label="item.name" :prop="item.key"></el-table-column>
        </el-table>

        <el-divider></el-divider>
        <div class="header_title"><h3>按钮、来源-邮箱打开次数排名倒序top10</h3></div>
        <el-table :data="emailClickButtonTotalData" stripe style="width: 100%;margin-top:30px"
                  :header-cell-style="{ background: '#F5F7F9', color: '#222222' }">
          <el-table-column v-for="(item, index) in rows5" :label="item.name" :prop="item.key"></el-table-column>
        </el-table>
      </div>
    </div>
</template>

<script>
import chartApp from './chartApp.vue';
import chartApp2 from './chartApp2.vue';
import chartApp3 from './chartApp3.vue';
import chartApp4 from './chartApp4.vue';
import userApi from "../../api/userApi";
export default {
    name: "RecommendedCom",
    props: {
    },
    data() {
        return {
            repeatOpenButtonDayDiagramData: [],
            repeatOpenRefDayDiagramData: [],
            firstOpenButtonDayDiagramData: [],
            firstOpenRefDayDiagramData: [],

          repeatOpenButtonTotalData: [],
          rows1: [
            { key: 'businessCode', name: "业务方编码", width: 150 },
            { key: 'refSource', name: "点击来源", width: 180 },
            { key: 'clIdButton', name: "按钮", width: 80 },
            { key: 'pv', name: "点击次数", width: 150 },
            { key: 'uv', name: "点击人数", width: 150 },
          ],
          repeatOpenRefTotalData: [],
          rows2: [
            { key: 'businessCode', name: "业务方编码", width: 150 },
            { key: 'refSource', name: "点击来源", width: 180 },
            { key: 'pv', name: "点击次数", width: 150 },
            { key: 'uv', name: "点击人数", width: 150 },
          ],
          firstOpenButtonTotalData: [],
          rows3: [
            { key: 'businessCode', name: "业务方编码", width: 150 },
            { key: 'refSource', name: "点击来源", width: 180 },
            { key: 'clIdButton', name: "按钮", width: 80 },
            { key: 'pv', name: "点击次数", width: 150 },
            { key: 'uv', name: "点击人数", width: 150 },
          ],
          firstOpenRefTotalData: [],
          rows4: [
            { key: 'businessCode', name: "业务方编码", width: 150 },
            { key: 'refSource', name: "点击来源", width: 180 },
            { key: 'pv', name: "点击次数", width: 150 },
            { key: 'uv', name: "点击人数", width: 150 },
          ],
          emailClickTotalData: [],
          rows5: [
            { key: 'businessCode', name: "业务方编码", width: 150 },
            { key: 'refSource', name: "点击来源", width: 180 },
            { key: 'customerEmail', name: "客户邮箱", width: 150 },
            { key: 'pv', name: "点击次数", width: 150 },
          ],
          emailClickButtonTotalData: [],
          rows6: [
            { key: 'businessCode', name: "业务方编码", width: 150 },
            { key: 'refSource', name: "点击来源", width: 180 },
            { key: 'clIdButton', name: "按钮", width: 80 },
            { key: 'customerEmail', name: "客户邮箱", width: 150 },
            { key: 'pv', name: "点击次数", width: 150 },
          ],
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
      // repeatOpenButtonDay、repeatOpenRefDay、repeatOpenButtonTotal、repeatOpenRefTotal
      // firstOpenButtonDay、firstOpenRefDay、firstOpenButtonTotal、firstOpenRefTotal
      // emailClickTotal、emailClickButtonTotal
        this.getDay("repeatOpenButtonDay");
        this.getDay("repeatOpenRefDay");
        this.getDay("firstOpenButtonDay");
        this.getDay("firstOpenRefDay");

        this.getTotal("repeatOpenButtonTotal");
        this.getTotal("repeatOpenRefTotal");
        this.getTotal("firstOpenButtonTotal");
        this.getTotal("firstOpenRefTotal");
        this.getTotal("emailClickTotal");
        this.getTotal("emailClickButtonTotal");
    },
    methods: {
        // 获取折线图数据
        getDay(statisticsType) {
            let { pageIndex, pageSize,datePicker } = this;
            let paramsData = {
              statisticsType: statisticsType,
              businessCode: "google",
                beginTime:datePicker[0],
                endTime:datePicker[1]
            }
          userApi
              .dayStatistics(paramsData)
              .then((response) => {
                if (response.code == 0) {
                  switch (statisticsType) {
                    case "repeatOpenButtonDay":
                      this.repeatOpenButtonDayDiagramData = response.data.list;
                      break;
                    case "repeatOpenRefDay":
                      this.repeatOpenRefDayDiagramData = response.data.list;
                      break;
                    case "firstOpenButtonDay":
                      this.firstOpenButtonDayDiagramData = response.data.list;
                      break;
                    case "firstOpenRefDay":
                      this.firstOpenRefDayDiagramData = response.data.list;
                      break;
                  }
                } else {
                  this.$message.error(response.message);
                }
              });
        },
        getTotal(statisticsType){
          let { pageIndex, pageSize,datePicker } = this;
          let paramsData = {
            statisticsType: statisticsType,
            businessCode: "google",
            beginTime:datePicker[0],
            endTime:datePicker[1]
          }
          userApi
              .totalStatistics(paramsData)
              .then((response) => {
                if (response.code == 0) {
                  switch (statisticsType) {
                    case "repeatOpenButtonTotal":
                      this.repeatOpenButtonTotalData = response.data.list;
                      break;
                    case "repeatOpenRefTotal":
                      this.repeatOpenRefTotalData = response.data.list;
                      break;
                    case "firstOpenButtonTotal":
                      this.firstOpenButtonTotalData = response.data.list;
                      break;
                    case "firstOpenRefTotal":
                      this.firstOpenRefTotalData = response.data.list;
                      break;
                    case "emailClickTotal":
                      this.emailClickTotalData = response.data.list;
                      break;
                    case "emailClickButtonTotal":
                      this.emailClickButtonTotalData = response.data.list;
                      break;
                  }
                } else {
                  this.$message.error(response.message);
                }
              });
        },

        //选择日期
        datePickerChange1() {
            this.getDay("repeatOpenButtonDay");
        },
      datePickerChange2() {
        this.getDay("repeatOpenRefDay");
      },
      datePickerChange3() {
        this.getDay("firstOpenButtonDay");
      },
      datePickerChange4() {
        this.getDay("firstOpenRefDay");
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
            let lw = new Date(myDate - 1000 * 60 * 60 * 24 * 7); //最后一个数字30可改，30天的意思
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
    components: { chartApp, chartApp2, chartApp3, chartApp4 },
};
</script>

<style lang="scss" scoped>
.recommendedNodeCom {
    background: #fff;
    border-radius: 4px;
    height: 100%;
    width: 80%;
    overflow-x: hidden;
    // overflow-y: scroll;
  margin-left: 10%;
  margin-right: 10%;
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
