<template>
    <el-dialog
        custom-class="dialog"
        title="筛选"
        :visible.sync="dialogVisible"
        destroy-on-close
        width="230px"
        @open="open"
        @close="close"
    >
        <div class="dialogBox">
            <el-autocomplete
                class="autocompleteInput"
                v-model="autocomplete"
                :fetch-suggestions="autocompleteQuerySearch"
                :trigger-on-focus="false"
                placeholder="请输入内容"
                @select="autocompleteSelect"
                @blur="autoBlur"
                size="small"
                placement='false'
            ></el-autocomplete>
            <!-- <el-select v-model="filterModel" multiple filterable size="small" placeholder="请输入或选择筛选项">
                <el-option v-for="item in filters" :key="item" :label="item" :value="item"></el-option>
            </el-select> -->
            <el-checkbox-group v-model="filterModel" >
                <el-checkbox v-for="item in filterList" :key="'checkbox' + item" :label="item"></el-checkbox>
            </el-checkbox-group>
        </div>
        <div slot="footer" class="dialog-footer">
            <el-button @click="checkAll" size="mini">全选</el-button>
            <el-button @click="checkAllCancel" size="mini">全部取消</el-button>
            <el-button type="primary" @click="confirm" size="mini">确定</el-button>
        </div>
    </el-dialog>
</template>
<script>
export default {
    name: "filterModule",
    props: {
        filters: {},
        defaultFilter: {},
        dialogVisible: {
            default: false
        }
    },
    data() {
        return {
            filterModel: [],
            autocomplete: "",
            filterList:[],

        };
    },
    mounted() {
      
    },
    methods: {
        // 输入筛选
        autocompleteQuerySearch(queryString, cb) {
            this.filterList=this.filters
            let results = this.filters;
            if(queryString) {         
                results = this.filters.filter(item => {
                    return item.toLowerCase().indexOf(queryString.toLowerCase()) >= 0;
                });
                this.filterList = this.filterList.filter(item => {
                    return item.toLowerCase().indexOf(queryString.toLowerCase()) >= 0;
                });
            }
            results = results.map(item => {
                return {value: item};
            })
            cb(results);
        },
        autocompleteSelect(searchResult) {
            
            let ResultIndex = this.filterModel.findIndex(item => {
                return item == searchResult.value;
            });
            if(ResultIndex >= 0) {
                this.filterModel.splice(ResultIndex, 1);
            }else{
                this.filterModel.push(searchResult.value);
            }
        },

        autoBlur(){
             if(this.autocomplete==''){
                 this.filterList=this.filters
             }
        },
        checkAll() {
         
            this.filterModel = JSON.parse(JSON.stringify(this.filterList));
        },
        checkAllCancel() {
            this.filterModel = [];
        },
        confirm() {
            this.$emit("changeFilter", this.filterModel);
            this.close();
        },
        open() {
            this.filterList=this.filters
            this.filterModel = this.defaultFilter;
        },
        close() {
            this.autocomplete = "";
            this.filterModel = [];
            this.$emit("close", true);
        },

       
       
        
    }
};
</script>
<style lang="scss" scoped>
/deep/ .dialog {
    border-radius: 8px;
}
.dialogBox {
    max-height: 300px;
    overflow-x: hidden;
    overflow-y: auto;
}
.autocompleteInput{
    margin-bottom: 9px;
}
/deep/ .el-dialog__body {
    padding: 8px 8px 0;
}
/deep/ .el-dialog__header {
    padding: 20px 20px 10px;
}
/deep/ .el-dialog__footer {
    padding: 12px 8px !important;
}
/deep/ .el-select {
    margin-bottom: 9px;
}
/deep/ .el-checkbox {
    width: 100%;
    margin-bottom: 9px;
    margin-right: 0;
    box-sizing: border-box;
    &:last-of-type {
        margin-bottom: 0;
    }
}
/deep/ .el-autocomplete-suggestion{
    display: none;
}
</style>
