import Vue from 'vue'
import alert from './Alert.vue'

const Alert = Vue.extend(alert);
const alertFun = options => {
    const Instance = new Alert({ // 实例化组件
        data: { // data变量
            // title: (options && options.title) || '',
            // text: str_num ? options : ((options && options.text) || ''),
            // cancelText: (options && options.cancel) || '取消',
            // confirmText: (options && options.confirm) || '确定',


            disabledTime: (options && options.disabledTime) || [],
            clashTime: (options && options.clashTime) || [],
            location: (options && options.location) || false,
            pageX:(options && options.pageX) || 0,
            pageY:(options && options.pageY) || 0,
            dataRang:(options && options.dataRang) || false,
            value:(options && options.value) || [],
        }
    })
    if(document.getElementsByClassName('DatePicker').length>0){
        let list=document.getElementsByClassName('DatePicker')
        for (let i = 0; i < list.length; i++) {
            document.body.removeChild(list[i])            
        }
        var vm = Instance.$mount();// 挂载组件
        document.body.appendChild(vm.$el); // 插入至body下
    }else{
        var vm = Instance.$mount();// 挂载组件
        document.body.appendChild(vm.$el); // 插入至body下
    }
    

    return vm.init();
}

export default {
    install: (Vue) => {
        Vue.prototype.$alert = alertFun; // 挂载至Vue原型
    }
}