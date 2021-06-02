import React, { useMemo, useEffect, useState } from "react";
import { Route, Switch, useHistory } from "react-router-dom";
import { Layout, Drawer, Divider, Table } from "antd";
import { useDispatch, useSelector } from "react-redux";
import actions from "../../redux/actions";
import "./index.scss";
import Myheader from "../../components/Header";
import Mysider from "../../components/Sider";
import Plyaer from "../../components/Footer/player";
import FountMusic from "../FountMusic";
import Friends from "../Friends";
import Details from "../Details/details";
import songDetail from "../Details/songDetail";
import { SearchDetail } from "../Details/searchDetail";
import { MvDetail } from "../Details/mvDetail";
import { PlusSquareOutlined, DeleteOutlined } from "@ant-design/icons";
const { Header, Footer, Sider, Content } = Layout;
export default function Dashboard(props) {
  const isOpen = useSelector((state) => state.isOpen);
  let isDetails = useSelector((state) => state.isDetails);
  const dispatch = useDispatch();
  const dispatchTop = useDispatch();
  const history = useHistory();
  const rxp = /\/\w+\-\w+\/[mv]+\//;
  const onClose = () => {
    
    dispatch(actions.close(false));
  };
  const dataSource = [
        {
          dataIndex: "title",
          // render: (text, record, index) => record.name,
        },
        {
          dataIndex: "singer",
          // render: (text, record, index) => record.ar[0].name,
        },
        {
          dataIndex: "time",
          // render: (text, record, index) => moment(record.dt).format("MM:SS"),
        },
  ];
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
        <Sider
          style={{
            display: rxp.test(history.location.pathname) ? "none" : "block",
          }}
        >
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
            <Route
              path="/fount-music/mv/:id"
              name={"mv"}
              component={MvDetail}
            ></Route>
          </Switch>
          <Drawer
            className="drawer"
            placement="right"
            closable={false}
            onClose={onClose}
            visible={isOpen}
            mask={false}
            width={500}
            style={{
              position: "absolute",
              top: "64px",
              height: `calc(100vh - 64px - 70px )`,
            }}
          >
            <div className="play-list">
              <div className="title">
                <Tabs />
                <div className="count">
                  <span className="total">总37首</span>
                  <div className="c-r">
                    <div>
                      <PlusSquareOutlined />
                      <span>收藏全部</span>
                    </div>
                    <div>
                      <DeleteOutlined />
                      <span>清空</span>
                    </div>
                  </div>
                </div>
              </div>
              <Divider />
              <div className="list">
                {/* <Table dataSource={dataSource} columns={[]} />; */}
              </div>
            </div>
          </Drawer>
        </Content>
      </Layout>
      <Footer
        style={{
          display: rxp.test(history.location.pathname) ? "none" : "block",
        }}
      >
        <Plyaer />
      </Footer>
    </Layout>
  );
}

const Tabs = () => {
  const [cur, setCur] = useState(0);
  const isShow = useMemo(() => {
      return cur === 0 ? true : false;
    }, [cur]);
  const handleTabs = (i) => {
      setCur(i);
  };
  return (
    <div className="tabs-box">
      {["播放列表", "历史记录"].map((item, index) => {
        return (
          <div
            className={index === cur ? "active" : ""}
            key={index}
            onClick={() => handleTabs(index)}
          >
            {item}
          </div>
        );
      })}
    </div>
  );
  
}