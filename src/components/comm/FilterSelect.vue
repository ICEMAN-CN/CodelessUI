<template>
    <div class="FilterSelect">
        <el-dialog title="筛选" :visible.sync="dialogVisibleFlag" @close="cancel">
            <el-autocomplete
                v-model="state"
                :fetch-suggestions="querySearchAsync"
                placeholder="请输入内容"
                @select="handleSelect"
                size="small"
            ></el-autocomplete>
            <div class="checkboxgroupBox">
                <el-checkbox-group v-model="checkedList" @change="handleCheckedChange">
                    <el-checkbox v-for="city in list" :label="city" :key="city">{{ city }}</el-checkbox>
                </el-checkbox-group>
            </div>
            <div slot="footer" class="dialog-footer">
                <el-button @click="checkAll" size="mini">全选</el-button>
                <el-button @click="checkAllCancel" size="mini">全部取消</el-button>
                <el-button type="primary" @click="confirm" size="mini">确定</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
export default {
    name: "FilterSelect",
    props: {
        selectList: {
            type: [Object],
            default: {}
        },
        dialogVisible: {
            type: [Boolean],
            default: false
        },
        filterProp: {
            type: [String],
            default: ""
        }
    },
    data() {
        return {
            dialogVisibleFlag: false,
            checkedList: [],
            list: [],
            isIndeterminate: false,
            data: {},
            state: "",
            timeout: null
        };
    },
    mounted() {
    },
    methods: {
        querySearchAsync(queryString, cb) {
     
            var list = this.list;
            
            if (!queryString) {
                this.list = this.selectList[this.filterProp];
                return;
            }
            
            var resultsFlag = queryString ? list.filter(this.createStateFilter(queryString)) : list;
            var results = resultsFlag.map(item => {
                return { value: item };
            });

            // console.log(results);
            clearTimeout(this.timeout);
            this.timeout = setTimeout(() => {
                  
                cb(results);
            }, 500 * Math.random());
        },
        createStateFilter(queryString) {
            
           
            return state => {
          
                return state.toLowerCase().indexOf(queryString.toLowerCase()) === 0;
            };
        },
        handleSelect(item) {
         
            this.list = [item.value];
           
        },
        handleList() {
            this.list = this.selectList[this.filterProp];
        },
        handleCheckedChange(value) {
            let data = {
                [this.filterProp]: value
            };
            this.data = data;
            this.checkedList = value;
        },
        // 全选
        checkAll() {
            this.checkedList = this.list;
            this.data = {
                [this.filterProp]: this.checkedList
            };
        },
        checkAllCancel() {
            this.checkedList = [];
            this.data = {
                [this.filterProp]: this.checkedList
            };
        },
        // 确定
        confirm() {
            // // console.log(this.checkedList);

            this.$emit("changeFilter", this.checkedList);
            this.dialogVisibleFlag = false;
        },
        cancel() {
            this.$emit("close", true);
            this.dialogVisibleFlag = false;
        }
    },
    components: {},
    watch: {
        dialogVisible(newData) {
            this.dialogVisibleFlag = newData;
        },
        filterProp(newData) {
            this.list = this.selectList[newData];
            this.checkedList = this.selectList[newData];
            this.data = {
                [newData]: this.checkedList
            };
        }
    }
};
</script>

<style lang="scss" scoped>
// 多选框样式
.checkboxgroupBox {
    max-height: 640px;
    overflow-y: scroll;
    overflow-x: hidden;
    // padding: 0 8px;
    box-sizing: border-box;
}
.el-checkbox {
    padding: 0 8px;
    box-sizing: border-box;
}
.el-checkbox:first-child {
    padding-top: 8px;
}
.el-checkbox:last-child .checkboxStyle {
    margin-bottom: 0;
}
.checkboxStyle {
    width: 100%;
    height: 32px;
    border-radius: 4px;
    padding: 7px 9px;
    box-sizing: border-box;
    margin-bottom: 6px;
}
.checkboxStyle.is-checked {
    background: #f4f4f4;
}
.checkboxBtnBox {
    display: flex;
    align-items: center;
    width: 100%;
    height: 56px;
    border-radius: 0px 0px 8px 8px;
    background: #f5f7f9;
    padding: 0 8px;
    box-sizing: border-box;
}
/deep/ .el-dialog {
    width: 230px;
    border-radius: 8px;
}
/deep/ .el-checkbox-group {
    display: flex;
    flex-direction: column;
}
/deep/ .el-checkbox {
    width: 206px;
    height: 32px;
    padding: 9px;
    box-sizing: border-box;
}
/deep/ .el-dialog__body {
    padding: 8px 8px 0 !important;
}
/deep/ .el-dialog__footer {
    padding: 12px 8px !important;
}
/deep/ .dialog-footer {
    display: flex;
}
/deep/ .el-autocomplete {
    padding-left: 6px;
}
</style>