import react, { useEffect, useState } from 'react'
import { Redirect, Route, Switch } from 'react-router-dom'
import MySwiper from './pages/MySwiper'
import Dashboard from './pages/dashboard'
import './App.css';
const App = () => {
    // const [width,setWidth] = useState('0px')
    // useEffect(() => {
    //    setWidth(document.documentElement.clientWidth + 'px')
    // }, [])
    // useEffect(() => {
    //     const handleSize = () => {
    //         setWidth(document.documentElement.clientWidth + 'px')
    //     }
    //     window.addEventListener('resize', handleSize, false)
    //     return () => {
    //         window.removeEventListener('resize', handleSize, false)
    //     }
    // })
    return (
        <>
            <Switch>
                {/* <Route path="/swiper" component={MySwiper}></Route> */}
                <Route path="/dashboard" component={Dashboard}></Route>
                <Redirect to="/dashboard"></Redirect>
            </Switch>
        </>
    )
}
export default App