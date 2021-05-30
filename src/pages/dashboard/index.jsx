import React, { useMemo, useEffect } from "react";
import { Route, Switch, useHistory } from "react-router-dom";
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
import Details from "../Details/details";
import songDetail from "../Details/songDetail";
import { SearchDetail } from "../Details/searchDetail";

const { Header, Footer, Sider, Content } = Layout;
export default function Dashboard() {
  const isOpen = useSelector((state) => state.isOpen);
  let isDetails = useSelector((state) => state.isDetails);
  const dispatch = useDispatch();
  const dispatchTop = useDispatch();
  const history = useHistory();
  const onClose = () => {
    dispatch(actions.close(false));
  };
  useEffect(() => {
    history.listen((historyLocation) => {
      if (historyLocation.pathname === "/fount-music") {
        dispatchTop(actions.leaveDetail(true));
      }
    });
  }, [history]);
  const isD = useMemo(() => {
    //`calc(100vh - 64px - 70px - 64px )`
    if (isDetails) {
      return { height: `calc(100vh - 64px - 70px - 64px )`, marginTop: "64px" };
    } else {
      return { height: `calc(100vh - 64px - 70px )`, marginTop: "0px" };
    }
  }, [isDetails]);
  return (
    <Layout className="layout">
      <Header>
        <Myheader></Myheader>
      </Header>
      <Layout>
        <Sider>
          <Mysider></Mysider>
        </Sider>
        <Content style={{ height: isD.height, marginTop: isD.marginTop }}>
          <Switch>
            <Route exact path="/fount-music" component={FountMusic}></Route>
            <Route path="/friends" component={Friends}></Route>
            <Route path="/fount-music/every-day" component={Details}></Route>
            <Route
              path="/fount-music/detail/:id"
              component={songDetail}
            ></Route>
            <Route
              path="/fount-music/search-detail"
              component={SearchDetail}
            ></Route>
          </Switch>
          <Drawer
            className="drawer"
            title="Basic Drawer"
            placement="right"
            closable={false}
            onClose={onClose}
            visible={isOpen}
            mask={false}
            width={500}
            style={{ position: "absolute" }}
          >
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
