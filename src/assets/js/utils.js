import ajax from './axios.config'

const host = location.host.indexOf(".gamersky.com") != -1 ? '.gamersky.com' : '';

Date.prototype.format = function (fmt) {
    var o = {
        "y+": this.getFullYear(), //年份
        "M+": this.getMonth() + 1, //月份
        "d+": this.getDate(), //日
        "h+": this.getHours(), //小时
        "m+": this.getMinutes(), //分
        "s+": this.getSeconds(), //秒
        "q+": Math.floor((this.getMonth() + 3) / 3), //季度
        "S": this.getMilliseconds() //毫秒
    };
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
        if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
}

const utils = {
    storage: {
        get: function (str) {
            try {
                return JSON.parse(localStorage.getItem(str))
            } catch (e) {
                return localStorage.getItem(str);
            }
        },
        set: function (str, data) {
            localStorage.setItem(str, JSON.stringify(data))
        },
        remove: function (str) {
            localStorage.removeItem(str);
        }
    },
    urlParam(url, params) {
        let keys = Object.keys(params)
        let strArr = url.split('/')
        let result = ''
        strArr.forEach(i => {
            if (i[0] === ':') {
                keys.forEach(j => {
                    if (j === i.substring(1, i.length)) {
                        i = params[j].toString()
                    }
                })
            }
            result += i + '/'
        })
        return result.substring(0, result.length - 1)
    },
    creatApi(options) {
        let _this = this;
        let result = {};
        let funNames = Object.keys(options);
        funNames.forEach(name => {
            result[name] = obj => {
                const method = options[name][0];
                let url = options[name][1];
                if (obj) {
                    url = this.urlParam(url, obj);
                }
                return ajax[method](url, obj);
            }
        });
        return result;
    },
    // 日期转换
    formatDate(timestamp) {
        function addZero(num) {
            return num < 10 ? '0' + num : num;
        }
        var date = new Date(timestamp);
        var year = date.getFullYear();
        var month = addZero(date.getMonth() + 1);
        var day = addZero(date.getDate());
        var hours = addZero(date.getHours());
        var minutes = addZero(date.getMinutes());
        var seconds = addZero(date.getSeconds());
        return year + '-' + month + '-' + day + ' ' + hours + ':' + minutes + ':' + seconds;
    },
    getTime(str) {
        if (str) {
            let reg = /\d+/g;
            let Time = Number(str.match(reg)[0]);
            let date = new Date(Time);
            let year = date.getFullYear();
            let mouth = date.getMonth() + 1;
            let day = date.getDate();
            let hour = date.getHours();
            let minutes = date.getMinutes();
            let seconds = date.getSeconds();
            let TimeString = year + '-' + mouth + '-' + day + ' ' + this.ZeroPadding(hour) + ':' + this.ZeroPadding(minutes) + ':' + this.ZeroPadding(seconds);
            return TimeString;
        } else {
            return "";
        }
    },
    ZeroPadding(str) {
        if (Number(str) >= 10) {
            return str;
        } else {
            return '0' + str;
        }
    },
    // JSONP请求
    AjaxJsonp(url, data = {}) {
        if (!url)
            throw new Error('url is necessary')
        const callback = 'CALLBACK' + Math.random().toString().substr(9, 18)
        const JSONP = document.createElement('script')
        JSONP.setAttribute('type', 'text/javascript')

        const headEle = document.getElementsByTagName('head')[0]
        let ret = '';
        if (data) {
            if (typeof data === 'string')
                ret = '&' + data;
            else if (typeof data === 'object') {
                for (let key in data)
                    ret += '&' + key + '=' + encodeURIComponent(data[key]);
            }
            ret += '&_time=' + Date.now();
        }
        JSONP.src = `${url}?callback=${callback}${ret}`;
        return new Promise((resolve, reject) => {
            window[callback] = r => {
                resolve(r)
                headEle.removeChild(JSONP)
                delete window[callback]
            }
            headEle.appendChild(JSONP)
        })
    },


    /**
     * 获取/保存 cookie
     * @param key cookie名
     * @param value cookie值，可选，当不传递时，表示根据 cookie 名查找 cookie 值
     * @param options 可配置选项参数，如：{expires:3, path:"/", domain:".baidu.com", secure:true}
     */
    cookie: function (key, value, options) {
        // 未传递 value 参数，则表示读取 cookie
        if (typeof value === "undefined") {
            // 将域下所有 cookie 读取出来，以 "; " 分割保存到数组中
            var cookies = document.cookie.split("; ");
            // 遍历迭代所有的 cookie ，查找指定 key 对应的 cookie 值
            for (var i = 0, len = cookies.length; i < len; i++) {
                // 将当前遍历到的 cookie 使用 "=" 分割
                var parts = cookies[i].split("=");
                // 数组中第一个元素为 cookie 名，将 cookie 名解码
                var name = decodeURIComponent(parts.shift());
                // 判断当前 cookie 名与待查找 cookie 的名称是否一致
                if (name === key) // 找到 cookie，则返回对应 cookie 值
                    return decodeURIComponent(parts.join("="));
            }

            // 如果循环迭代完毕所有 cookie 都不存在要查找的 cookie 信息，则说明未保存过
            return undefined;
        }

        // 传递了 value 参数，表示保存 cookie
        // "key=value"，将 key 和 value 编码
        var _cookie = encodeURIComponent(key) + "=" + encodeURIComponent(value);
        // 判断可配置选项
        options = options || {};
        if (options.expires) { // 有失效时间的配置
            var date = new Date();
            date.setDate(date.getDate() + options.expires);
            _cookie += ";expires=" + date.toUTCString();
        }
        if (options.path) // 有配置路径
            _cookie += ";path=" + options.path;
        if (options.domain) // 域
            _cookie += ";domain=" + options.domain;
        if (options.secure) // 安全链接
            _cookie += ";secure";
        // 保存 cookie
        document.cookie = _cookie;
    },
    /**
     * 删除 cookie
     * @param key cookie名
     * @param options 可配置选项参数，如：{expires:3, path:"/", domain:".baidu.com", secure:true}
     */
    removeCookie: function (key, options) {
        options = options || {};
        options.expires = -1;
        utils.cookie(key, "", options);
    },
    loginOut: function () {
        utils.AjaxJsonp("//i.gamersky.com/api/userlogout", {}).then(response => {
            utils.removeCookie("UserCookie", {
                path: '/',
                domain: host
            });
        });
    },
    // 时间转换日期函数
    formatDate: function (timestamp) {
        function addZero(num) {
            return num < 10 ? '0' + num : num;
        }
        var date = new Date(timestamp);
        var year = date.getFullYear();
        var month = addZero(date.getMonth() + 1);
        var day = addZero(date.getDate());
        var hours = addZero(date.getHours());
        var minutes = addZero(date.getMinutes());
        var seconds = addZero(date.getSeconds());
        return year + '-' + month + '-' + day; // + ' ' + hours + ':' + minutes + ':' + seconds;
    },
    // 获取指定日期时间
    getDate(days = 0, format = "yyyy-MM-dd") {
        let curTime = new Date().getTime();
        let startDate = curTime - (days * 3600 * 24 * 1000);
        startDate = new Date(startDate).format(format);
        return startDate;
    },
    getQueryString: function (name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
        var r = window.location.search.substr(1).match(reg);
        if (r != null) return unescape(r[2]);
        return null;
    }
};

export default utils;
