<template>
    <div class="Header">
        <div class="menuBox">
            <my-menu></my-menu>
        </div>
        <user></user>
    </div>
</template>

<script>
import user from '../Header/user.vue';
import MyMenu from '../Header/menu.vue'
export default {
    name: "Header",
    data() {
        return {};
    },
    mounted() {},
    methods: {},
    components: {
        user,
        MyMenu
    },
};
</script>

<style lang="scss" scoped>
.Header {
    width: 100%;
    height: 60px;
    background: #2E354D;
    display: flex;
    align-items: center;
    padding: 0 20px 0 28px;
    box-sizing: border-box;
    position: fixed;
    width: 100%;
    z-index: 99;
    .logo {
        width: 76px;
        height: 20px;
        background: url("../../assets/image/logo.png") no-repeat center / 76px 20px;
        margin-right: 195px;
    }
    .menuBox {
        flex: 1;
    }
}
</style>