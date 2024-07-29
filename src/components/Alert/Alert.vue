<template>
    <div class="DatePicker" ref="pickerdom" :style="{left:pageX,top:pageY}" v-show="DatePickerShow">
        <div class="gs-date-input" @click="showDataRang($event)">
            <input type="text" v-model="Times" />
            <i class="icon date_icon"></i>
        </div>
        <transition name="slide-fade">
            <div
                class="gs-data-rang-box"
                v-show="dataRang"
                :class="{
                    'gs-data-top': RectData.bottom <= 320,
                    'gs-data-bottom': RectData.top <= 320,
                    'gs-data-left': RectData.left <= 300,
                    'gs-data-right': RectData.right <= 300,
                }"
            >
                <div class="gs-data-rang">
                    <div class="gs-date-picker-panel">
                        <div class="gs-date-select">
                            <i class="icon prev_icon" @click="prevMonth(false)"></i>
                            <div>{{ year + "年" + month + "月" }}</div>
                            
                        </div>
                        <table cellspacing="0" cellpadding="0" class="gs-date-table">
                            <tbody>
                                <tr>
                                    <th v-for="i in weekList" :key="i.en">{{ i.zh }}</th>
                                </tr>
                                <tr v-for="idx in weekNum" :key="'weekNum' + idx">
                                    <td
                                        v-for="m in 7"
                                        :key="'monthDay' + idx + '_' + m"
                                        :class="{
                                            'gs-gray': new Date(monthList.length > 0 ? monthList[idx - 1][m - 1] : 0).getMonth() + 1 != month,
                                            active: isExistDate(Times, monthList.length > 0 ? monthList[idx - 1][m - 1] : 0),
                                            disabled: isExistDate(disabledTimeData, monthList.length > 0 ? monthList[idx - 1][m - 1] : 0),
                                            clash: isExistDate(clashTimeData, monthList.length > 0 ? monthList[idx - 1][m - 1] : 0),
                                        }"
                                    >
                                        <span @click.stop="onClickTime(monthList[idx - 1][m - 1])">{{
                                            monthList.length > 0 ? new Date(monthList[idx - 1][m - 1]).getDate() : 0
                                        }}</span>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div class="gs-date-picker-panel" v-if="type == ''">
                        <div class="gs-date-select">
                            
                            <div>{{ yearRight + "年" + monthRight + "月" }}</div>
                            <i class="icon next_icon" @click="nextMonth(true)"></i>
                        </div>
                        <table cellspacing="0" cellpadding="0" class="gs-date-table">
                            <tbody>
                                <tr>
                                    <th v-for="i in weekList" :key="i.en">{{ i.zh }}</th>
                                </tr>
                                <tr v-for="idx in weekNum" :key="'weekNum' + idx">
                                    <td
                                        v-for="m in 7"
                                        :key="'monthDay' + idx + '_' + m"
                                        :class="{
                                            'gs-gray': new Date(monthListRight.length > 0 ? monthListRight[idx - 1][m - 1] : 0).getMonth() + 1 != monthRight,
                                            active: isExistDate(Times, monthListRight.length > 0 ? monthListRight[idx - 1][m - 1] : 0),
                                            disabled: isExistDate(disabledTimeData, monthListRight.length > 0 ? monthListRight[idx - 1][m - 1] : 0),
                                            clash: isExistDate(clashTimeData, monthListRight.length > 0 ? monthListRight[idx - 1][m - 1] : 0),
                                        }"
                                    >
                                        <span @click.stop="onClickTime(monthListRight[idx - 1][m - 1])">{{
                                            monthListRight.length > 0 ? new Date(monthListRight[idx - 1][m - 1]).getDate() : 0
                                        }}</span>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
                <div class="gs-data-footer">
                    <div class="gs-data-legend">
                        <div><i></i>已占用日期</div>
                        <div><i></i>已选择日期</div>
                        <div><i></i>排期冲突日期</div>
                    </div>
                    <div class="gs-data-btnBox">
                        <div @click="dateEmpty()">清空</div>
                        <div @click="dateSubmit()">确定</div>
                    </div>
                </div>
            </div>
        </transition>
    </div>
</template>

<script>

Date.prototype.format = function (fmt) {
    //author: meizz
    var o = {
        "M+": this.getMonth() + 1, //月份
        "d+": this.getDate(), //日
        "h+": this.getHours(), //小时
        "m+": this.getMinutes(), //分
        "s+": this.getSeconds(), //秒
        "q+": Math.floor((this.getMonth() + 3) / 3), //季度
        S: this.getMilliseconds(), //毫秒
    };
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o) if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length));
    return fmt;
};

import bus from "../../assets/js/bus";
export default {
    
    name: "DatePicker",
    props: {
        // disabledTime: {
        //     type: Array,
        //     default: [],
        // },
        // clashTime: {
        //     type: Array,
        //     default: [],
        // },
        // type: {
        //     type: String,
        //     default: "",
        // },
        // label: {
        //     type: String,
        //     default: "",
        // },
        // value: {
        //     type: null,
        //     default: "",
        // },
        // location:{
        //     type: Boolean,
        //     default: false
        // }
    },
    data() {
        return {
            
            weekList: [
                { zh: "日", en: "Sun" },
                { zh: "一", en: "Mon" },
                { zh: "二", en: "Tue" },
                { zh: "三", en: "Wed" },
                { zh: "四", en: "Thu" },
                { zh: "五", en: "Fir" },
                { zh: "六", en: "Sat" },
            ],
            startDay: 0,
            endDay: 0,
            startDayRight: 0,
            endDayRight: 0,
            weekNum: 6,
            year: new Date().getFullYear(),
            month: new Date().getMonth() + 1,
            yearRight: new Date().getMonth() + 1==12?new Date().getFullYear()+1:new Date().getFullYear(),
            monthRight: new Date().getMonth() === 11 ? 1 : new Date().getMonth() + 2,
            day: new Date().getDate(),
            monthList: [],
            monthListRight: [],
            RectData: {},

            DatePickerShow:true,

           




            disabledTime: [],
            clashTime:[],
            type: '',
            label: '',
            value:'',
            location:false,
            pageX:0,
            pageX:0,

            Times: [],
            disabledTimeData: [],
            clashTimeData: [],
            dataRang: false,
            
            clashTimeShow:true,

        };
    },
    mounted() {
        this.getMonthDay();
        this.getMonthDayRight();
        // let pickerTime = [];
        // if(this.value.length>0){
        //     this.Times.forEach((time) => {
        //         pickerTime.push(new Date(time).format("yyyy-MM-dd"));
        //     });
        // }
       
        // this.Times = pickerTime;
        this.Times = this.value;
        this.disabledTimeData = this.disabledTime;
        this.clashTimeData = this.clashTime;
       
        // bus.$on('DatePickerShow',(val)=>{
        //     this.DatePickerShow=val
        // })

        console.log(new Date().getMonth());

    },
    watch: {
        year() {
            this.getMonthDay();
        },
        month() {
            this.getMonthDay();
        },
        yearRight() {
            this.getMonthDayRight();
        },
        monthRight() {
            this.getMonthDayRight();
        },
        value(val) {
            let pickerTime = [];
            val.forEach((time) => {
                pickerTime.push(new Date(time).format("yyyy-MM-dd"));
            });
            this.Times = pickerTime;
        },
        

        clashTime(){
            if(this.clashTime.length>0 && this.clashTimeShow){
                this.year=this.clashTime[0].slice(0,4)
                this.month=this.clashTime[0].slice(5,7)
                this.yearRight=Number(this.month) === 12 ? Number(this.year)+1 : Number(this.year)
                this.monthRight=Number(this.month) === 12 ? 1 : Number(this.month)+1
                this.day=this.clashTime[0].slice(8,10)
            }
           
        },
        Times(){
            if(this.clashTime.length==0 && this.Times.length>0 && this.location){
                this.year=this.Times[0].slice(0,4)
                this.month=this.Times[0].slice(5,7)
                this.yearRight=Number(this.month) === 12 ? Number(this.year)+1 : Number(this.year)
                this.monthRight=Number(this.month) === 12 ? 1 : Number(this.month)+1
                this.day=this.Times[0].slice(8,10)
            }else if(this.clashTime.length>0){
                this.year=this.clashTime[0].slice(0,4)
                this.month=this.clashTime[0].slice(5,7)
                this.yearRight=Number(this.month) === 12 ? Number(this.year)+1 : Number(this.year)
                this.monthRight=Number(this.month) === 12 ? 1 : Number(this.month)+1
                this.day=this.clashTime[0].slice(8,10)
            }
        },

    
        
    },
    methods: {
        init() {
            return new Promise((resolve, reject) => {
                this.promise = { resolve, reject };
            });
        },

        destroyVm() {
            // 销毁          
            setTimeout(() => {
                this.$destroy(true); // 完全销毁一个实例。清理它与其它实例的连接，解绑它的全部指令及事件监听器
                // this.$el && this.$el.parentNode.removeChild(this.$el); // 删除dom
            }, 300);
        },



        showDataRang(e) {
            
            this.dataRang = true;
            this.RectData = this.getRect(e.target);
            bus.$emit('times', this.Times)
            document.addEventListener(
                "click",
                (event) => {
                    if (this.$refs.pickerdom && !this.$refs.pickerdom.contains(event.target)) {
                        let table = this.$refs.pickerdom;
                        table.onmousemove = null;
                        
                        this.dataRang = false;
                        this.DatePickerShow = false;
                        this.destroyVm()
                    }
                },
                false
            );
        },
        getRect(ele) {
            let rect = ele.getBoundingClientRect();
            var wWidth = window.innerWidth;
            var wHeight = window.innerHeight;
            return {
                top: rect.top,
                bottom: wHeight - rect.bottom,
                left: rect.left,
                right: wWidth - (rect.right + rect.x),
            };
        },
        getMonthDay() {
            let monthFirst = new Date(this.year + "-" + this.month + "-01 00:00");
            let w = monthFirst.getDay();

            this.startDay = monthFirst.getTime() - w * 24 * 3600 * 1000;
            if (this.month == 12) {
                this.endDay = new Date(this.year + 1 + "-01-01 00:00").getTime() - 1000;
            } else {
                this.endDay = new Date(this.year + "-" + (this.month + 1) + "-01 00:00").getTime() - 1000;
            }
            this.monthList = [];
            for (let i = 0; i < this.weekNum; i++) {
                let item = [];
                for (let j = 0; j < 7; j++) {
                    item.push(this.startDay + i * 24 * 3600 * 1000 * 7 + j * 24 * 3600 * 1000);
                }
                this.monthList.push(item);
            }
        },
        getMonthDayRight() {
            let monthFirst = new Date(this.yearRight + "-" + this.monthRight + "-01 00:00");
            let w = monthFirst.getDay();

            this.startDayRight = monthFirst.getTime() - w * 24 * 3600 * 1000;
            if (this.monthRight == 12) {
                this.endDayRight = new Date(this.yearRight + 1 + "-01-01 00:00").getTime() - 1000;
            } else {
                this.endDayRight = new Date(this.yearRight + "-" + (this.monthRight + 1) + "-01 00:00").getTime() - 1000;
            }
            this.monthListRight = [];
            for (let i = 0; i < this.weekNum; i++) {
                let item = [];
                for (let j = 0; j < 7; j++) {
                    item.push(this.startDayRight + i * 24 * 3600 * 1000 * 7 + j * 24 * 3600 * 1000);
                }
                this.monthListRight.push(item);
            }
        },
        prevMonth(right) {
            // if (!right) {
                
                this.clashTimeShow=false;
                if (this.month == 1) {
                    this.year = this.year - 1;
                    this.month = 12;
                } else {
                    this.month--;
                }
            // } else {
                if (this.monthRight == 1) {
                    this.yearRight = this.yearRight - 1;
                    this.monthRight = 12;
                } else {
                    this.monthRight--;
                }
            // }
        },
        nextMonth(right) {
            // if (!right) {
                
                this.clashTimeShow=false;
                if (this.month == 12) {
                    this.year = Number(this.year) + 1;
                    this.month = 1;
                } else {
                    this.month++;
                }
            // } else {
                if (this.monthRight == 12) {
                    this.yearRight = Number(this.yearRight) + 1;
                    this.monthRight = 1;
                   
                } else {
                     this.monthRight++;
                }
                
            // }
        },
        onClickTime(time) {
            // 不可选
        
            this.location=false;
            if (this.isExistDate(this.disabledTimeData, time)){
                this.DateListDelete("clashTimeData", time);
                this.DateListDelete("Times", time);
                return;
            } 

            // 冲突
            if (this.isExistDate(this.clashTimeData, time)) {
                this.DateListPush("disabledTimeData", time);
                
                return;
            }

            // 选中或取消选中
            if (this.isExistDate(this.Times, time)) {
                this.DateListDelete("Times", time);
            } else {
                this.DateListPush("Times", time);
            }
        },
        // 清空
        dateEmpty() {
            this.Times = [];
            this.dataRang = false;
            this.DatePickerShow=false;
            bus.$emit('times', this.Times)
            this.destroyVm()
        },
        // 确定
        dateSubmit() {

            bus.$emit('times', this.Times)
            this.dataRang = false;
            this.DatePickerShow=false;
            this.destroyVm()
        },
        // 是否包含在时间数组内
        isExistDate(TimeList, time) {
            if(TimeList!=null && TimeList!=''){
                let isExist = false;
                TimeList.forEach((timeItem) => {
                    if (new Date(timeItem).format("yyyy-MM-dd") === new Date(time).format("yyyy-MM-dd")) {
                        isExist = true;
                        return;
                    }
                });
                return isExist;
            }
           
        },
        // 时间数组添加一项
        DateListPush(TimeList, time) {
            this[TimeList].push(new Date(time).format("yyyy-MM-dd"));
        },
        // 时间数组删除一项
        DateListDelete(TimeList, time) {
            this[TimeList].forEach((timeItem, index) => {
                if (new Date(timeItem).format("yyyy-MM-dd") === new Date(time).format("yyyy-MM-dd")) {
                    this[TimeList].splice(index, 1);
                    return;
                }
            });
        },
    },
};
</script>

<style lang="scss" scoped>

.DatePicker {
    width: 250px;
    position: absolute;
    .gs-date-input {
        display: flex;
        align-items: center;
        width: 250px;
        height: 28px;
        border: 1px solid #f0f5fa;
        background: #fff;
        box-sizing: border-box;
        padding: 0 10px;
        border-radius: 5px;
        overflow: hidden;
        input {
            display: block;
            height: 100%;
            flex: 1;
            font-size: 14px;
            color: #000000;
        }
        i {
            margin-left: 10px;
        }
    }
    .gs-data-rang-box {
        position: absolute;
        box-shadow: 0px 2px 12px 0px rgba(0, 0, 0, 0.06);
        border: 1px solid #e4e7ed;
        border-radius: 4px;
        overflow: hidden;
        left: 0;
        top: 40px;
        z-index: 10000;
        &.gs-data-top {
            top: -380px;
            bottom: auto;
        }
        &.gs-data-bottom {
            top: 50px;
            bottom: auto;
        }
        &.gs-data-left {
            left: 0;
            right: auto;
        }
        &.gs-data-right {
            right: 0;
            left: auto;
        }
        .gs-data-rang {
            display: flex;
            .gs-date-picker-panel {
                width: 300px;
                box-sizing: border-box;
                background: #ffffff;
                &:last-of-type {
                    border: none;
                }
                .gs-date-select {
                    display: flex;
                    width: 100%;
                    height: 40px;
                    align-items: center;
                    border-bottom: 1px solid rgba(0, 0, 0, 0.09);
                    padding: 0 10px;
                    box-sizing: border-box;
                   
                    i {
                        cursor: pointer;
                    }
                    div {
                        display: flex;
                        height: 40px;
                        flex: 1;
                        width: 0;
                        justify-content: center;
                        align-items: center;
                        font-size: 14px;
                        color: #222222;
                    }
                }
                .gs-date-table {
                    margin: 0 auto;
                    table-layout: fixed;
                    width: calc(100% - 20px);
                    font-size: 14px;
                    color: #606266;
                    user-select: none;
                    box-sizing: border-box;
                    td,
                    th {
                        text-align: center;
                        height: 40px;
                    }
                    td {
                        position: relative;
                        cursor: pointer;
                        transition: all 0.1s;
                        background: #fff;
                        span {
                            display: flex;
                            justify-content: center;
                            align-items: center;
                            margin: 0 auto;
                            width: 24px;
                            height: 24px;
                            font-size: 14px;
                            border-radius: 2px;
                            margin-top: 1px;
                        }
                        &.gs-gray {
                            span {
                                color: #cccccc;
                            }
                        }
                        &.active {
                            span {
                                background: #457ff5;
                                color: #ffffff;
                            }

                            &:hover {
                                span {
                                    background: #457ff5;
                                    color: #ffffff;
                                    opacity: 0.6;
                                }
                            }
                        }
                        &.disabled {
                            span {
                                background: #ededed;
                                color: #606266;
                                cursor: not-allowed;
                            }

                            &:hover {
                                span {
                                    background: #ededed;
                                    color: #606266;
                                    opacity: 0.6;
                                }
                            }
                        }
                        &.clash {
                            span {
                                background: #e44c4c;
                                color: #ffffff;
                                cursor: pointer;
                            }

                            &:hover {
                                span {
                                    background: #e44c4c;
                                    color: #ffffff;
                                    opacity: 0.6;
                                }
                            }
                        }

                        &.startActiveStart,
                        &.startActiveEnd {
                            border-top-left-radius: 5px;
                            border-bottom-left-radius: 5px;
                            &::before {
                                content: "";
                                position: absolute;
                                left: 0;
                                top: 50%;
                                transform: translateY(-50%);
                                height: 100%;
                                width: 5px;
                                background: #28a8ff;
                                border-top-left-radius: 5px;
                                border-bottom-left-radius: 5px;
                            }
                        }
                        &.endActiveStart,
                        &.endActiveEnd {
                            border-top-left-radius: 5px;
                            border-bottom-left-radius: 5px;
                            &::after {
                                content: "";
                                position: absolute;
                                right: 0;
                                top: 50%;
                                transform: translateY(-50%);
                                height: 100%;
                                width: 5px;
                                background: #28a8ff;
                                border-top-right-radius: 5px;
                                border-bottom-right-radius: 5px;
                            }
                        }
                        &:hover {
                            color: #457ff5;
                        }
                    }
                }
            }
        }
        .gs-data-footer {
            display: flex;
            justify-content: space-between;
            align-items: center;
            height: 48px;
            // border-top: 1px solid rgba(0, 0, 0, 0.09);
            padding: 0 25px;
            background: #fff;
            .gs-data-legend {
                display: flex;
                align-items: center;
                height: 100%;
                div {
                    display: flex;
                    align-items: center;
                    font-size: 14px;
                    color: #222222;
                    line-height: 1;
                    margin-right: 14px;
                    &:last-of-type {
                        margin-right: 0;
                    }
                    i {
                        display: block;
                        width: 9px;
                        height: 9px;
                        margin-right: 6px;
                    }
                    &:nth-child(1) {
                        i {
                            background: #ededed;
                        }
                    }
                    &:nth-child(2) {
                        i {
                            background: #457ff5;
                        }
                    }
                    &:nth-child(3) {
                        i {
                            background: #e44c4c;
                        }
                    }
                }
            }
            .gs-data-btnBox {
                display: flex;
                justify-content: flex-end;
                div {
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    width: 48px;
                    height: 24px;
                    border: 1px solid #eeeeee;
                    border-radius: 3px;
                    font-size: 12px;
                    color: #457ff5;
                    background-color: #ffffff;
                    line-height: 1;
                    margin-right: 8px;
                    cursor: pointer;
                    transition: all 0.2s;
                    &:last-of-type {
                        margin-right: 0;
                    }
                    &:hover {
                        border-color: #457ff5;
                        background-color: #457ff5;
                        color: #ffffff;
                    }
                }
            }
        }
    }
}
</style>
