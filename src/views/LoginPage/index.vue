<template>
    <div class="LoginPage">
        <div class="LoginFormWrap">
            <div class="loginWarpper">
                <div class="loginTitle">开发工具平台</div>
                <el-form
                    :model="userForm"
                    ref="userForm"
                    label-width="60px"
                    class="userForm"
                >
                    <el-form-item label="用户名">
                        <el-input
                            size="small"
                            v-model="userForm.userName"
                        ></el-input>
                    </el-form-item>
                    <el-form-item label="密码">
                        <el-input
                            size="small"
                            v-model="userForm.passWord"
                            show-password
                        ></el-input>
                    </el-form-item>
                    <el-form-item label="验证码" class="verificationCode">
                        <el-input
                            size="small"
                            v-model="userForm.verificationCode"
                        >
                        </el-input>
                        <a
                            v-show="codeVerification"
                            href="javascript:;"
                            @click="getCode()"
                            >获取验证码</a
                        >
                        <span v-show="!codeVerification"
                            >{{ codeTimer }}s后获取</span
                        >
                    </el-form-item>
                </el-form>
                <div class="loginButtonBox">
                    <div class="userTips" v-show="isErrorForm">
                        账号或密码错误
                    </div>
                    <div class="loginButton" @click="LoginTo()">登录</div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import userApi from "../../api/userApi";
export default {
    name: "LoginPage",
    data() {
        return {
            userForm: {
                userName: "",
                passWord: "",
                verificationCode: "",
            },
            smsCheck: false,
            isVerificationCode: false,
            isErrorForm: false,
            codeTimer: 60,
            codeVerification: true,
        };
    },
    mounted() {},
    methods: {
        LoginTo() {
            userApi
                .UserLogin({
                    code:
                        this.userForm.verificationCode.length > 0
                            ? Number(this.userForm.verificationCode)
                            : 0,
                    password: this.userForm.passWord,
                    username: this.userForm.userName,
                })
                .then((response) => {
                    if (response.code == 0) {
                        let token = response.data.token;
                        this.$utils.storage.set("Authorization", token);
                        this.$router.push({ path: "/" });
                    } else {
                        this.$message({
                            type: "danger",
                            message: response.message,
                        });
                    }
                });
        },
        getCode() {
            this.codeVerification = false; //点击button改变v-show的状态
            let auth_timer = window.setInterval(() => {
                //定时器设置每秒递减
                this.codeTimer--; //递减时间
                if (this.codeTimer <= 0) {
                    this.codeVerification = true; //60s时间结束还原v-show状态并清除定时器
                    this.codeTimer = 60;
                    window.clearInterval(auth_timer);
                }
            }, 1000);
            userApi
                .SendSmsCode({
                    username: this.userForm.userName,
                })
                .then((response) => {
                    if (response.code == 0) {
                        this.$message.success("验证码发送成功");
                    } else {
                        this.$message({
                            type: "danger",
                            message: response.message,
                        });
                    }

                });
        },
    },
};
</script>

<style lang="scss" scoped>
@import "../../assets/scss/variable.scss";
.LoginPage {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100vh;
    background: linear-gradient(360deg, #f6f7fb 26%, #eceff4 100%);
    .LoginFormWrap {
        display: flex;
        justify-content: flex-end;
        align-items: center;
        width: 960px;
        height: 560px;
        border-radius: 8px 8px 8px 8px;
        box-shadow: 0px 0px 20px 0px rgba(0, 44, 131, 0.08);
        background: #6d9eff url("../../assets/image/loginBg.png") no-repeat left
            center;
        overflow: hidden;
        .loginWarpper {
            display: flex;
            flex-direction: column;
            justify-content: center;
            padding: 0 60px;
            height: 100%;
            width: 520px;
            background: #ffffff;
            box-sizing: border-box;
            .loginTitle {
                font-size: 18px;
                color: #222222;
                text-align: center;
                line-height: 1;
                margin-bottom: 40px;
                font-weight: 500;
            }
            .el-form-item {
                &:last-of-type {
                    margin-bottom: 0;
                }
            }
            .loginButtonBox {
                position: relative;
                margin-top: 80px;
                .loginButton {
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    height: 44px;
                    background: #3377ff;
                    color: #ffffff;
                    font-size: 14px;
                    line-height: 1;
                    border-radius: 4px;
                    overflow: hidden;
                    cursor: pointer;
                    transition: all 0.3s;
                    &:hover {
                        opacity: 0.8;
                    }
                    &:active {
                        box-shadow: 0px 3px 10px #666 inset;
                    }
                }
                .userTips {
                    position: absolute;
                    left: 50%;
                    top: -36px;
                    transform: translateX(-50%);
                    font-size: 14px;
                    color: #e44c4c;
                    line-height: 1;
                }
            }
            .verificationCode {
                /deep/ .el-form-item__content {
                    display: flex;
                    align-items: center;
                    a {
                        display: flex;
                        align-items: center;
                        height: 32px;
                        padding: 0 12px;
                        flex-shrink: 0;
                        font-size: 12px;
                        color: #3377ff;
                        border-left: 0;
                        box-sizing: border-box;
                    }
                    span {
                        font-size: 13px;
                        color: #ccc;
                        white-space: nowrap;
                        padding: 0 12px;
                    }
                }
            }
        }
    }
}
</style>
