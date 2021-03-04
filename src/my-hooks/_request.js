import { useState, useEffect } from "react";
import request from '../api/request'
const useRequest = (datas)=>{
    const {url,method,data,params} = datas
    const parasms = {url,method,data,params}
    const result = null
    if(method === 'post'){
        delete parasms.params
    }
    if(method === 'get'){
        delete parasms.data
    }
    useEffect(() => {
        request(parasms).then(res=>{
            console.log('res',res);
            result = res
        })
    }, [])
   return [result]
}
export default useRequest