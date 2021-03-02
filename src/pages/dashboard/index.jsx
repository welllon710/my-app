import React from "react";
import { Route, Switch } from "react-router-dom";
import { Layout, Drawer } from "antd";
import { useDispatch, useSelector } from "react-redux";
import actions from "../../redux/actions";
import "./index.scss";
import Myheader from "../../components/Header";
import Mysider from "../../components/Sider";
import Plyaer from "../../components/Footer/player";
import pubsub from "pubsub-js";
import FountMusic from "../FountMusic";
import Friends from "../Friends";
const { Header, Footer, Sider, Content } = Layout;
export default function Dashboard() {
  const isOpen = useSelector((state) => state.isOpen);
  const dispatch = useDispatch();
  const onClose = () => {
    dispatch(actions.close(false));
  };
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
          <Drawer
            className="drawer"
            title="Basic Drawer"
            placement="right"
            closable={false}
            onClose={onClose}
            visible={isOpen}
            getContainer={false}
            mask={false}
            style={{ position: "absolute" }}>
            <p>Some contents...</p>
          </Drawer>
        </Content>
      </Layout>
      <Footer>
        <Plyaer />
      </Footer>
    </Layout>
  );
}
