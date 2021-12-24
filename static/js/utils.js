/**
 * Created by admin on 2021/12/10.
 */
//节流 单位时间内只执行一次
export const throttle = function (fn, gapTime) {
    if (gapTime == null || gapTime == undefined) {
        gapTime = 500;
    }
    let _lastTime = null
    // 返回新的函数
    return function () {
        let _nowTime = +new Date()
        if (_nowTime - _lastTime > gapTime || !_lastTime) {
            fn.apply(this, arguments)   //将this和参数传给原函数
            _lastTime = _nowTime
        }
    }
};

/*
 ”非立即执行防抖“ 指事件触发后，回调函数不会立即执行，会在延迟时间 n 秒后执行，如果 n 秒内被调用多次，则重新计时延迟时间
 */
export const debounce = function (func, delay) {
    var timeout;
    return function() {
        var context = this;
        var args = arguments;
        // && 短路运算 == if(timeout) else {...}
        timeout && clearTimeout(timeout);
        timeout = setTimeout(function(){
            func.apply(context, args);
        }, 800);
    }
};

/*
 *存储localStorage
 */
export const setStore = (name, content) => {
    if (!name) return;
    if (typeof content !== 'string') {
        content = JSON.stringify(content);
    }
    window.localStorage.setItem(name, content);
};

/*
 *获取localStorage
 */
export const getStore = (name) => {
    if (!name) return;
    var value = window.localStorage.getItem(name);
    if (!value) return;
    return window.localStorage.getItem(name);
};

/*
 *删除localStorage
 */
export const removeStore = (name) => {
    if (!name) return;
    window.localStorage.removeItem(name);
};

//  清空localStorage缓存
export const clearLocalStorage = () => {
    window.localStorage.clear();
};

//  清空sessionStorage缓存
export const clearSessionStorage = () => {
    window.sessionStorage.clear();
};