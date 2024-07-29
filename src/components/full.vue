<template>
    <div class="Full">
        <el-container>
            <el-header>
                <header-com></header-com>
            </el-header>
            <el-main>
                <router-view />
            </el-main>
        </el-container>
    </div>
</template>

<script>
import { HeaderCom } from "./comm";
export default {
    name: "Full",
    data() {
        return {};
    },
    mounted() {},
    methods: {},
    components: {
        HeaderCom,
    },
};
</script>

<style lang="scss" scoped>
.Full {
    .el-header {
        padding: 0 0;
    }
    .el-main {
        // background-color: #eaeef5;
        overflow: visible;
        min-height: 90vh;
    }
}
</style>