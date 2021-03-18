import { useState, useEffect } from "react";
import request from '../api/request'
const useRequest = async (datas)=>{
    const { url, method, data, params } = datas
    const parasms = { url, method, data, params }
    if(method === 'post'){
        delete parasms.params
    }
    if(method === 'get'){
        delete parasms.data
    }
    return  request(parasms)
    
}
export default useRequest