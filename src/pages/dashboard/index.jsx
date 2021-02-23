import React from 'react'
import { Route, Switch } from 'react-router-dom'
import { Layout } from 'antd';
import './index.scss';
import Myheader from '../../components/Header';
import Mysider from '../../components/Sider';

import FountMusic from '../FountMusic'
import Friends from '../Friends'
const { Header, Footer, Sider, Content } = Layout;
export default function index() {
   
    return (
        <Layout className="layout">
            <Header>
               <Myheader></Myheader>
            </Header>
            <Layout>
            <Sider>
                <Mysider></Mysider>
            </Sider>
                <Content>
                    <Switch>
                        <Route path="/dashboard/fount-music" component={FountMusic}></Route>
                        <Route path="/dashboard/friends" component={Friends}></Route>
                    </Switch>
                </Content>
            </Layout>
            <Footer>Footer</Footer>
        </Layout>
    )
}
