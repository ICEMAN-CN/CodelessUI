<template>
    <div class="User">
        <el-popover
        class="user-box-popover"
        popper-class="user-popover"
        placement="bottom-end"
        :visible-arrow="false"
        width="100"
        trigger="hover">
            <div class="editPassword" @click="changePassword">修改密码</div>
            <a class="userBtn" href="javascript:;" @click="LoginOut()" style="color: #457FF5;">退出登录</a>
            <!-- <el-avatar slot="reference" icon="el-icon-user-solid" :size="24" :src="$utils.storage.get('userBasicInfo') ? $utils.storage.get('userBasicInfo').avatar : ''" fit="cover"></el-avatar> -->
            <div slot="reference" style="cursor: pointer;">{{username}}</div>
        </el-popover>
    </div>
</template>

<script>
import userApi from "../../api/userApi";
export default {
    name: "User",
    data() {
        return {
            avatar: "",
            username:''
        };
    },
    mounted() {

    },
    methods: {
        UserInfo() {
            userApi.UserInfo({}).then(response => {
                if(response.code == 0) {
                    this.$utils.storage.set('userBasicInfo', response.data.userBasicInfo);
                    this.username=this.$utils.storage.get('userBasicInfo').username
                }
            });
        },
        LoginOut() {
            userApi.Logout({}).then(response => {
                if(response.code == 0) {
                    this.$utils.storage.remove("Authorization");
                    this.$utils.storage.remove("userBasicInfo");
                    this.$router.push({name: 'login'});
                    location.reload();
                }else{
                    this.$message.error(response.message);
                }
            });
        },
        changePassword(){
            this.$router.push({name:'changePassword'});
        }
    },
    components: {},
};
</script>

<style lang="scss" scoped>
.User {
    // width: 24px;
    // height: 24px;
    // border-radius: 50%;
    // background: pink;
    color: rgba(255, 255, 255, 0.8);
    

}
.editPassword{
    color: #457FF5;
    margin-bottom: 10px;
    cursor: pointer;
}
</style>