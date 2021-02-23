import react from 'react'
import { Redirect, Route, Switch } from 'react-router-dom'
import MySwiper from './pages/MySwiper'
import Dashboard from './pages/dashboard'
import './App.css';
const  App = () =>{
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