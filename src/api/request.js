import axios from 'axios'
import { baseUrl } from './baseurl'
import {showLoading,hideLoading} from '../utils/loading'
export default function request(config) {
    const instance = axios.create({
        baseURL: baseUrl,
        timeout:5000
    })
    //请求头器
    instance.interceptors.request.use(config => {
        showLoading()
        return config
    }, err => {
        
    })
    //响应器
    instance.interceptors.response.use(response => {
        hideLoading()
        return response.data
    }, err => {
        hideLoading()
        return Promise.reject(err)
    })
    return instance(config)
}
