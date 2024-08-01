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
    name: "ChartSlideApp",
    props: {
        diagramData: Array,
    },
    data() {
        return {
            diagramList: this.diagramData,
            dateList: [], // X轴

            recommendRequestUvList: [], //推荐位请求IP
            recommendRequestPvList: [], //推荐位请求PV
            successRecommendUserList: [], //成功推荐IP
            successRecommendCountList: [], //成功推荐方案数
            recommendSuccessPv: [], //成功推荐PV
            recommendUserList: [], //曝光UV
            recommendCountList: [], //曝光方案数
            viewUvList: [], //点击UV
            viewPvList: [], //点击方案数
            recommendFillUvRateList: [], //推荐填充率（人）
            recommendFillPvRateList: [], //推荐填充率（方案）
            viewUvRateList: [], // 推荐点击率(人)
            viewPvRateList: [], //推荐点击率(方案)
            recommendConverRate: [], //推荐转化率
        }
    },
    mounted() {
        this.handleDiagramList();
        // this.createChart();
    },
    methods: {
        handleDiagramList() {
            let listFlag = this.diagramList;

            this.recommendRequestUvList = []; //推荐位请求IP
            this.recommendRequestPvList = []; //推荐位请求PV
            this.successRecommendUserList = []; //成功推荐IP
            this.successRecommendCountList = []; //成功推荐方案数
            this.recommendSuccessPv = []; // 成功推荐PV
            this.recommendUserList = []; //曝光UV
            this.recommendCountList = []; //曝光方案数
            this.viewUvList = []; //点击UV
            this.viewPvList = []; //点击方案数
            this.recommendFillUvRateList = []; //推荐填充率（人）
            this.recommendFillPvRateList = []; //推荐填充率（方案）
            this.viewUvRateList = []; // 推荐点击率(人)
            this.viewPvRateList = []; //推荐点击率(方案)
            this.recommendConverRate = [], //推荐转化率
                this.dateList = [];
            var datakeylist = [
                {
                    list: "recommendRequestUvList",
                    key: 'recommendRequestUv',
                    color: "#3B82FE"
                },
                {
                    list: "recommendRequestPvList",
                    key: 'recommendRequestPv',
                    color: "#FC9B41"
                },
                {
                    list: "successRecommendUserList",
                    key: 'successRecommendUv',
                    color: "#7968D5"
                },
                {
                    list: "successRecommendCountList",
                    key: 'successRecommendCount',
                    color: "#FFC765"
                },
                {
                    list: "recommendSuccessPv",
                    key: 'recommendSuccessPv',
                    color: "#19A8A9"
                },
                {
                    list: "recommendUserList",
                    key: 'recommendUv',
                    color: "#F17976"
                },
                {
                    list: "recommendCountList",
                    key: 'recommendCount',
                    color: "#AADF8A"
                },
                {
                    list: "viewUvList",
                    key: 'viewUv',
                    color: "#8997EE"
                },
                {
                    list: "viewPvList",
                    key: 'viewPv',
                    color: "#41CC9A"
                },
                {
                    list: "recommendFillUvRateList",
                    key: 'recommendFillUvRate',
                    color: "#B0BBDC"
                },
                {
                    list: "recommendFillPvRateList",
                    key: 'recommendFillPvRate',
                    color: "#50A8F7"
                },
                {
                    list: "viewUvRateList",
                    key: 'viewUvRate',
                    color: "#86D044"
                }
                ,
                {
                    list: "viewPvRateList",
                    key: 'viewPvRate',
                    color: "#3C5DFC"
                }
                ,
                {
                    list: "recommendConverRate",
                    key: 'recommendConverRate',
                    color: "#C554C7"
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
                // this.recommendRequestUvList.push(listFlag[i].recommendRequestUv);
                // this.recommendRequestPvList.push(listFlag[i].recommendRequestPv);
                // this.successRecommendUserList.push(listFlag[i].successRecommendUv);
                // this.successRecommendCountList.push(listFlag[i].successRecommendCount);
                // this.recommendSuccessPv.push(listFlag[i].recommendSuccessPv);
                // this.recommendUserList.push(listFlag[i].recommendUv);
                // this.recommendCountList.push(listFlag[i].recommendCount);
                // this.viewUvList.push(listFlag[i].viewUv);
                // this.viewPvList.push(listFlag[i].viewPv);
                // this.recommendFillUvRateList.push(listFlag[i].recommendFillUvRate);
                // this.recommendFillPvRateList.push(listFlag[i].recommendFillPvRate);
                // this.viewUvRateList.push(listFlag[i].viewUvRate);
                // this.viewPvRateList.push(listFlag[i].viewPvRate);
                // this.recommendConverRate.push(listFlag[i].recommendConverRate), //推荐转化率
                this.dateList.push(listFlag[i].date);
            }
            this.createChart();
        },
        createChart() {
            var chartDom = document.getElementById('statisticsChart');
            var mychart = echarts.init(chartDom);
            var option;
            let { recommendRequestUvList,
                recommendRequestPvList,
                successRecommendUserList,
                successRecommendCountList,
                recommendUserList,
                recommendCountList,
                recommendSuccessPv,
                viewUvList,
                viewPvList,
                recommendFillUvRateList,
                recommendFillPvRateList,
                viewUvRateList,
                viewPvRateList,
                recommendConverRate,
                dateList } = this;
            mychart.clear();
            option = {
                title: {
                    text: ''
                },
                color: [
                    '#3B82FE',
                    '#FC9B41',
                    '#7968D5',
                    '#FFC765',
                    '#19A8A9',
                    '#F17976',
                    '#AADF8A',
                    '#8997EE',
                    '#41CC9A',
                    '#B0BBDC',
                    '#50A8F7',
                    '#86D044',
                    '#3C5DFC',
                    '#C554C7'
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
                    y: 'bottom',
                    selected: {
                        推荐位请求IP: false,
                        推荐位请求PV: false,
                        成功推荐IP: false,
                        成功推荐方案数: false,
                        成功推荐PV: false,
                        曝光UV: false,
                        曝光方案数: false,
                        点击UV: true,
                        点击方案数: true,
                        "推荐填充率（人）": false,
                        "推荐填充率（方案）": false,
                        "推荐点击率(人)": true,
                        "推荐点击率(方案)": true,
                        "推荐转化率": false,
                    },
                    padding: [0, 20],
                    bottom: 0,
                    itemGap: 15,// 设置图释项之间的间距值
                    itemHeight: 9,// 设置图释项圆圈的高度
                    data: ['推荐位请求IP', '推荐位请求PV', '成功推荐IP', '成功推荐方案数', '成功推荐PV', '曝光UV', '曝光方案数', '点击UV', '点击方案数', '推荐填充率（人）', '推荐填充率（方案）', '推荐点击率(人)', '推荐点击率(方案)', '推荐转化率']
                },
                grid: {
                    left: "20px",
                    right: "20px",
                    bottom: "58px",
                    containLabel: true,
                },
                toolbox: {
                    feature: {}
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
                        name: '推荐位请求IP',
                        type: 'line',
                        yAxisIndex: 0,
                        data: recommendRequestUvList,
                        animation: false,

                    },
                    {
                        name: '推荐位请求PV',
                        type: 'line',
                        yAxisIndex: 0,
                        // stack: 'Total',
                        data: recommendRequestPvList,
                        animation: false,

                    },
                    {
                        name: '成功推荐IP',
                        type: 'line',
                        yAxisIndex: 0,
                        // stack: 'Total',
                        data: successRecommendUserList,
                        animation: false,
                    },
                    {
                        name: '成功推荐方案数',
                        type: 'line',
                        yAxisIndex: 0,
                        // stack: 'Total',
                        data: successRecommendCountList,
                        animation: false,
                    },
                    {
                        name: '成功推荐PV',
                        type: 'line',
                        yAxisIndex: 0,
                        // stack: 'Total',
                        data: recommendSuccessPv,
                        animation: false,
                    },
                    {
                        name: '曝光UV',
                        type: 'line',
                        yAxisIndex: 0,
                        // stack: 'Total',
                        data: recommendUserList,
                        animation: false,
                    },
                    {
                        name: '曝光方案数',
                        type: 'line',
                        yAxisIndex: 0,
                        // stack: 'Total',
                        data: recommendCountList,
                        animation: false,
                    },
                    {
                        name: '点击UV',
                        type: 'line',
                        yAxisIndex: 0,
                        // stack: 'Total',
                        data: viewUvList,
                        animation: false,
                    },
                    {
                        name: '点击方案数',
                        type: 'line',
                        yAxisIndex: 0,
                        // stack: 'Total',
                        data: viewPvList,
                        animation: false,
                    },
                    {
                        name: '推荐填充率（人）',
                        type: 'line',
                        yAxisIndex: 1,
                        // stack: 'Total',
                        data: recommendFillUvRateList,
                        animation: false,
                    },
                    {
                        name: '推荐填充率（方案）',
                        type: 'line',
                        yAxisIndex: 1,
                        // stack: 'Total',
                        data: recommendFillPvRateList,
                        animation: false,
                    },
                    {
                        name: '推荐点击率(人)',
                        type: 'line',
                        yAxisIndex: 1,
                        // stack: 'Total',
                        data: viewUvRateList,
                        animation: false,
                    },
                    {
                        name: '推荐点击率(方案)',
                        type: 'line',
                        yAxisIndex: 1,
                        // stack: 'Total',
                        data: viewPvRateList,
                        animation: false,
                    },
                    {
                        name: '推荐转化率',
                        type: 'line',
                        yAxisIndex: 1,
                        data: recommendConverRate,
                        animation: false,
                    }
                ]
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
                })
            },
            immediate: true,
        }
    },
    components: {},
}
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