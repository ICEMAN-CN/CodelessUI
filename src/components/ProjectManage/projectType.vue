<template>
    <div class="ProjectType">
        <div class="selectBox">
            <el-select v-model="state" placeholder="请选择" size="small">
                <el-option
                    v-for="item in stateOptions"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                >
                </el-option>
            </el-select>
        </div>
        <table-list
            :ButtonWidth="0"
            :tableData="projectList"
            :colrs="projectColrs"
            :total="total"
        >
        </table-list>
    </div>
</template>

<script>
import TableList from "../comm/TableList.vue";
export default {
    name: "ProjectType",
    props: {
        projectList: {
            type: [Array, Object],
            default: null,
        },
        total: {
            type: [Number],
            default: 0,
        },
        projectColrs: {
            type: [Array, Object],
            default: null,
        },
    },
    data() {
        return {
            state: "",
            stateOptions: [
                { value: "0", label: "全部" },
                { value: "1", label: "未提审" },
                { value: "2", label: "未审批" },
                { value: "3", label: "已审批" },
            ],
        };
    },
    mounted() {},
    methods: {},
    components: { TableList },
};
</script>

<style lang="scss" scoped>
.ProjectType {
    .selectBox {
        margin-bottom: 20px;
    }
}
</style>