<template>
    <div class="ResourceDetailsForm">
        <el-form :model="formData" :rules="rules">
            <el-form-item label="索引">
                {{ formData.id }}
            </el-form-item>
        </el-form>
        <div class="determineBox">
            <el-button type="primary" @click="save">保存</el-button>
        </div>
    </div>
</template>

<script>
export default {
    name: "ResourceDetailsForm",
    data() {
        return {
            formData: {
                id: "无",
            },
        };
    },
    mounted() {},
    methods: {
        save() {},
    },
    components: {},
};
</script>

<style lang="scss" scoped>
</style>