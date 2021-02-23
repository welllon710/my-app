import request from './request'
export function getBanner(){
    return request({
        url:'/banner',
        method:'get'
    })
}