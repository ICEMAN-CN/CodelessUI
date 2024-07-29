import Vue from 'vue';
import router from '../../router'
import utils from "./utils";
import axios from 'axios';
import qs from 'qs';
// axios.defaults.baseURL = '//101.71.99.248:8687';
// axios.defaults.baseURL = '//192.168.0.177:8687';


// axios.defaults.baseURL = 'https://crs.gamersky.com:9890';
axios.defaults.baseURL = 'http://49.232.70.73/api';
// axios.defaults.baseURL = 'https://crs.gamersky.com:9892';
// axios.defaults.baseURL = '//router.gamersky.com/@';
// axios.defaults.baseURL = '//router2.gamersky.com/@';
// axios.defaults.baseURL = '//192.168.1.234:8687';
// axios.defaults.baseURL = '//192.168.0.177:8687';
axios.defaults.withCredentials = true;

const ajax = {
    post: function (url, data = {}) {
        return new Promise((resolve, reject) => {
            axios.post(url, data)
                .then((response) => {
                    resolve(response.data);
                })
                .catch((error) => {
                    reject(error);
                });
        })
    },
    get: function (url, params = {}) {
        return new Promise((resolve, reject) => {
            axios.get(url, {
                params: params
            })
                .then((response) => {
                    resolve(response.data);
                })
                .catch((error) => {
                    reject(error);
                });
        })
    },
    put: function (url, data = {}) {
        return new Promise((resolve, reject) => {
            axios.put(url, qs.stringify(data))
                .then((response) => {
                    resolve(response.data);
                })
                .catch((error) => {
                    reject(error);
                });
        })
    },
    del: function (url, data = {}) {
        return new Promise((resolve, reject) => {
            axios.delete(url, qs.stringify(data))
                .then((response) => {
                    resolve(response.data);
                })
                .catch((error) => {
                    reject(error);
                });
        })
    },
    getQueryString: function (name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
        var r = window.location.search.substr(1).match(reg);
        if (r != null) return unescape(r[2]);
        return null;
    }
};

// 请求拦截器
axios.interceptors.request.use(request => {
    if (request.url.indexOf('sales/login') === -1 && request.url.indexOf('sales/user/sendSmsCode') === -1) {
        let token = utils.storage.get("Authorization") ? "Bearer " + utils.storage.get("Authorization") : "";
        request.headers["Authorization"] = token;
    }

    return request
}, (error) => {
    return Promise.reject(error);
});
// 响应拦截器
axios.interceptors.response.use(response => {
    // token验证失败
    if (response.data.code > 1000 && response.data.code < 2000) {
        utils.storage.remove("Authorization");
        router.push({ name: "login" });
    }
    return response;
}, err => {
    // console.log(err);
    return Promise.reject(err)
})

export default ajax;
