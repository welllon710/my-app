import react from 'react'
import { Redirect, Route, Switch } from 'react-router-dom'
import MySwiper from './pages/MySwiper'
import './App.css';
const  App = () =>{
    return (
        <div className="app">
            <Switch>
                <Route path="/swiper" component={MySwiper}></Route>
                <Redirect to="/swiper"></Redirect>
            </Switch>
        </div>
    )
}
export default App