import axios from 'axios'
import { Message } from 'element-ui'
import Qs from "qs";

axios.defaults.baseURL = 'http://localhost:3000/'
axios.defaults.timeout = '10000'

axios.defaults.headers.post['Content-Type'] = 'application/json'
axios.defaults.headers.put['Content-Type'] = 'application/json'

// request interceptor 请求拦截(请求发出前处理请求)
axios.interceptors.request.use(
    config => {
        return config
    },
    error => {
        return Promise.reject(error)
    }
)

// response interceptor 响应拦截器（处理响应数据）
axios.interceptors.response.use(
    response => {
        const res = response.data
        if (!res.code || res.code === 200) {
            return res
        } else {
            Message({
                message: res.msg || 'error',
                type: 'error',
                duration: 5 * 1000
            })
            return Promise.reject(res)
        }
    },
    error => {
        Message({
            message: error.msg,
            type: 'error',
            duration: 5 * 1000
        })
        return Promise.reject(error)
    }
)

const apiRequest = (method, url, params) => {
    return new Promise((resolve, reject) => {
        axios({
            method: method,
            url: url,
            data: params,
        }).then(res => {
            resolve(res)
        }).catch(err => {
            reject(err)
        })
    })
}

export default {
    apiRequest,
}