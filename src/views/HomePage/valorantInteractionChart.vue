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

            commentPvList: [],
            commentUvList: [],
            userOwnedCommentPvList: [],
            userOwnedCommentUvList: [],
            unboundShopUserCommentPvList: [],
            unboundShopUserCommentUvList: [],
            likePvList: [],
            likeUvList: [],
            interactivePvList: [],
            userScorePvList: [],
            userScoreUvList: [],
            userOwnedScorePvList: [],
            userOwnedScoreUvList: [],
            unboundShopUserScorePvList: [],
            unboundShopUserScoreUvList: [],
            userTagPvList: [],
            userTagUvList: [],
        };
    },
    mounted() {
        this.handleDiagramList();
        // this.createChart();
    },
    methods: {
        handleDiagramList() {
            let listFlag = this.diagramList;
            this.commentPvList = [];
            this.commentUvList = [];
            this.userOwnedCommentPvList = [];
            this.userOwnedCommentUvList = [];
            this.unboundShopUserCommentPvList = [];
            this.unboundShopUserCommentUvList = [];
            this.likePvList = [];
            this.likeUvList = [];
            this.interactivePvList = [];
            this.userScorePvList = [];
            this.userScoreUvList = [];
            this.userOwnedScorePvList = [];
            this.userOwnedScoreUvList = [];
            this.unboundShopUserScorePvList = [];
            this.unboundShopUserScoreUvList = [];
            this.userTagPvList = [];
            this.userTagUvList = [];
            this.dateList = [];
            var datakeylist = [
                {
                    list: "commentPvList",
                    key: "commentPv",
                    color: "#4696EC",
                },
                {
                    list: "commentUvList",
                    key: "commentUv",
                    color: "#FF9435",
                },
                {
                    list: "userOwnedCommentPvList",
                    key: "userOwnedCommentPv",
                    color: "#1AD01A",
                },
                {
                    list: "userOwnedCommentUvList",
                    key: "userOwnedCommentUv",
                    color: "#E53B3C",
                },
                {
                    list: "unboundShopUserCommentPvList",
                    key: "unboundShopUserCommentPv",
                    color: "#A44AF6",
                },
                {
                    list: "unboundShopUserCommentUvList",
                    key: "unboundShopUserCommentUv",
                    color: "#965D51",
                },
                {
                    list: "likePvList",
                    key: "likePv",
                    color: "#E357B9",
                },
                {
                    list: "likeUvList",
                    key: "likeUv",
                    color: "#508055",
                },
                {
                    list: "interactivePvList",
                    key: "interactivePv",
                    color: "#CCCD35",
                },
                {
                    list: "userScorePvList",
                    key: "userScorePv",
                    color: "#C2078B",
                },
                {
                    list: "userScoreUvList",
                    key: "userScoreUv",
                    color: "#68A2ED",
                },
                {
                    list: "userOwnedScorePvList",
                    key: "userOwnedScorePv",
                    color: "#FF9896",
                },
                {
                    list: "userOwnedScoreUvList",
                    key: "userOwnedScoreUv",
                    color: "#48E3C0",
                },
                {
                    list: "unboundShopUserScorePvList",
                    key: "unboundShopUserScorePv",
                    color: "#BB9CD2",
                },
                {
                    list: "unboundShopUserScoreUvList",
                    key: "unboundShopUserScoreUv",
                    color: "#C49C94",
                },
                {
                    list: "userTagPvList",
                    key: "userTagPv",
                    color: "#6A7BDB",
                },
                {
                    list: "userTagUvList",
                    key: "userTagUv",
                    color: "#BEBEBE",
                },
            ];
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
                                borderWidth: 1.5,
                            },
                            emphasis: {
                                disabled: false,
                                itemStyle: {
                                    color: element.color,
                                    borderColor: "#ffffff",
                                    borderWidth: 1.5,
                                    shadowColor: "rgba(0,0,0,.3)", // 添加投影颜色
                                    shadowBlur: 9, // 添加投影模糊度
                                },
                            },
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
                                    shadowColor: "rgba(0,0,0,.3)", // 添加投影颜色
                                    shadowBlur: 9, // 添加投影模糊度
                                },
                            },
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
                commentPvList,
                commentUvList,
                userOwnedCommentPvList,
                userOwnedCommentUvList,
                unboundShopUserCommentPvList,
                unboundShopUserCommentUvList,
                likePvList,
                likeUvList,
                interactivePvList,
                userScorePvList,
                userScoreUvList,
                userOwnedScorePvList,
                userOwnedScoreUvList,
                unboundShopUserScorePvList,
                unboundShopUserScoreUvList,
                userTagPvList,
                userTagUvList,
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
                    formatter: function(params) {
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
                    position: function(point, params, dom, rect, size) {
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
                    },
                },
                legend: {
                    y: "bottom",
                    // padding: [0, 0, 0, 0],
                    bottom: 0,
                    itemGap: 15, // 设置图释项之间的间距值
                    itemHeight: 9, // 设置图释项圆圈的高度
                    // data: ["头条请求UV", "头条请求PV-A（总）", "头条请求PV-B（有新内容）", "点击UV", "点击篇数", "点击PV", "点击PV（前5条）", "点击PV（6～10条）", "点击PV（11条之后）"],
                    data: [
                        "评论总数",
                        "评论人数",
                        "已拥有评论总数",
                        "已拥有评论人数",
                        "未绑定商店评论总数",
                        "未绑定商店评论人数",
                        "点赞总数",
                        "点赞人数",
                        "互动总数",
                        "评分总数",
                        "评分人数",
                        "已拥有评分总数",
                        "已拥有评分人数",
                        "未绑定商店评分总数",
                        "未绑定商店评分人数",
                        "标签总数",
                        "标签人数",
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
                    },
                    {
                        type: "value",
                        position: "left",
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
                        name: "评论总数",
                        type: "line",
                        yAxisIndex: 1,
                        data: commentPvList,
                        animation: false,
                        itemStyle: {
                            color: "#4696EC",
                        },
                    },
                    {
                        name: "评论人数",
                        type: "line",
                        yAxisIndex: 1,
                        // stack: 'Total',
                        data: commentUvList,
                        animation: false,
                        itemStyle: {
                            color: "#FF9435",
                        },
                    },
                    {
                        name: "已拥有评论总数",
                        type: "line",
                        yAxisIndex: 1,
                        // stack: 'Total',
                        data: userOwnedCommentPvList,
                        animation: false,
                        itemStyle: {
                            color: "#1AD01A",
                        },
                    },
                    {
                        name: "已拥有评论人数",
                        type: "line",
                        yAxisIndex: 1,
                        // stack: 'Total',
                        data: userOwnedCommentUvList,
                        animation: false,
                        itemStyle: {
                            color: "#E53B3C",
                        },
                    },
                    {
                        name: "未绑定商店评论总数",
                        type: "line",
                        yAxisIndex: 1,
                        // stack: 'Total',
                        data: unboundShopUserCommentPvList,
                        animation: false,
                        itemStyle: {
                            color: "#A44AF6",
                        },
                    },
                    {
                        name: "未绑定商店评论人数",
                        type: "line",
                        yAxisIndex: 1,
                        // stack: 'Total',
                        data: unboundShopUserCommentUvList,
                        animation: false,
                        itemStyle: {
                            color: "#965D51",
                        },
                    },
                    {
                        name: "点赞总数",
                        type: "line",
                        yAxisIndex: 1,
                        // stack: 'Total',
                        data: likePvList,
                        animation: false,
                        itemStyle: {
                            color: "#E357B9",
                        },
                    },
                    {
                        name: "点赞人数",
                        type: "line",
                        yAxisIndex: 1,
                        // stack: 'Total',
                        data: likeUvList,
                        animation: false,
                        itemStyle: {
                            color: "#508055",
                        },
                    },
                    {
                        name: "互动总数",
                        type: "line",
                        yAxisIndex: 1,
                        // stack: 'Total',
                        data: interactivePvList,
                        animation: false,
                        itemStyle: {
                            color: "#CCCD35",
                        },
                    },
                    {
                        name: "评分总数",
                        type: "line",
                        yAxisIndex: 1,
                        // stack: 'Total',
                        data: userScorePvList,
                        animation: false,
                        itemStyle: {
                            color: "#C2078B",
                        },
                    },
                    {
                        name: "评分人数",
                        type: "line",
                        yAxisIndex: 1,
                        // stack: 'Total',
                        data: userScoreUvList,
                        animation: false,
                        itemStyle: {
                            color: "#68A2ED",
                        },
                    },
                    {
                        name: "已拥有评分总数",
                        type: "line",
                        yAxisIndex: 1,
                        // stack: 'Total',
                        data: userOwnedScorePvList,
                        animation: false,
                        itemStyle: {
                            color: "#FF9896",
                        },
                    },
                    {
                        name: "已拥有评分人数",
                        type: "line",
                        yAxisIndex: 1,
                        // stack: 'Total',
                        data: userOwnedScoreUvList,
                        animation: false,
                        itemStyle: {
                            color: "#48E3C0",
                        },
                    },
                    {
                        name: "未绑定商店评分总数",
                        type: "line",
                        yAxisIndex: 1,
                        // stack: 'Total',
                        data: unboundShopUserScorePvList,
                        animation: false,
                        itemStyle: {
                            color: "#BB9CD2",
                        },
                    },
                    {
                        name: "未绑定商店评分人数",
                        type: "line",
                        yAxisIndex: 1,
                        // stack: 'Total',
                        data: unboundShopUserScoreUvList,
                        animation: false,
                        itemStyle: {
                            color: "#C49C94",
                        },
                    },
                    {
                        name: "标签总数",
                        type: "line",
                        yAxisIndex: 1,
                        // stack: 'Total',
                        data: userTagPvList,
                        animation: false,
                        itemStyle: {
                            color: "#6A7BDB",
                        },
                    },
                    {
                        name: "标签人数",
                        type: "line",
                        yAxisIndex: 1,
                        // stack: 'Total',
                        data: userTagUvList,
                        animation: false,
                        itemStyle: {
                            color: "#BEBEBE",
                        },
                    },
                ],
            };
            mychart.resize();
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
