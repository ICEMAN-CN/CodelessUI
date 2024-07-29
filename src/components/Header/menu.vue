<template>
    <div class="Menu">
        <el-menu
            :default-active="$route.name"
             style="background:#2E354D"
             active-text-color="#fff"
             text-color="rgba(255,255,255,0.8)"
            mode="horizontal"
            ref="menu"
            
            @select="menuPush"
        >
            <template v-for="submenu in asideList">
                <el-submenu
                    :index="String(submenu.menuId)"
                    class="asideElSubmenu el-menu-item"
                    :key="'submenu' + submenu.menuId"
                    v-if="submenu.children && submenu.component != ''"
                    :class="{clearBg:$route.query.recovery==0}"
                >
                    <template slot="title">
                        <i class="nav-icon-menu"></i>
                        <span slot="title" 
                         :class="{active:submenu.active1}"
                         class=""
                        @click="menuClick(submenu)"                        
                        >{{ submenu.menuName }}</span>
                    </template>
                    <el-menu-item
                        v-for="menu in submenu.children"
                        :key="'menu' + menu.menuId"
                        :index="menu.component"
                        @click="menuClick(submenu)"    
                        :class="{clearBg:$route.query.recovery==0}"
                        >{{ menu.menuName }}</el-menu-item
                    >
                </el-submenu>
                <el-menu-item
                    v-else-if="submenu.component != ''"
                    :index="submenu.component"
                    :key="'submenu' + submenu.menuId"
                    :class="{active:submenu.active,clearBg:$route.query.recovery==0}"
                    @click="menuClick(submenu)"
                    
                    >{{ submenu.menuName }}</el-menu-item
                >
            </template>
        </el-menu>
    </div>
</template>

<script>
export default {
    name: "Menu",
    data() {
        return {
            active:false,
            asideList: [
            ],
        };
    },
    mounted() {
      
        for(let i=0;i<this.asideList.length;i++){
            if(this.$route.path.indexOf(this.asideList[i].component)>-1){
                this.asideList[i].active=true;
            }        
        }

       
    },
    methods: {
        menuPush(SelectName) {
        },

      

        menuClick(e){
            console.log(e)
            if (e.menuId > 10) {
                console.log("e")
                console.log(e.linkUrl)
                window.open(e.linkUrl);
            }
        }
    
    },
    components: {},
};
</script>

<style lang="scss" scoped>

.Menu {
    .el-menu.el-menu--horizontal {
        border-bottom: none;
        display: flex;
        justify-content: flex-start;
    }
    .el-menu-item {
        width: 144px;
        box-sizing: border-box;
        padding: 0 ;
        text-align: center;
        // margin-right: 4.5%;
        text-align: center;
        font-size: 16px;
        color: rgba(255, 255, 255, 0.8);
        z-index: 999;
        &:hover,
        &.is-active {
            color: #fff !important;
            background-color: #404861 !important;
            border-bottom-width: 0px;
        }
        &.is-active {
            font-weight: 500;
        }
        &.clearBg{
            background: #2E354D !important;
        }

    }
   

}

.active{
    
    border-bottom-width: 0px !important;
}


/deep/ .el-menu--horizontal > .el-submenu .el-submenu__title {
    font-size: 16px;
    color: rgba(255, 255, 255, 0.8);
    border: 0 !important;
}
/deep/.el-menu--horizontal>.el-menu-item{
    border: 0 !important;
    
}
/deep/ .el-menu--horizontal > .el-submenu.is-active .el-submenu__title {
    font-size: 16px;
    color: rgba(255, 255, 255, 0.8);
    border-bottom-width: 0px;
}
/deep/ .el-menu--horizontal .el-menu-item:not(.is-disabled):hover{
    color:#fff !important;
    border-bottom-width: 0px;
    background-color: #404861 !important;
}
/deep/ .el-menu--horizontal .el-menu-item:not(.is-disabled):focus{
    color:#fff !important;
    border-bottom-width: 0px;
    background-color: #404861 !important;
}
/deep/ .el-submenu .el-submenu__title {
    padding: 0 0;
    display: flex;
    align-items: center;
    justify-content: center;
    &:hover {
        color: #fff !important;
        border-bottom-width: 0px;
        background-color: #404861 !important;
    }
}
/deep/.el-menu--popup-bottom-start{
    margin-top: 0 !important;
}


</style>