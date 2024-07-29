<template>
    <div id="GsManageView" :class="{homeBg:$route.name=='homepage'}">
        <router-view></router-view>
    </div>
</template>
<script>
export default {
    name: "GsManageView",
};
</script>
<style lang="scss">
.homeBg{
    background: #fff;
    height: 100%;
}
.contentBlock {
    background: #ffffff;
    border-radius: 4px;
    padding: 20px;
    box-sizing: border-box;
    margin-bottom: 20px;
}
.contentBlock:last-child {
    margin-bottom: 0;
}
.zhanweiBox {
    background: #fff;
    height: 80px;
}
.topBtnBox {
    display: flex;
    align-items: center;
    justify-content: space-between;
}

.bottomBtnBox {
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    width: 98%;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    background-color: #fff;
    padding: 18px 20px;
    margin: 0 auto;
    box-sizing: border-box;
    z-index: 999;
    box-shadow: 0px 0px 5px 5PX rgba(0, 0, 0, 0.03);
}
.determineBox {
    width: 100%;
    display: flex;
    justify-content: flex-end;
    align-items: center;
}
.el-menu--popup {
    // background-color: #fff !important;
    min-width: 144px !important;
    padding: 0 0 !important;
    margin-top: 0 !important;
}

.el-menu--popup .el-menu-item {
    width: 144px;
    height: 40px !important;
    background-color: #2E354D !important;
    color: rgba(255, 255, 255, 0.8);
    text-align: center;
    
}
.el-menu--popup .el-menu-item:hover{
    background-color: #404861 !important;
}
.el-menu--popup .el-menu-item.is-active {
    background-color: #404861 !important;
    color: #fff !important;
    &.clearBg{
        background: #2E354D !important;
    }
}

::-webkit-scrollbar {
    width: 4px;
    height: 4px;
    // background-color: rgba(255, 255, 255, 0);
    
}
::-webkit-scrollbar-thumb {
    background-color: #d8d8d8;
}
::-webkit-scrollbar-track {
    border-radius: 2px;
    background: rgba(255, 255, 255, 0);
}

.listScreen{
    width: 10px;
    height: 10px;
    display: inline-block;
    background: url(./assets/image/shaixuan-wxz.png);
    &.cur{
        background: url(./assets/image/shaixuan-yxz.png);
    }
}

.el-dialog{
    margin-top: 10vh !important;
}


</style>