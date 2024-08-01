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
    name: "Chart",
    props: {
        diagramData: Array,
    },
    data() {
        return {
            diagramList: this.diagramData,
            recommendCountList: [], // 曝光次数
            recommendUserList: [], // 曝光UV
            successRecommendCountList: [], // 点击次数
            successRecommendUserList: [], // 点击UV
            successRecommendRateList: [], // 点击率（次数）
            successRecommendUserRateList: [], // 点击率（人数）
            contentViewCountList: [], // 内容点击篇数
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
            this.recommendCountList = [];
            this.recommendUserList = [];
            this.successRecommendCountList = [];
            this.successRecommendUserList = [];
            this.successRecommendRateList = [];
            this.successRecommendUserRateList = [];
            this.contentViewCountList = [];
            this.dateList = [];
            var datakeylist = [
                {
                    list: "recommendCountList",
                    key: 'recommendCount',
                    color: "#5470C6"
                },
                {
                    list: "recommendUserList",
                    key: 'recommendUv',
                    color: "#91CC75"
                },
                {
                    list: "successRecommendCountList",
                    key: 'successRecommendCount',
                    color: "#FAC858"
                },
                {
                    list: "successRecommendUserList",
                    key: 'successRecommendUv',
                    color: "#EE6666"
                },
                {
                    list: "successRecommendRateList",
                    key: 'successRecommendRate',
                    color: "#73C0DE"
                },
                {
                    list: "successRecommendUserRateList",
                    key: 'successRecommendUvRate',
                    color: "#3BA272"
                },
                {
                    list: "contentViewCountList",
                    key: 'contentViewCount',
                    color: "#FC8452"
                }
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
                recommendCountList,
                recommendUserList,
                successRecommendCountList,
                successRecommendUserList,
                successRecommendRateList,
                successRecommendUserRateList,
                contentViewCountList,
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
                            if (item.seriesName.indexOf('率') != -1) {
                                html += "%";
                            }
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
                    padding: [0, 0, 0, 0],
                    bottom: 0,
                    itemGap: 15,// 设置图释项之间的间距值
                    itemHeight: 9,// 设置图释项圆圈的高度
                    data: ["曝光次数", "曝光UV", "点击次数", "点击UV", "点击率(次数)", "点击率(人数)", "内容点击篇数"],
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
                        alignTicks: true,
                    },
                    {
                        type: "value",
                        alignTicks: true,
                        axisLabel: {
                            show: true,
                            interval: "auto",
                            formatter: "{value} %",
                        },
                        show: true,
                    },
                ],
                series: [
                    {
                        name: "曝光次数",
                        type: "line",
                        yAxisIndex: 0,
                        data: recommendCountList,
                        animation: false,

                    },
                    {
                        name: "曝光UV",
                        type: "line",
                        yAxisIndex: 0,
                        // stack: 'Total',
                        data: recommendUserList,
                        animation: false,

                    },
                    {
                        name: "点击次数",
                        type: "line",
                        yAxisIndex: 0,
                        // stack: 'Total',
                        data: successRecommendCountList,
                        animation: false,

                    },
                    {
                        name: "点击UV",
                        type: "line",
                        yAxisIndex: 0,
                        // stack: 'Total',
                        data: successRecommendUserList,
                        animation: false,

                    },
                    {
                        name: "点击率(次数)",
                        type: "line",
                        yAxisIndex: 1,
                        // stack: 'Total',
                        data: successRecommendRateList,
                        animation: false,

                    },
                    {
                        name: "点击率(人数)",
                        type: "line",
                        yAxisIndex: 1,
                        // stack: 'Total',
                        data: successRecommendUserRateList,
                        animation: false,

                    },
                    {
                        name: "内容点击篇数",
                        type: "line",
                        yAxisIndex: 0,
                        // stack: 'Total',
                        data: contentViewCountList,
                        animation: false,

                    },
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
        width: 100%;
        height: 500px;
        margin-bottom: 40px;
    }
}
</style>
