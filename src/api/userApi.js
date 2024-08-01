import utilsApi from '../assets/js/utils'

import ajax from '../assets/js/axios.config'

export default utilsApi.creatApi({
    clickLink: ['get', '/link/click'],
    dayStatistics: ['post', '/statistics/day'],
    totalStatistics: ['post', '/statistics/total'],

    linkList:  ['post', '/link/list'],
    batchAddEmail:  ['post', '/link/email/batchAdd'],
    batchAddWeb:  ['post', '/link/web/batchAdd'],
    manualUpdate:  ['get', '/link/manualStatistics'],
    generateText:  ['post', '/link/email/generateText'],

    UserInfo: ['get', '/sales/user/userInfo'], // 用户信息
    UserLogin: ['post', '/sales/login'], // 用户登录
    Logout: ['post', '/sales/logout'], // 退出登录
    SendSmsCode: ['get', '/sales/user/sendSmsCode'], // 发送验证码
    GetUserList: ['get', '/sales/user/list'], // 查询用户列表
    GetIoStatus: ['get', '/io/status'], // 查询用户列表
})