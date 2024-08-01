<template>
    <div class="addGameFrom">
        <el-form :label-position="'right'" label-width="100px">
            <el-select class="keyWordInput" v-model="keyWords" filterable placeholder="请选择" :filter-method="changeKeyWords">
                <el-option v-for="item in keyWordsList" :key="item.value" :label="item.value" :value="item"> </el-option>
            </el-select>
        </el-form>
        <div class="addGameBtnBox">
            <el-button size="small" type="primary" @click="clickAddGame">新增</el-button>
        </div>
    </div>
</template>

<script>
// import statisticalApi from "../../api/gsStatisticalIndex";
import mapToolsStatApi from "../../../api/mapToolsStatApi";
export default {
    name: "addGameFrom",
    data() {
        return {
            keyWords: "",
            value: [],
            keyWordsList: [],
            timeout: null,
            loading: false,
            formData: {
                customEventName: "",
                obEvent: {
                    eventName: "",
                    eventParam: "",
                },
                frontEvent: {
                    eventName: "",
                    eventParam: "",
                },
                postEvent: {
                    eventName: "",
                    eventParam: "",
                },
            },
            coreDataEventNameList: [],
            wsTimer: null,
        };
    },
    mounted() {
        // this.getSuggestionSearchKeys();
        // this.GetCoreDataEvent();
    },
    methods: {
        getSuggestionSearchKeys() {
            let that = this;
            let postUrl = "//router2.gamersky.com/@/search/getSuggestionSearchKeys/6.0.0/0/Web";
            let localHref = window.location.href;
            postUrl = localHref.indexOf("https") > -1 ? "wss:" + postUrl : "ws:" + postUrl;
            const socket = new WebSocket(postUrl);
            socket.addEventListener("open", function(event) {
                socket.send(that.keyWords);
            });
            socket.addEventListener("message", function(event) {
                let res = JSON.parse(event.data);
                if (res.error == "") {
                    let searchKeys = res.searchKeys;
                    that.keyWordsList = searchKeys.map((item) => {
                        item.value = `${item.caption}(${item.data})`;
                        return item;
                    });
                }
            });
        },
        // 搜索的关键字改变
        changeKeyWords(item) {
            this.keyWords = item;
            this.wsTimer = null;
            clearTimeout(this.wsTimer);
            this.wsTimer = setTimeout(() => {
                this.getSuggestionSearchKeys();
            }, 300);
        },
        // 点击按钮添加游戏
        clickAddGame() {
            let { keyWords } = this;

            mapToolsStatApi
                .SaveStatisticsGameMapTool({
                    gameId: keyWords.data,
                    gameName: keyWords.caption,
                })
                .then((res) => {
                    if (res.code == 1) {
                        this.resetFormData();
                        this.$store.commit("changeIsShowDialog", false);
                        this.$emit("close", true);
                        this.$emit("addSuccess", true);
                    } else {
                        this.$message.error(res.msg);
                    }
                });

            console.log(keyWords);
            // // 整理攻略
            // if (keyWords.caption) {
            //     let strategyData = {
            //         customEventName: "重点游戏_" + keyWords.caption + "_攻略",
            //         obEvent: {
            //             eventName: "进入_攻略内容页",
            //             eventParam: "",
            //         },
            //         frontEvent: {
            //             eventName: "进入_游戏专区",
            //             eventParam: keyWords.data,
            //         },
            //         postEvent: {
            //             eventName: "离开_游戏专区",
            //             eventParam: keyWords.data,
            //         },
            //     };
            //     // 整理社区
            //     let communityData = {
            //         customEventName: "重点游戏_" + keyWords.caption + "_社区",
            //         obEvent: {
            //             eventName: "进入_帖子内容页",
            //             eventParam: "",
            //         },
            //         frontEvent: {
            //             eventName: "进入_游戏专区",
            //             eventParam: keyWords.data,
            //         },
            //         postEvent: {
            //             eventName: "离开_游戏专区",
            //             eventParam: keyWords.data,
            //         },
            //     };
            //     this.addGame(strategyData);
            //     this.addGame(communityData);

            //     //新增来路
            //     akeyGameApi.addWithFront({
            //         gameName: keyWords.caption,
            //         gameId: keyWords.data,
            //     });
            // }
        },
        addGame(formData) {
            let that = this;
            // let { formData } = this;
            akeyGameApi.addCustomEvent(formData).then((res) => {
                if (res.code == 1) {
                    that.resetFormData();
                }
                that.$store.commit("changeIsShowDialog", false);
                // this.$globle.isShowDialog = true;
                // window.isShowDialog = false;
                that.$emit("close", true);
                that.$emit("addSuccess", true);
            });
        },
        resetFormData() {
            this.keyWords = "";
        },
    },
    components: {},
};
</script>

<style lang="scss" scoped>
.addGameFrom {
    .keyWordInput {
        width: 100%;
        margin-bottom: 20px;
    }
    .publicCss {
        width: 260px;
    }
    .addGameBtnBox {
        display: flex;
        justify-content: flex-end;
    }
}
</style>
