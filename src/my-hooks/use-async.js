import { useState } from "react"

const defaultInitialState = {
    stat: 'idle',
    data: null,
    error:null
}
export const useAsync = (initialState) => {
    const [state, setState] = useState({
        ...defaultInitialState,
        ...initialState
    })
    const setData = (data) => setState({
        data,
        stat: 'success',
        error: null
    })
    const setError = (error) => setState({
        error,
        stat: 'error',
        data:null
    })
    const run = (promise) => {
        if (!promise || !promise.then) {
             throw new Error('参数必须是promise类型')
        }
            setState({
                ...state,
                stat: 'loading'
            })
        return promise.then(data => {
            setData(data)
            console.log('state', state);
            return data
        }).catch(err => {
            setError(err)
            return err
        })
    }
     return {
         isIdle: state.stat === 'idle',
         isLoading: state.stat === 'loading',
         isError: state.stat === 'error',
         isSuccess: state.stat === 'success',
         run,
         setData,
         setError,
         ...state
     }
}