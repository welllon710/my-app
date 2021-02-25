import react, { useEffect, useState } from 'react'
import { Redirect, Route, Switch } from 'react-router-dom'
import {useDispatch,useSelector} from 'react-redux'
import Dashboard from './pages/dashboard'
import Test from './pages/Test'
import actions from './redux/actions'
import './App.css';
const App = () => {
    const state = useSelector(state => {
        console.log(state);
    })
    const dispatch = useDispatch()
    useEffect(()=>{
        window.addEventListener('resize', ()=>{
            dispatch(actions.move(document.documentElement.clientWidth))
        })
    })
    return (
        <>
            <Switch>
                {/* <Route path="/swiper" component={MySwiper}></Route> */}
                <Route path="/dashboard" component={Dashboard}></Route>
                <Route path="/test" component={Test}></Route>
                <Redirect to="/dashboard"></Redirect>
            </Switch>
        </>
    )
}
export default App