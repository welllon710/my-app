import { useState, useEffect } from "react";
import request from '../api/request'
const useRequest = (datas)=>{
    const { url, method, data, params } = datas
    const parasms = {url,method,data,params}
    const [result, setResult] = useState(null)
    if(method === 'post'){
        delete parasms.params
    }
    if(method === 'get'){
        delete parasms.data
    }
    useEffect(() => {
          request(parasms).then(res=>{
            setResult(result => {
                result = res
                return result
            })
        })
    }, [])
    return [result]
}
export default useRequest