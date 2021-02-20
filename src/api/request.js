import axios from 'axios'
import { baseUrl } from './baseurl'
export default function request(config) {
    const instance = axios.create({
        baseURL: baseUrl,
        timeout:5000
    })
    //请求头器
    instance.interceptors.request.use(config => {

        return config
    }, err => {
        
    })
    //响应器
    instance.interceptors.response.use(response => {
        return response.data
    }, err => {

        return Promise.reject(err)
    })
    return instance(config)
}
