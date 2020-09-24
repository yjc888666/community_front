import axios from 'axios'
import qs from 'qs'
import router from '@/router'
import Message from 'element-ui'

var MyAxios = {}
MyAxios.install = function (Vue) {
    //axios.defaults.baseURL = process.env.BASE_URL
    // Vue.prototype.$http = axios

    axios.interceptors.request.use(
        config => {
            config.headers['Content-Type'] = 'application/json;charset=UTF-8';
            let pojo = JSON.parse(sessionStorage.getItem('vuex'))
            if (pojo && pojo.user) {
                config.headers.token =pojo.user.sessionid;
            }
            return config;
        },
        error => {
            return Promise.reject(error.response);
        });

    axios.interceptors.response.use(
        response => {
            switch (response.data.code) {
                case 401:
                    router.replace('/login')
                    break
                default:
                    return response
            }
        },
        err => {
            switch (err.response.status) {
                case 400:
                    err.message = '请求错误'
                    break
                case 401:
                    err.message = '未授权，请重新登录'
                    break
                case 403:
                    err.message = '拒绝访问'
                    break
                case 404:
                    err.message = '请求出错'
                    break
                case 408:
                    err.message = '请求超时'
                    break
                case 500:
                    err.message = '服务器错误'
                    break
                case 501:
                    err.message = '服务未实现'
                    break
                case 502:
                    err.message = '网络错误'
                    break
                case 503:
                    err.message = '服务不可用'
                    break
                case 504:
                    err.message = '连接超时'
                    break
                case 505:
                    err.message = 'HTTP版本不受支持'
                    break
                default:
                    err.message = `连接出错(${err.response.status})`
            }
            Message.error(err.message)
            return Promise.reject(err.message)
        })

    Vue.prototype.$axios = axios
    Vue.prototype.$qs = qs
}
export default MyAxios
