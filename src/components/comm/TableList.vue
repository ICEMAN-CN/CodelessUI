<template>
    <div class="TableList">
        <div class="ManagementTable draggable">
            <el-table
                :key="tableKey"
                :data="tableData"
                stripe
                ref="table"
                size="small"
                @selection-change="handleSelectionChange"
                :header-cell-style="headerCellStyle"
                :height="height"
                :cell-style="cellStyle"
                :show-summary="showSummary"
                v-loading="loading"
                row-key="id"
                
            >
            
                <el-table-column v-if="selection"  type="selection" width="60">
                </el-table-column>
                <template v-for="i in colrs">
                    <el-table-column
                        :key="i.name"
                        :label="i.label"
                        :column-key="i.prop"
                        :width="i.width"
                        :fixed="i.fixed"
                        :sortable='i.sortable'
                    >
                        <template slot-scope="scope">
                            <slot name="TableItem" :row="scope.row" :colr="i" :rowIndex="scope.$index">
                                <span>{{ scope.row[i.prop] }}</span>
                            </slot>
                        </template>
                        <template slot="header">
                            <slot name="header" :row="i">
                                <template v-if="TableFilters && TableFilters[i.prop]">
                                    <div
                                        class="filterHeader"
                                        @click="
                                            filter(
                                                i.prop,
                                                TableFilters[i.prop],
                                                TableDefaultFilter ? TableDefaultFilter[i.prop] : []
                                            )
                                        "
                                    >
                                        {{ i.label }}
                                        <i
                                            class="listScreen"
                                            :class="{
                                                cur:
                                                    TableDefaultFilter &&
                                                    TableDefaultFilter[i.prop].length > 0
                                            }"
                                        ></i>
                                    </div>
                                </template>
                                <template v-else>
                                    {{ i.label }}
                                </template>
                            </slot>
                        </template>
                    </el-table-column>
                </template>
                <el-table-column label="操作" :width="ButtonWidth" v-if="this.$scopedSlots.Button && btnFixed" :fixed="fixed">
                    <template slot-scope="scope">
                        <slot name="Button" :index="scope.$index" :row="scope.row"></slot>
                    </template>
                </el-table-column>
                <el-table-column label="操作" :width="ButtonWidth" v-if="this.$scopedSlots.Button && btnFixed==false" >
                    <template slot-scope="scope">
                        <slot name="Button" :index="scope.$index" :row="scope.row"></slot>
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <el-pagination
            :hide-on-single-page='hideOnSinglePage'
            :current-page.sync="currentPage"
            :page-sizes="[20, 50, 100, 500]"
            layout="total, sizes, prev, pager, next"
            :page-size="pagesize"
            @size-change="handleSizeChange"
            @current-change="currentChange"
            :total="total"
        >
        </el-pagination>
        <div class="addLine" v-if="isShowAddLine" @click="addLine">
            <i></i>
            <span>增加一条</span>
        </div>
        <!-- 筛选 -->
        <filter-module
            :filters="filterModuleFilters"
            :defaultFilter="filterModuleDefaultFilter"
            :dialogVisible="filterModuleDialogVisible"
            @close="filterModuleDialogVisible = false"
            @changeFilter="changeFilter"
        ></filter-module>
    </div>
</template>

<script>
import filterModule from "./filterModule.vue";
import Sortable from 'sortablejs'
export default {
    name: "TableList",
    components: { filterModule },
    props: {
        ButtonWidth: {
            type: [String, Number],
            default: 180
        },
        fixed: {
           type: [String],
            default: 'right'
        },
        btnFixed: {
            type: [Boolean],
            default: false
        },
        tableData: {
            type: [Array, Object],
            default: []
        },
        colrs: {
            type: [Array],
            default: []
        },
        total: {
            type: [String, Number],
            default: 0
        },
        filters: {},
        defaultfilter: {},
        pagesize: {
            type: [String, Number],
            default: 15
        },
        pageIndex: {
            type: [String, Number],
            default: 0
        },
        isShowAddLine: {
            type: [Boolean],
            default: false
        },
        showSummary: {
            type: [Boolean],
            default: false
        },
        loading: {
            type: [Boolean],
            default: false
        },
        selection:{
            type: [Boolean],
            default: false
        },
        height:{
            type: [String, Number],
        },
        hideOnSinglePage:{
            type: [Boolean],
            default: false
        }
        
    },
    data() {
        return {
            tableKey: 0,
            tableHeight: 50,
            isShowInput: false,
            filterModuleDialogVisible: false,
            // 筛选 Start
            TableFilters: this.filters,
            TableDefaultFilter: this.defaultfilter,
            filterProp: "",
            filterModuleFilters: {},
            filterModuleDefaultFilter: [],
            // 筛选End
            dom:'',
        };
    },
    mounted() {
        this.resizeTable();
        // this.rowDrop()
    },
 
    methods: {
     
        resizeTable() {
            this.$nextTick(() => {
                let that = this;
                let pageHeight = that.total > that.pagesize ? 52 : 0;
                this.tableHeight = window.innerHeight - that.$refs.table.$el.offsetTop - 30 - pageHeight;
                window.onresize = function() {
                    that.tableHeight = window.innerHeight - that.$refs.table.$el.offsetTop - 30 - pageHeight;
                };
            });
        },
        // 表头样式
        headerCellStyle({ row, column, rowIndex, columnIndex }) {
            var redBoo = column.label == "外部成本" || column.label == "总成本" || column.label == "成本";
            var greenBoo = column.label == "毛利";
            // column.label == "约定付款时间" ||
            var rightBoo =
                column.label == "约定付款金额" ||
                column.label == "实际付款金额" ||
                column.label == "刊例总价汇总" ||
                column.label == "折后总价汇总" ||
                column.label == "实卖价" ||
                column.label == "实际折扣" ||
                column.label == "配送金额" ||
                column.label == "核心补量金额" ||
                column.label == "补量后折扣" ||
                column.label == "下单金额" ||
                column.label == "代理返点" ||
                column.label == "特殊成本" ||
                column.label == "发票成本" ||
                column.label == "预扣成本" ||
                column.label == "应收金额" ||
                column.label == "已回款" ||
                column.label == "未回款" ||
                column.label == "刊例价" ||
                column.label == "数量" ||
                column.label == "刊例总价" ||
                column.label == "政策折扣" ||
                column.label == "回款率" ||
                column.label == "配送比" ||
                column.label == "金额" ||
                column.label == "售卖刊例总价" ||
                column.label == "售卖刊例总价汇总" ||
                column.label == "执行总价" ||
                column.label == "执行总价汇总" ||
                column.label == "实付成本" ||
                column.label == "财务费用" ||
                column.label == "折后总价";              
            if (redBoo) {
                return "color: #FF3F3F; text-align: right; background: #F1F5F9;";
            } else if (greenBoo) {
                return "color: #19A73A; text-align: right; background: #F1F5F9;";
            } else if (rightBoo) {
                return "text-align: right; background: #F1F5F9;";
            } else {
                return "background: #F1F5F9;";
            }
        },
        cellStyle({ row, column, rowIndex, columnIndex }) {
            var redBoo = column.label == "外部成本" || column.label == "总成本" || column.label == "成本";
            var greenBoo = column.label == "毛利";
            // column.label == "约定付款时间" ||
            var rightBoo =
                column.label == "约定付款金额" ||
                column.label == "实际付款金额" ||
                column.label == "刊例总价汇总" ||
                column.label == "折后总价汇总" ||
                column.label == "实卖价" ||
                column.label == "实际折扣" ||
                column.label == "配送金额" ||
                column.label == "核心补量金额" ||
                column.label == "补量后折扣" ||
                column.label == "下单金额" ||
                column.label == "代理返点" ||
                column.label == "特殊成本" ||
                column.label == "发票成本" ||
                column.label == "预扣成本" ||
                column.label == "应收金额" ||
                column.label == "已回款" ||
                column.label == "未回款" ||
                column.label == "刊例价" ||
                column.label == "数量" ||
                column.label == "刊例总价" ||
                column.label == "政策折扣" ||
                column.label == "回款率" ||
                column.label == "配送比" ||
                column.label == "金额" ||
                column.label == "售卖刊例总价汇总" ||
                column.label == "售卖刊例总价" ||
                column.label == "执行总价" ||
                column.label == "执行总价汇总" ||
                column.label == "实付成本" ||
                column.label == "财务费用" ||
                column.label == "折后总价";
            if (redBoo) {
                return "color: #FF3F3F; text-align: right;";
            } else if (greenBoo) {
                return "color: #19A73A; text-align: right;";
            } else if (rightBoo) {
                return "text-align: right;";
            } else {
                return "";
            }
        },
       
        handleStyle(label) {
            var redBoo = label == "外部成本" || label == "总成本";
            var greenBoo = label == "毛利";
            if (redBoo) {
                return "color: #FF3F3F; text-align: right; background: #F1F5F9;";
            } else if (greenBoo) {
                return "color: #19A73A; text-align: right; background: #F1F5F9;";
            } else {
                return "background: #F1F5F9;";
            }
        },
        showInput(isInput, index) {
            if (isInput) {
                this.isShowInput = true;
                this.colrs[index].isInput = true;
                // // console.log(this.colrs);
            }
        },
        headerIconClick() {},
        // 处理选中的行
        handleSelectionChange(val) {
            this.$emit("handleSelectionChange", val);
        },
        // 增加一行
        addLine() {
            this.$emit("handleAddLine", true);
        },
        // 改变每页显示数量
        handleSizeChange(size) {
            this.$emit("handleSizeChange", size);
            this.resizeTable();
        },
        currentChange(val) {
            this.$emit("currentChange", val);
        },
        modifyItem(data) {
            // // console.log(data);
        },
        // 筛选
        filter(filterProp, filters, defaultfilter) {
            this.filterProp = filterProp;
            this.filterModuleFilters = filters;
            this.filterModuleDefaultFilter = defaultfilter;
            this.filterModuleDialogVisible = true;
        },
        // 筛选回调
        changeFilter(selectedFilter) {
            this.$emit("changeFilter", {
                filterProp: this.filterProp,
                selectedFilter: selectedFilter
            });
        },
          //行拖拽
        // rowDrop() {   
        //     let dragTbale=document.getElementsByClassName('dragTbale')
        //     for (let i = 0; i < dragTbale.length; i++) {
        //         // const tbody = document.querySelector('.dragTbale tbody')
        //         const tbody=dragTbale[i].childNodes[0].childNodes[0].childNodes[2].childNodes[0].childNodes[1];
        //         const _this = this
        //         Sortable.create(tbody, {
        //             draggable: ".el-table__row",
        //             onEnd({ newIndex, oldIndex }) {
        //             const currRow = _this.tableData.splice(oldIndex, 1)[0]
        //             _this.tableData.splice(newIndex, 0, currRow)
        //             }
        //         })
        //     }
        // },

        
        

       
    },
    activated() {
        //解决使用keep-alive后 element表格错位问题
        this.$nextTick(() => {
            this.$refs.table.doLayout();
        });
    },
    watch: {
        total(val) {
            let that = this;
            let pageHeight = that.total > that.pagesize ? 52 : 0;
            this.tableHeight = window.innerHeight - that.$refs.table.$el.offsetTop - 30 - pageHeight;
        },
        tableData(val) {},
        filters: {
            deep: true,
            handler(val) {
                this.TableFilters = val;
                this.tableKey++;
            }
        },
        defaultfilter: {
            deep: true,
            handler(val) {
                // console.log(val);
                // this.TableDefaultFilter = {};
                // this.$set(this, "TableDefaultFilter", val);
                this.TableDefaultFilter = val;
                this.tableKey++;
            }
        },
        

    },
    computed: {
        currentPage: {
            get() {
                return this.pageIndex + 1;
            },
            set() {}
        }
    }
};
</script>

<style lang="scss" scoped>
.TableList {
    .ManagementTable {
        margin-top: 12px;
        margin-bottom: 16px;
    }
    .addLine {
        display: inline-flex;
        align-items: center;
        cursor: pointer;
        margin-top: 20px;
        margin-left: 43px;
        i {
            width: 12px;
            height: 12px;
            background: url("../../assets/image/icon_add.png") no-repeat center / 12px;
            margin-right: 4px;
        }
        span {
            font-size: 12px;
            font-weight: bold;
            color: #457ff5;
            line-height: 16px;
        }
    }
}
/* 去掉中间数据的分割线 */
/deep/ .el-table__row > td {
    // border: none;
}
/* 去掉上面的线 */
/deep/ .el-table th.is-leaf {
    border: none;
}
/* 去掉最下面的那一条线 */
/deep/ .el-table::before {
    height: 0px;
}

/deep/.el-table__fixed, /deep/.el-table__fixed-right {
    padding-bottom: 8px;
}
/deep/::-webkit-scrollbar{
    height: 10px;
}
</style>
