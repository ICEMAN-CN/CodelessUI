<template>
    <div class="chart">
        <div id="statisticsChart"></div>
    </div>
</template>

<script>
let echarts = require("echarts");
require("echarts/lib/chart/line");
require("echarts/lib/chart/bar");
require("echarts/lib/component/tooltip");
require("echarts/lib/component/title");
require("echarts/lib/component/legend");
export default {
    name: "HeadlinesFlowChart",
    props: {
        diagramData: Array,
    },
    data() {
        return {
            diagramList: this.diagramData,
            headlineRequestUvList: [], //
            headlineRequestContentUpdatePvList: [], //
            headlineRequestTotalPvList: [],
            viewUvList: [], // 点击UV
            contentViewCountList: [], // 内容点击篇数
            viewPvList: [], // 点击PV
            clickPv_1_5List: [], //
            clickPv_6_10List: [], //
            clickPv_11_plusList: [], //
            dateList: [], // X轴
        };
    },
    mounted() {
        this.handleDiagramList();
        // this.createChart();
    },
    methods: {
        handleDiagramList() {
            let listFlag = this.diagramList;
            this.headlineRequestUvList = [];
            this.headlineRequestContentUpdatePvList = [];
            this.headlineRequestTotalPvList = [];
            this.viewUvList = [];
            this.contentViewCountList = [];
            this.viewPvList = [];
            this.clickPv_1_5List = [];
            this.clickPv_6_10List = [];
            this.clickPv_11_plusList = [];
            this.dateList = [];
            var datakeylist = [
                {
                    list: "headlineRequestUvList",
                    key: 'headlineRequestUv',
                    color: "#5470C6"
                },
                {
                    list: "headlineRequestContentUpdatePvList",
                    key: 'headlineRequestContentUpdatePv',
                    color: "#FBD580"
                },
                {
                    list: "headlineRequestTotalPvList",
                    key: 'headlineRequestTotalPv',
                    color: "#91CC75"
                },
                {
                    list: "viewUvList",
                    key: 'clickUv',
                    color: "#FAC858"
                },
                {
                    list: "contentViewCountList",
                    key: 'clickContentCount',
                    color: "#73C0DE"
                },
                {
                    list: "viewPvList",
                    key: 'clickPv',
                    color: "#3BA272"
                },
                {
                    list: "clickPv_1_5List",
                    key: 'clickPv_1_5',
                    color: "#FC8452"
                },
                {
                    list: "clickPv_6_10List",
                    key: 'clickPv_6_10',
                    color: "#9A60B4"
                },
                {
                    list: "clickPv_11_plusList",
                    key: 'clickPv_11_plus',
                    color: "#EA7CCC"
                },

            ]
            for (let i = listFlag.length - 1; i >= 0; i--) {
                if (new Date(listFlag[i].date).getDay() % 6 == 0) {
                    datakeylist.forEach((element) => {

                        this[element.list].push({
                            value: listFlag[i][element.key],
                            symbol: "circle",
                            symbolSize: 6,
                            itemStyle: {
                                color: element.color,
                                borderColor: element.color,
                                borderWidth: 1.5
                            },
                            emphasis: {
                                disabled: false,
                                itemStyle: {
                                    color: element.color,
                                    borderColor: "#ffffff",
                                    borderWidth: 1.5,
                                    shadowColor: 'rgba(0,0,0,.3)', // 添加投影颜色  
                                    shadowBlur: 9 // 添加投影模糊度  
                                }
                            }
                        });

                    });
                } else {
                    datakeylist.forEach((element) => {
                        this[element.list].push({
                            value: listFlag[i][element.key],
                            symbolSize: 6,
                            itemStyle: {
                                color: element.color,
                                borderColor: element.color,
                            },
                            emphasis: {
                                itemStyle: {
                                    color: element.color,
                                    borderColor: "#ffffff",
                                    borderWidth: 1.5,
                                    shadowColor: 'rgba(0,0,0,.3)', // 添加投影颜色  
                                    shadowBlur: 9 // 添加投影模糊度  
                                },
                            }
                        });
                    });
                }

                // this.headlineRequestUvList.push(listFlag[i].headlineRequestUv);
                // this.headlineRequestContentUpdatePvList.push(listFlag[i].headlineRequestContentUpdatePv);
                // this.headlineRequestTotalPvList.push(listFlag[i].headlineRequestTotalPv);
                // this.viewUvList.push(listFlag[i].clickUv);
                // this.contentViewCountList.push(listFlag[i].clickContentCount);
                // this.viewPvList.push(listFlag[i].clickPv);
                // this.clickPv_1_5List.push(listFlag[i].clickPv_1_5);
                // this.clickPv_6_10List.push(listFlag[i].clickPv_6_10);
                // this.clickPv_11_plusList.push(listFlag[i].clickPv_11_plus);

                this.dateList.push(listFlag[i].date);
            }
            this.createChart();
        },
        createChart() {
            let that = this;
            var chartDom = document.getElementById("statisticsChart");
            var mychart = echarts.init(chartDom);
            var option;

            let {
                headlineRequestUvList,
                headlineRequestContentUpdatePvList,
                headlineRequestTotalPvList,
                viewUvList,
                contentViewCountList,
                viewPvList,
                clickPv_1_5List,
                clickPv_6_10List,
                clickPv_11_plusList,
                dateList,
            } = this;
            mychart.clear();
            option = {
                title: {
                    text: "",
                },
                tooltip: {
                    trigger: "axis",
                    renderMode: "html",
                    extraCssText: "width:300px;",
                    className: "echarts-tooltip",
                    formatter: function (params) {
                        let html = "";
                        html += '<div class="tooltipBox">';
                        html += '<div class="tooltipTitle">' + params[0].name + "</div>";
                        params.forEach((item) => {
                            html += '<div class="tooltipLi">';
                            html += '<span class="tooltipKey"><i style="background-color:' + item.color + ';"></i>' + item.seriesName + "</span>";
                            html += '<span class="tooltipValue">' + item.value;
                            html += "</span>";
                            html += "</div>";
                        });
                        html += "</div>";
                        return html;
                    },
                    position: function (point, params, dom, rect, size) {
                        // 提示框位置
                        var x = 0; // x坐标位置
                        var y = 0; // y坐标位置

                        // 当前鼠标位置
                        var pointX = point[0];
                        var pointY = point[1];

                        // 提示框大小
                        var boxWidth = size.contentSize[0];
                        var boxHeight = size.contentSize[1];

                        // boxWidth > pointX 说明鼠标左边放不下提示框
                        if (boxWidth > pointX) {
                            x = pointX + 5;

                        } else {
                            // 左边放的下
                            x = pointX - boxWidth;
                        }

                        // boxHeight > pointY 说明鼠标上边放不下提示框
                        if (boxHeight > pointY) {
                            y = 5;
                        } else {
                            // 上边放得下
                            y = pointY - boxHeight;
                        }

                        return [x, y];
                    }
                },
                legend: {
                    y: "bottom",
                    // padding: [0, 0, 0, 0],
                    bottom: 0,
                    itemGap: 15,// 设置图释项之间的间距值
                    itemHeight: 9,// 设置图释项圆圈的高度
                    data: ["头条请求UV", "头条请求PV-A（总）", "头条请求PV-B（有新内容）", "点击UV", "点击篇数", "点击PV", "点击PV（前5条）", "点击PV（6～10条）", "点击PV（11条之后）"],
                },
                grid: {
                    left: "20px",
                    right: "20px",
                    bottom: "58px",
                    containLabel: true,
                },
                toolbox: {
                    feature: {},
                },
                xAxis: {
                    type: "category",
                    boundaryGap: false,
                    data: dateList,
                },
                yAxis: [
                    {
                        type: "value",
                    }
                    ,
                    {
                        type: "value",
                        position: 'left',
                        axisLabel: {
                            show: true,
                            interval: "auto",
                            formatter: "{value}",
                        },
                        show: true,
                    },
                ],
                series: [
                    {
                        name: "头条请求UV",
                        type: "line",
                        yAxisIndex: 1,
                        data: headlineRequestUvList,
                        animation: false,

                    },
                    {
                        name: "头条请求PV-A（总）",
                        type: "line",
                        yAxisIndex: 1,
                        // stack: 'Total',
                        data: headlineRequestTotalPvList,
                        animation: false,

                    },
                    {
                        name: "头条请求PV-B（有新内容）",
                        type: "line",
                        yAxisIndex: 1,
                        // stack: 'Total',
                        data: headlineRequestContentUpdatePvList,
                        animation: false,

                    },
                    {
                        name: "点击UV",
                        type: "line",
                        yAxisIndex: 1,
                        // stack: 'Total',
                        data: viewUvList,
                        animation: false,

                    },
                    {
                        name: "点击篇数",
                        type: "line",
                        yAxisIndex: 1,
                        // stack: 'Total',
                        data: contentViewCountList,
                        animation: false,

                    },
                    {
                        name: "点击PV",
                        type: "line",
                        yAxisIndex: 1,
                        // stack: 'Total',
                        data: viewPvList,
                        animation: false,

                    },
                    {
                        name: "点击PV（前5条）",
                        type: "line",
                        yAxisIndex: 1,
                        // stack: 'Total',
                        data: clickPv_1_5List,
                        animation: false,

                    },
                    {
                        name: "点击PV（6～10条）",
                        type: "line",
                        yAxisIndex: 1,
                        // stack: 'Total',
                        data: clickPv_6_10List,
                        animation: false,

                    },
                    {
                        name: "点击PV（11条之后）",
                        type: "line",
                        yAxisIndex: 1,
                        // stack: 'Total',
                        data: clickPv_11_plusList,
                        animation: false,

                    }
                ],
            };
            mychart.resize()
            option && mychart.setOption(option);
           
        },
    },
    watch: {
        diagramData: {
            handler(newData) {
                this.diagramList = newData;
                this.$nextTick(() => {
                    this.handleDiagramList();
                });
            },
            immediate: true,
        },
    },
    components: {},
};
</script>

<style lang="scss" scoped>
.chart {
    #statisticsChart {
        width: calc(100% - 20px);
        height: 500px;
        margin-bottom: 40px;
    }
}
</style>
