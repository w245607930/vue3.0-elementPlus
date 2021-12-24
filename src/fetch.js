/**
 * Created by admin on 2021/12/13.
 */

import { Toast } from 'vant';
import { getStore, setStore,clearLocalStorage, clearSessionStorage } from "~/js/utils"
import axios from 'axios'
import qs from 'qs'

console.log(process.env.NODE_ENV)
console.log(import.meta.env.VITE_API_DOMAIN)

const fetch = axios.create({
    // baseURL: import.meta.env.VITE_API_DOMAIN,
    baseURL: `${import.meta.env.VITE_API_DOMAIN}`,
    // baseURL: 'http://192.168.70.205:9301',
    timeout: 10000,
    retry: 4,
    retryDelay: 1000,
    withCredentials: true,
    // crossDomain: true,
    headers: {
        'content-type': 'application/json;charset=utf8'
    }
});

//添加请求拦截器
fetch.interceptors.request.use((config)=>{
    if(getStore('token')){
        config.headers.Authorization = 'Bearer '+getStore('token')
    }
    if(config.method === 'get'||config.method === 'GET'){
        config.paramsSerializer = function (params){
            return qs.stringify(params, { arrayFormat: 'repeat' })
        }
    }
    //在发送请求之前处理
    return config;
},(error)=>{
    return Promise.reject(error);
})

//添加响应拦截器
fetch.interceptors.response.use((response)=>{
//对响应数据处理
    if(response.data.code == 200){

    }else if(response.data.code == -200){
        console.log('-200')
        Toast.fail(response.data.meaning);
        // XuntongJSBridge.call('closeWebView');
    }else{
        Toast.fail(response.data.meaning);
    }
    return Promise.resolve(response);
},(error => {
    //对响应错误处理
    console.log(error,'error')
    return Promise.reject(error);
}))

export default fetch