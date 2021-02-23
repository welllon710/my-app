import React from 'react'
import { Layout } from 'antd';
import './index.scss';
import Myheader from '../../components/Header';
import Mysider from '../../components/Sider';
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
            <Content>Content</Content>
            </Layout>
            <Footer>Footer</Footer>
        </Layout>
    )
}
