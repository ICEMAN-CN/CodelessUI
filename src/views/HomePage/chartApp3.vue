<template>
    <div class="chart">
        <div id="statisticsChart3"></div>
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
    name: "ChartApp3",
    props: {
        diagramData: Array,

    },
    data() {
        return {
            diagramList: this.diagramData,
            dateList: [], // X轴
            emailButton1PvList: [],
            emailButton2PvList: [],
            emailButton1UvList: [],
            emailButton2UvList: [],
            webButton1PvList: [],
            webButton2PvList: [],
            webButton1UvList: [],
            webButton2UvList: [],
        };
    },
    mounted() {
        this.handleDiagramList();
        // this.createChart();
    },
    methods: {
        handleDiagramList() {
            let listFlag = this.diagramList;
            console.log("listFlag")
          console.log(listFlag)
            this.emailButton1PvList = [],
            this.emailButton2PvList = [],
            this.emailButton1UvList = [],
            this.emailButton2UvList = [],
            this.webButton1PvList = [],
            this.webButton2PvList = [],
            this.webButton1UvList = [],
            this.webButton2UvList = [],
            this.dateList = [];
            var datakeylist = [
                {
                    list: "emailButton1PvList",
                    key: 'emailButton1Pv',
                    color: "#3B82FE"
                },
                {
                    list: "emailButton2PvList",
                    key: 'emailButton2Pv',
                    color: "#FC9B41"
                },
                {
                    list: "emailButton1UvList",
                    key: 'emailButton1Uv',
                    color: "#7968D5"
                },
                {
                    list: "emailButton2UvList",
                    key: 'emailButton2Uv',
                    color: "#FFC765"
                },
                {
                    list: "webButton1PvList",
                    key: 'webButton1Pv',
                    color: "#19A8A9"
                },
                {
                    list: "webButton2PvList",
                    key: 'webButton2Pv',
                    color: "#F17976"
                },
                {
                    list: "webButton1UvList",
                    key: 'webButton1Uv',
                    color: "#AADF8A"
                },
                {
                    list: "webButton2UvList",
                    key: 'webButton2Uv',
                    color: "#8997EE"
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
            var chartDom = document.getElementById("statisticsChart3");
            var mychart = echarts.init(chartDom);
            var option;
            let {
              emailButton1PvList,
              emailButton2PvList,
              emailButton1UvList,
              emailButton2UvList,
              webButton1PvList,
              webButton2PvList,
              webButton1UvList,
              webButton2UvList,
              dateList,
            } = this;
            mychart.clear();
            option = {
                title: {
                    text: "",
                },
                color: [
                  "#3B82FE",
                  "#FC9B41",
                  "#7968D5",
                  "#FFC765",
                  "#19A8A9",
                  "#F17976",
                  "#AADF8A",
                  "#8997EE",
                  "#41CC9A",
                  "#B0BBDC",
                  "#50A8F7",
                  "#86D044",
                  "#3C5DFC",
                  "#C554C7",
                ],
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
                            html += '<span class="tooltipValue" style="float: right">' + item.value;
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
                    selected: {
                      "邮件-按钮1-PV": true,
                      "邮件-按钮2-PV": true,
                      "邮件-按钮1-UV": true,
                      "邮件-按钮2-UV": true,
                      "网页-按钮1-PV": true,
                      "网页-按钮2-PV": true,
                      "网页-按钮1-UV": true,
                      "网页-按钮2-UV": true,
                    },
                    data: [
                      "邮件-按钮1-PV",
                      "邮件-按钮2-PV",
                      "邮件-按钮1-UV",
                      "邮件-按钮2-UV",
                      "网页-按钮1-PV",
                      "网页-按钮2-PV",
                      "网页-按钮1-UV",
                      "网页-按钮2-UV",
                    ],
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
                        alignTicks: true
                    },
                    {
                        type: "value",
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
                        name: "邮件-按钮1-PV",
                        type: "line",
                        yAxisIndex: 0,
                        data: emailButton1PvList,
                        animation: false,
                    },
                    {
                        name: "邮件-按钮2-PV",
                        type: "line",
                        yAxisIndex: 0,
                        // stack: 'Total',
                        data: emailButton2PvList,
                        animation: false,

                    },
                    {
                        name: "邮件-按钮1-UV",
                        type: "line",
                        yAxisIndex: 0,
                        stack: "Total",
                        data: emailButton1UvList,
                        animation: false,

                    },
                    {
                        name: "邮件-按钮2-UV",
                        type: "line",
                        yAxisIndex: 0,
                        // stack: 'Total',
                        data: emailButton2UvList,
                        animation: false,

                    },
                    {
                        name: "网页-按钮1-PV",
                        type: "line",
                        yAxisIndex: 0,
                        // stack: 'Total',
                        data: webButton1PvList,
                        animation: false,

                    },
                    {
                        name: "网页-按钮2-PV",
                        type: "line",
                        yAxisIndex: 0,
                        // stack: 'Total',
                        data: webButton2PvList,
                        animation: false,

                    },
                    {
                        name: "网页-按钮1-UV",
                        type: "line",
                        yAxisIndex: 0,
                        // stack: 'Total',
                        data: webButton1UvList,
                        animation: false,

                    },
                    {
                        name: "网页-按钮2-UV",
                        type: "line",
                        yAxisIndex: 0,
                        // stack: 'Total',
                        data: webButton2UvList,
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
              console.log("diagramData")
              console.log("newData")
              console.log(newData)
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
    #statisticsChart3 {
        width: 100%;
        height: 500px;
        margin-bottom: 40px;
    }
}
</style>
