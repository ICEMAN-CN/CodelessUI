<template>
    <div class="copyProjectForm">
        <el-form :model="formData" :rules="rules">
            <el-input
                v-model="formData.projectId"
                placeholder="请输入需要复制到的合同id"
            ></el-input>
            <p class="tip" v-show="isHaveProjectId">
                输入的合同id不存在，请重新输入
            </p>
        </el-form>
        <div class="determineBox">
            <el-button type="primary" @click="CopyProject">确定</el-button>
        </div>
    </div>
</template>

<script>
export default {
    name: "copyProjectForm",
    data() {
        return {
            rules: {},
            formData: {
                projectId: "",
            },
            isHaveProjectId: false,
        };
    },
    mounted() {},
    methods: {
        CopyProject() {
            this.$emit("close", false);
        },
    },
    components: {},
};
</script>

<style lang="scss" scoped>
.copyProjectForm {
    .tip {
        font-size: 12px;
        color: #fa3434;
        margin-top: 6px;
        padding-left: 16px;
        box-sizing: border-box;
        line-height: 16px;
    }
    .determineBox {
        margin-top: 70px;
    }
}
</style>