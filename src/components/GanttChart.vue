<template>
    <!-- 安装vue-multiple-scrollbar插件 -->
    <div class="GanttChart" ref="GanttChart">
      
        <table
            class="ganttBox"
            :class="{ gantt_fixed_top: ganttItem == 1 }"
            v-for="ganttItem in 2"
            :key="'ganttBox' + ganttItem"
        >
            <tbody>
                <tr>
                    <td class="resourceName thead"><div class="tableItem">资源名称</div></td>
                    <td class="specification thead"><div class="tableItem">资源规格</div></td>
                    <td class="ganttMain" :rowspan="ganttData.resourceList?ganttData.resourceList.length + 1 : 0">
                        <vm-scrollbar
                            tag="div"
                            wrapClass="ganttFrameScrollBox"
                            :barWidth="ganttItem == 1 ? 0 : 4"
                            barClass="scrollBar"
                            :noresize="true"
                            class="ganttFrame"
                            :ref="ganttItem == 1 ? 'ganttFrame_fixed' : 'ganttFrame'"
                        >
                            <table>
                                <tbody >
                                    <!-- 月 -->
                                    <tr class="thead mouth">
                                        <td
                                            :class="{ borderRightNone: ganttMouthIndex == getMouth().length - 1 }"
                                            :colspan="ganttMouth.dayCount"
                                            v-for="(ganttMouth, ganttMouthIndex) in getMouth()"
                                            :key="'ganttMouth' + ganttMouthIndex"
                                        >
                                            <div>{{ ganttMouth.mouth }}月</div>
                                        </td>
                                    </tr>
                                    <!-- 日 -->
                                    <tr class="thead day">
                                        <td
                                            :class="{
                                                weekend: getWeek(ganttDate) == '六' || getWeek(ganttDate) == '日',
                                                borderRightNone: ganttDateIndex == GetDefaultGanttDate().length - 1
                                            }"
                                            v-for="(ganttDate, ganttDateIndex) in GetDefaultGanttDate()"
                                            :key="'ganttDate' + ganttDateIndex"
                                            @click="SelectColumn($event)"
                                        >
                                            <div>{{ ganttDate.format("dd") }}</div>
                                        </td>
                                    </tr>
                                    <!-- 星期 -->
                                    <tr class="thead week">
                                        <td
                                            :class="{
                                                weekend: getWeek(ganttDay) == '六' || getWeek(ganttDay) == '日',
                                                borderRightNone: ganttDayIndex == GetDefaultGanttDate().length - 1
                                            }"
                                            v-for="(ganttDay, ganttDayIndex) in GetDefaultGanttDate()"
                                            :key="'ganttDay' + ganttDayIndex"
                                        >
                                            <div>{{ getWeek(ganttDay) }}</div>
                                        </td>
                                    </tr>
                                    <tr
                                        :class="{
                                            borderBottomNone: index == ganttData.resourceList.length - 1,
                                            gantt_fixed_top_tr: ganttItem == 1
                                        }"
                                        v-for="(resouce, index) in ganttData.resourceList"
                                        :key="'resouce' + index"
                                    >
                                        <template v-for="(ganttDate, ganttDateIndex) in GetDefaultGanttDate()">
                                            <td
                                                :class="{
                                                    borderRightNone: ganttDateIndex == GetDefaultGanttDate().length - 1
                                                }"
                                                v-show="
                                                    getContract(resouce.dateContractList, ganttDate)
                                                        ? !getContract(resouce.dateContractList, ganttDate).isHideTd
                                                        : true
                                                "
                                                :colspan="
                                                    getContract(resouce.dateContractList, ganttDate)
                                                        ? getContract(resouce.dateContractList, ganttDate).seriesCount
                                                        : 1
                                                "
                                                :key="'ganttDate' + ganttDateIndex"
                                            >
                                                <template
                                                    v-if="getContract(resouce.dateContractList, ganttDate) != null"
                                                >
                                                    <div
                                                        class="contractMainBox"
                                                        :style="{
                                                            background:
                                                                '#' +
                                                                getContract(resouce.dateContractList, ganttDate)
                                                                    .backgroundColor,
                                                            color: getContract(resouce.dateContractList, ganttDate)
                                                                .fontColor,
                                                            width:
                                                                getContract(resouce.dateContractList, ganttDate)
                                                                    .seriesCount *
                                                                    42 +
                                                                (getContract(resouce.dateContractList, ganttDate)
                                                                    .seriesCount > 1
                                                                    ? getContract(resouce.dateContractList, ganttDate)
                                                                          .seriesCount
                                                                    : 0) +
                                                                'px'
                                                        }"
                                                        @mouseenter="
                                                            ShowProductTips(
                                                                getContract(resouce.dateContractList, ganttDate)
                                                                    .product,
                                                                $event,getContract(resouce.dateContractList, ganttDate)

                                                            )
                                                        "
                                                        @mouseleave="RemoveProductTips()"
                                                    >
                                                        <template
                                                            v-if="
                                                                getContract(resouce.dateContractList, ganttDate)
                                                                    .seriesCount > 1
                                                            "
                                                        >
                                                            {{
                                                                getContract(resouce.dateContractList, ganttDate).product
                                                            }}
                                                        </template>
                                                        <template v-else>
                                                            {{
                                                                getContract(
                                                                    resouce.dateContractList,
                                                                    ganttDate
                                                                ).product.split("")[0]
                                                            }}
                                                        </template>
                                                        <i
                                                            class="orderYes"
                                                            v-if="
                                                                getContract(resouce.dateContractList, ganttDate)
                                                                    .status == 2
                                                            "
                                                        >
                                                            <svg
                                                                t="1660815718002"
                                                                viewBox="0 0 1024 1024"
                                                                version="1.1"
                                                                xmlns="http://www.w3.org/2000/svg"
                                                                p-id="2396"
                                                                width="20"
                                                                height="20"
                                                            >
                                                                <path
                                                                    d="M918.485333 248.490667a62.762667 62.762667 0 0 0-88.746666 0l-418.176 418.218666-217.130667-217.130666a62.848 62.848 0 1 0-88.874667 88.874666l259.754667 259.754667a65.237333 65.237333 0 0 0 92.245333 0L918.485333 337.28a62.762667 62.762667 0 0 0 0-88.746667z"
                                                                    p-id="2397"
                                                                    fill="#ffffff"
                                                                ></path>
                                                            </svg>
                                                        </i>
                                                    </div>
                                                </template>
                                                <!-- <template v-else>
                                                    <div></div>
                                                </template> -->
                                            </td>
                                        </template>
                                    </tr>
                                </tbody>
                            </table>
                        </vm-scrollbar>
                        <div class="shadowBox"></div>
                    </td>
                    
                </tr>
                <tr
                    :class="{ gantt_fixed_top_tr: ganttItem == 1 }"
                    v-for="(resouce, index) in ganttData.resourceList"
                    :key="'resouce2' + index"
                >
                    <td class="resourceName">
                        <div class="tableItem">{{ resouce.resourceName }}</div>
                    </td>
                    <td :class="{ gantt_fixed_top_tr: ganttItem == 1 }" class="specification">
                        <div
                            class="tableItem"
                            @mouseenter="ShowSpecificationTips(resouce.specification, $event)"
                            @mouseleave="RemoveSpecificationTips()"
                        >
                            {{ resouce.specification }}
                        </div>
                    </td>
                </tr>
            </tbody>
        </table>
        <vm-scrollbar tag="div" :barWidth="4" :noresize="true">
            <div class="legendBox">
                <div class="ganttLegend" v-for="legend in Getlegends()" :key="legend.product + legend.backgroundColor">
                    <i class="legendIcon" v-if="legend.icon" v-html="legend.icon"></i>
                    <i class="legendColorBox" v-else :style="{ background: legend.backgroundColor }"></i>
                    {{ legend.product }}
                </div>
            </div>
        </vm-scrollbar>
    </div>
</template>
<script>
Date.prototype.format = function(fmt) {
    var o = {
        "y+": this.getFullYear(), //年份
        "M+": this.getMonth() + 1, //月份
        "d+": this.getDate(), //日
        "h+": this.getHours(), //小时
        "m+": this.getMinutes(), //分
        "s+": this.getSeconds(), //秒
        "q+": Math.floor((this.getMonth() + 3) / 3), //季度
        S: this.getMilliseconds() //毫秒
    };
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
        if (new RegExp("(" + k + ")").test(fmt))
            fmt = fmt.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length));
    return fmt;
};
import VmScrollbar from "vue-multiple-scrollbar";
import scheduleManage from "../api/scheduleManage";
export default {
    name: "GanttChart",
    components: {
        VmScrollbar
    },
    props: {
        ganttData: {
            type: Object,
            default: {},
        },
        isFixedTop: {
            type: Boolean,
            default: true
        },
        startDate: {
            type: String,
            default: ""
        },
        endDate: {
            type: String,
            default: ""
        }
    },
    data() {
        return {
        };
    },
    computed: {
        barWidth() {
            return this.widthPre * this.trackWidth;
        },
        // 可视高度与内容高度的比例
        widthPre() {
            return this.wrapWidth / this.wrapContentWidth;
        },
        isDefaultDate() {
            if (this.startDate == "" || this.endDate == "" || this.endDate <= this.startDate) {
                return true;
            } else {
                return false;
            }
        }
    },
    mounted() {
    
        this.GanttInit();
        
       
       
        
    },
    watch: {
        ganttData(data) {
            let that=this
            window.setTimeout(function(){
                that.$nextTick(() => {
                    that.ganttData = data;
                    that.GanttInit();
                })
                if(document.getElementsByClassName('ganttMain')[1].clientHeight>document.body.offsetHeight){
                    document.getElementsByClassName('vm-scrollbar__bar')[2].style.position='fixed'
                    document.getElementsByClassName('vm-scrollbar__bar')[2].style.bottom='10px'
                }else{
                    document.getElementsByClassName('vm-scrollbar__bar')[2].style.position='absolute'
                    document.getElementsByClassName('vm-scrollbar__bar')[2].style.bottom='2px'
                }
            },100)
            
        },
    },
  
    methods: {

        GanttInit() {
            this.getMouth();
            this.$nextTick(() => {
                if (this.isFixedTop) {
                    window.removeEventListener("scroll", this.ganttScrollFixedTop, true);
                    window.addEventListener("scroll", this.ganttScrollFixedTop, true);
                }
                let ganttFrameScrollBox = this.$refs.ganttFrame[0].$el.querySelector(".ganttFrameScrollBox");
                ganttFrameScrollBox.removeEventListener("scroll", this.ganttFrameScroll, true);
                ganttFrameScrollBox.addEventListener("scroll", this.ganttFrameScroll, true);
                if (this.isDefaultDate) {
                    ganttFrameScrollBox.scrollLeft = 3150;
                }
            });
        },

        // 获取图例数组
        Getlegends() {
            let legendList = new Array();
            legendList.push({
                icon:
                    '<svg t="1660815718002" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2396" width="20" height="20"><path d="M918.485333 248.490667a62.762667 62.762667 0 0 0-88.746666 0l-418.176 418.218666-217.130667-217.130666a62.848 62.848 0 1 0-88.874667 88.874666l259.754667 259.754667a65.237333 65.237333 0 0 0 92.245333 0L918.485333 337.28a62.762667 62.762667 0 0 0 0-88.746667z" p-id="2397" fill="#ffffff"></path></svg>',
                product: "下单合同"
            });
            legendList.push({
                backgroundColor: "#E0E0E0",
                product: "非售卖合同"
            });
            if (this.ganttData.resourceList && this.ganttData.resourceList.length > 0) {
                this.ganttData.contractNameList.forEach(resource => {
                    //  let dateContractList = resource.dateContractList;
                    // dateContractList.forEach(contract => {
                        legendList.push({
                            backgroundColor: "#" + resource.backgroundColor,
                            product: resource.product
                        });
                    // });
                });
                return legendList;
            } else {
                return [];
            }
        },
        // 甘特图吸顶表头
        ganttScrollFixedTop() {
         
            let ganttChart = this.$refs.GanttChart;
            if (document.body.scrollTop || document.documentElement.scrollTop - ganttChart.offsetTop >= 0) {
                ganttChart.querySelector(".gantt_fixed_top").style.width = ganttChart.clientWidth + "px";
                ganttChart.querySelector(".gantt_fixed_top").style.left =
                    ganttChart.getBoundingClientRect().left + "px";
                ganttChart.querySelector(".gantt_fixed_top").classList.add("fixedBox");
                this.$nextTick(() => {
                    let ganttFrameScrollBox = this.$refs.ganttFrame[0].$el.querySelector(".ganttFrameScrollBox");
                    let ganttFrameFixedScrollBox = this.$refs.ganttFrame_fixed[0].$el.querySelector(
                        ".ganttFrameScrollBox"
                    );
                    ganttFrameFixedScrollBox.scrollLeft = ganttFrameScrollBox.scrollLeft;
                });
            } else {
                ganttChart.querySelector(".gantt_fixed_top").classList.remove("fixedBox");
            }
        },
        // 甘特表格滚动
        ganttFrameScroll(e) {
            e = e || window.Event;
            let shadowBox = document.querySelectorAll(".shadowBox");
            shadowBox.forEach(item => {
                e.target.scrollLeft > 0 ? item.classList.add("show") : item.classList.remove("show");
            });
            let ganttFrameFixedScrollBox = this.$refs.ganttFrame_fixed[0].$el.querySelector(".ganttFrameScrollBox");
            ganttFrameFixedScrollBox.scrollLeft = e.target.scrollLeft;
        },
        // 获取指定天数
        GetDiffDate(startDate, endDate) {
            startDate = new Date(startDate).format("yyyy-MM-dd");
            endDate = new Date(endDate).format("yyyy-MM-dd");
            //初始化日期列表，数组
            var diffdate = new Array();
            var i = 0;
            //开始日期小于等于结束日期,并循环
            while (startDate <= endDate) {
                diffdate[i] = new Date(startDate);

                //获取开始日期时间戳
                var startDate_ts = new Date(startDate).getTime();

                //增加一天时间戳后的日期
                var next_date = startDate_ts + 24 * 60 * 60 * 1000;

                //拼接年月日，这里的月份会返回（0-11），所以要+1
                var next_dates_y = new Date(next_date).getFullYear() + "-";
                var next_dates_m =
                    new Date(next_date).getMonth() + 1 < 10
                        ? "0" + (new Date(next_date).getMonth() + 1) + "-"
                        : new Date(next_date).getMonth() + 1 + "-";
                var next_dates_d =
                    new Date(next_date).getDate() < 10
                        ? "0" + new Date(next_date).getDate()
                        : new Date(next_date).getDate();

                startDate = next_dates_y + next_dates_m + next_dates_d;

                //增加数组key
                i++;
            }
            return diffdate;
        },
        // 获取甘特图天数
        GetDefaultGanttDate() {
            if (!this.isDefaultDate) {
                return this.GetDiffDate(this.startDate, this.endDate);
            }
            const now = new Date();
            const length = 90;
            const beforeDays = Array.from({ length }, (_, days) => {
                let day = new Date(now); // clone "now"
                day.setDate(now.getDate() - days); // change the date
                return day;
            });

            const afterDays = Array.from({ length }, (_, days) => {
                let day = new Date(now);
                day.setDate(now.getDate() + days);
                return day;
            });

            afterDays.forEach((item, index) => {
                if(item.format("yyyy-MM-dd") == new Date().format("yyyy-MM-dd")){
                    afterDays.splice(index, 1);
                    return;
                }
            });
            
            const ganttDate = beforeDays.concat(afterDays);
            // Array.from(new Set(ganttDate));
            ganttDate.sort((a, b) => {
                return a - b;
            });
            return ganttDate;
        },

        // 星期转换
        getWeek(time) {
            let weekTime = time.getDay();
            switch (weekTime) {
                case 0:
                    return "日";
                case 1:
                    return "一";
                case 2:
                    return "二";
                case 3:
                    return "三";
                case 4:
                    return "四";
                case 5:
                    return "五";
                case 6:
                    return "六";
            }
        },
        // 月份转换
        getMouth() {
            let mouthList = new Array();
            this.GetDefaultGanttDate().forEach(date => {
                let mouthListFindIndex = mouthList.findIndex(item => {
                    return item.year == date.getFullYear() && item.mouth == date.getMonth() + 1;
                });
                if (mouthListFindIndex < 0) {
                    let dateData = new Object();
                    dateData["year"] = date.getFullYear();
                    dateData["mouth"] = date.getMonth() + 1;
                    dateData["dayCount"] = 1;
                    mouthList.push(dateData);
                } else {
                    mouthList.map(item => {
                        return item.year == date.getFullYear() && item.mouth == date.getMonth() + 1
                            ? item.dayCount++
                            : (item.dayCount = item.dayCount);
                    });
                }
            });
            // console.log(mouthList);
            return mouthList;
        },
        // 获取合同
        getContract(contractList, tdDate) {
            
            let contractData = null;
            // 遍历合同列表
            contractList.forEach(contract => {
                // 合同时间表
                const dataList = contract.dataList;
             
                this.resetSeriesArrary(dataList).forEach(contractTimeData => {
                    if (contractTimeData.date == tdDate.format("yyyy-MM-dd")) {
                        let currentContract = Object.assign({}, contract, contractTimeData);
                        contractData = currentContract;
                    }
                });
            });

            return contractData;
        },
        // 整理合同时间分为连续与不连续
        resetSeriesArrary(arr) {
            let arrList = [];
            let seriesCount = 1;
            arr.forEach((item, index) => {
                if (index > 0) {
                    let currentDate = new Date(item);
                    let beforeDate = new Date(arr[index - 1]);
                    let beforeAddDayDate = new Date(beforeDate.getTime() + 24 * 60 * 60 * 1000);
                    if (currentDate.format("yyyy-MM-dd") == beforeAddDayDate.format("yyyy-MM-dd")) {
                        seriesCount += 1;
                        arrList[index - 1]["isHideTd"] = true;
                    } else {
                        seriesCount = 1;
                    }
                } else {
                    seriesCount = 1;
                }

                arrList.push({
                    date: item,
                    seriesCount: seriesCount
                });
               
            });
            return arrList;
        },
        // 显示资源规格提示
        ShowSpecificationTips(specification, e) {
            const ganttChart = this.$refs.GanttChart;
            let domRect = e.target.getBoundingClientRect();
            let ganttChartRect = ganttChart.getBoundingClientRect();
            let specificationTips = document.createElement("div");
            specificationTips.className = "specificationTips";
            specificationTips.innerHTML = specification;
            specificationTips.style.left = domRect.left - ganttChartRect.left + 27 + "px";
            specificationTips.style.top = domRect.top - ganttChartRect.top + 40 + "px";
            ganttChart.appendChild(specificationTips);
        },
        // 删除资源规格提示
        RemoveSpecificationTips() {
            const ganttChart = this.$refs.GanttChart;
            ganttChart.removeChild(ganttChart.querySelector(".specificationTips"));
        },
        // 显示合同名称提示
        ShowProductTips(product, e,obj) {
            if(product!=''){
                const ganttChart = this.$refs.GanttChart;
                let domRect = e.target.getBoundingClientRect();
                let ganttChartRect = ganttChart.getBoundingClientRect();
                let productTips = document.createElement("div");
                productTips.className = "productTips";
                productTips.innerHTML = obj.manufacturer+' '+product+' '+obj.startStopTime;
                ganttChart.appendChild(productTips);
                productTips.style.left =
                    domRect.left - ganttChartRect.left + (e.target.clientWidth - productTips.clientWidth) / 2 + "px";
                productTips.style.top = domRect.top - ganttChartRect.top + 40 + "px";
            }
           
        },
        // 删除合同名称提示
        RemoveProductTips() {
            const ganttChart = this.$refs.GanttChart;
            ganttChart.removeChild(ganttChart.querySelector(".productTips"));
        },
        // 选中整列
        SelectColumn(event) {
            const ganttChart = this.$refs.GanttChart;
            const ganttFixedTop = this.$refs.ganttFrame_fixed[0].$el;
            const ganttFrame = this.$refs.ganttFrame[0].$el;

            if (ganttChart.querySelectorAll(".ganttSelectedFrame").length > 0) {
                Array.from(ganttChart.querySelectorAll(".ganttSelectedFrame")).forEach(item => {
                    item.parentNode.removeChild(item);
                });
            }
            let currentTd = event.currentTarget;

            let selectedFrame = document.createElement("div");
            selectedFrame.className = "ganttSelectedFrame";

            selectedFrame.style.left = currentTd.offsetLeft + "px";
            selectedFrame.style.height = ganttFrame.clientHeight - 33 + "px";
            ganttFrame.querySelector("table").appendChild(selectedFrame);

            // 加载顶部悬浮选中框
            let selectedFrameFixedTop = document.createElement("div");
            selectedFrameFixedTop.className = "ganttSelectedFrame ganttFixedTopSelectedFrame";
            selectedFrameFixedTop.style.left = currentTd.offsetLeft + "px";
            selectedFrameFixedTop.style.height = 89 - 34 + "px";
            ganttFixedTop.querySelector("table").appendChild(selectedFrameFixedTop);

            selectedFrame.onclick = this.RemoveSelectedFrame;
            selectedFrameFixedTop.onclick = this.RemoveSelectedFrame;
        },
        // 删除选中框
        RemoveSelectedFrame() {
            const ganttChart = this.$refs.GanttChart;
            if (ganttChart.querySelectorAll(".ganttSelectedFrame").length > 0) {
                Array.from(ganttChart.querySelectorAll(".ganttSelectedFrame")).forEach(item => {
                    item.parentNode.removeChild(item);
                });
            }
        }
    }
};
</script>
<style lang="scss" scoped>
.GanttChart {
    position: relative;
    * {
        transition: all 0.2s;
    }   
    .ganttBox {
        width: 100%;
        border: 1px solid #eee;
        border-right: none;
        border-bottom: none;
        table-layout: fixed;
        background: #fff;
        td {
            height: 32px;
            border-right: 1px solid #eee;
            border-bottom: 1px solid #eee;
            &.resourceName {
                width: 222px;
                &.thead {
                    height: 84px;
                    background-color: #f5f7f9;
                }
            }
            &.specification {
                width: 270px;
                &.thead {
                    height: 84px;
                    background-color: #f5f7f9;
                }
            }
            &.ganttMain {
                position: relative;
                .shadowBox {
                    position: absolute;
                    left: 0;
                    top: 0;
                    height: 100%;
                    width: 12px;
                    &.show {
                        background: linear-gradient(270deg, rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.04));
                    }
                }
            }
            .tableItem {
                width: 100%;
                height: 100%;
                padding: 5px 10px;
                box-sizing: border-box;
                font-size: 14px;
                color: #606266;
                line-height: 22px;
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
                cursor: pointer;
                display: flex;
                align-items: center;
            }
            .ganttFrame {
                width: 100%;
                height: 100%;
                /deep/ .scrollBar {
                    background: #d8d8d8;
                    border-radius: 2px;
                    height: 10px;
                }
              
                table {
                    position: relative;
                    table-layout: fixed;
                    // margin-bottom: -1px;
                    tr {
                        &.thead {
                            background-color: #f5f7f9;
                            &.mouth {
                                td {
                                    height: 32px;
                                    line-height: 32px;
                                    div {
                                        width: auto;
                                        height: 32px;
                                        line-height: 32px;
                                    }
                                }
                            }
                            &.day {
                                td {
                                    height: 25px;
                                    line-height: 25px;
                                    cursor: pointer;
                                    div {
                                        height: 25px;
                                        line-height: 25px;
                                    }
                                }
                            }
                            &.week {
                                td {
                                    height: 28px;
                                    line-height: 28px;
                                    div {
                                        height: 28px;
                                        line-height: 28px;
                                    }
                                }
                            }
                        }
                        td {
                            width: 42px;
                            height: 33px;
                            text-align: center;
                            font-size: 14px;
                            color: #606266;
                            &.weekend {
                                color: #de2424;
                            }
                            &.borderRightNone {
                                border-right: none;
                            }
                            div {
                                width: 42px;
                                height: 33px;
                                &.contractMainBox {
                                    position: relative;
                                    text-align: center;
                                    line-height: 33px;
                                    font-size: 14px;
                                    white-space: nowrap;
                                    overflow: hidden;
                                    text-overflow: ellipsis;
                                    cursor: pointer;
                                    i {
                                        position: absolute;
                                        right: 0;
                                        bottom: 0;
                                        display: flex;
                                        justify-content: center;
                                        align-content: center;
                                        width: 14px;
                                        height: 14px;
                                        border: 1px solid #ffffff;
                                        background: #3ad2a2;
                                        border-radius: 50%;
                                        box-sizing: border-box;
                                        /deep/ svg {
                                            display: block;
                                            width: 8px;
                                            height: 8px;
                                            margin-top: 2px;
                                        }
                                    }
                                }
                            }
                        }
                        &.borderBottomNone {
                            td {
                                border-bottom: none;
                            }
                        }
                    }
                }
            }
        }
        &.gantt_fixed_top {
            display: none;
            position: fixed;
            top: 60px;
            z-index: 100;
            background: #ffffff;
            box-shadow: 0px 15px 10px -15px rgba($color: #000000, $alpha: 0.4);
            &.fixedBox {
                display: table;
            }
            .gantt_fixed_top_tr {
                td {
                    height: 0;
                    border-bottom: none;
                    div {
                        padding: 0;
                        height: 0;
                        overflow: hidden;
                    }
                }
            }
            .ganttMain {
                border-bottom: none;
                /deep/ .ganttFrameScrollBox {
                    // &::-webkit-scrollbar{
                    //     display: none;
                    // }
                }
            }
        }
    }
    /deep/ .specificationTips {
        padding: 10px;
        position: absolute;
        left: 0;
        top: 0;
        z-index: 200;
        width: 343px;
        border: 1px solid #f4f4f4;
        box-sizing: border-box;
        background: #ffffff;
        border-radius: 2px;
        box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.04);
        font-size: 14px;
        line-height: 20px;
        color: #999;
    }
    /deep/ .productTips {
        padding: 0 10px;
        position: absolute;
        left: 0;
        top: 0;
        z-index: 200;
        border: 1px solid #ffbf83;
        box-sizing: border-box;
        background: #ffeda7;
        box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.04);
        font-size: 14px;
        line-height: 28px;
        color: #525252;
        text-align: center;
        height: 28px;
    }
    /deep/ .ganttSelectedFrame {
        position: absolute;
        left: 0;
        top: 33px;
        z-index: 50;
        width: 43px;
        height: 50px;
        border: 1px solid #ff6767;
        background: rgba(188, 205, 255, 0.28);
        box-sizing: border-box;
        cursor: pointer;
        &.ganttFixedTopSelectedFrame {
            border-bottom: none;
        }
    }
    // /deep/.vm-scrollbar__bar{
    //     position: fixed;
    //     bottom: 10px;
    // }
    .legendBox {
        display: flex;
        justify-content: center;
        align-items: center;
        flex-wrap: wrap;
        height: 40px;
        background: #ffffff;

        .ganttLegend {
            display: flex;
            align-items: center;
            flex-shrink: 0;
            font-size: 14px;
            color: #727272;
            line-height: 1;
            margin-right: 20px;
            &:last-of-type {
                margin-right: 0;
            }
            i {
                margin-right: 10px;
            }
            .legendIcon {
                display: flex;
                justify-content: center;
                align-content: center;
                width: 14px;
                height: 14px;
                border: 1px solid #ffffff;
                background: #3ad2a2;
                border-radius: 50%;
                box-sizing: border-box;
                /deep/ svg {
                    display: block;
                    width: 8px;
                    height: 8px;
                    margin-top: 2px;
                }
            }
            .legendColorBox {
                display: block;
                width: 27px;
                height: 8px;
            }
        }
    }
}
</style>
