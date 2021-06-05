import React, { useMemo, useEffect, useState } from "react";
import { Route, Switch, useHistory } from "react-router-dom";
import { Layout} from "antd";
import { useDispatch, useSelector } from "react-redux";
import actions from "../../redux/actions";
import "./index.scss";
import moment from "moment";
import Myheader from "../../components/Header";
import Mysider from "../../components/Sider";
import Plyaer from "../../components/Footer/player";
import FountMusic from "../FountMusic";
import Friends from "../Friends";
import Details from "../Details/details";
import songDetail from "../Details/songDetail";
import { SearchDetail } from "../Details/searchDetail";
import { MvDetail } from "../Details/mvDetail";
import { Lyric } from "./../Lyric/index";
import {
  CaretRightOutlined,
} from "@ant-design/icons";
const { Header, Footer, Sider, Content } = Layout;
export default function Dashboard(props) {
  let isDetails = useSelector((state) => state.isDetails);
  const dispatch = useDispatch();
  const dispatchTop = useDispatch();
  const history = useHistory();
  const rxp = /\/\w+\-\w+\/[mv]+\//;
  const rxpLyric = /\/\w+\-\w+\/[lyric]+\//;
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
      return { height: `calc(100vh - 64px - 80px - 64px )`, marginTop: "64px" };
    } else {
      return { height: `calc(100vh - 64px - 80px )`, marginTop: "0px" };
    }
  }, [isDetails]);
  return (
    <Layout className="layout">
      <Header>
        <Myheader></Myheader>
      </Header>
      <Layout>
        <Sider
          style={{
            display:
              rxp.test(history.location.pathname) ||
              rxpLyric.test(history.location.pathname)
                ? "none"
                : "block",
          }}>
          <Mysider></Mysider>
        </Sider>
        <Content style={{ height: isD.height, marginTop: isD.marginTop }}>
          <Switch>
            <Route exact path="/fount-music" component={FountMusic}></Route>
            <Route path="/friends" component={Friends}></Route>
            <Route path="/fount-music/every-day" component={Details}></Route>
            <Route
              path="/fount-music/detail/:id"
              component={songDetail}></Route>
            <Route
              path="/fount-music/search-detail"
              component={SearchDetail}></Route>
            <Route
              path="/fount-music/mv/:id"
              name={"mv"}
              component={MvDetail}></Route>
            <Route
              path="/fount-music/lyric"
              name={"lyric"}
              component={Lyric}></Route>
          </Switch>
        </Content>
      </Layout>
      <Footer
        style={{
          display: rxp.test(history.location.pathname) ? "none" : "block",
        }}>
        <Plyaer />
      </Footer>
    </Layout>
  );
}


