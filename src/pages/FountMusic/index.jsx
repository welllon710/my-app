import React, { useState } from "react";
import { Tabs } from "antd";
import { StickyContainer, Sticky } from "react-sticky";
import "./index.scss";

import MySwiper from "../../components/MySwiper";
const { TabPane } = Tabs;
const renderTabBar = (props, DefaultTabBar) => (
  <Sticky bottomOffset={80}>
    {({ style }) => (
      <DefaultTabBar
        {...props}
        className="site-custom-tab-bar"
        style={{ ...style }}
      />
    )}
  </Sticky>
);
export default function FoundMusic() {
  const [title, setTitle] = useState([
    "个性推荐",
    "歌单",
    "主播电台",
    "排行榜",
    "歌手",
    "最新音乐",
  ]);
  return (
    <div className="fount-music">
      <StickyContainer>
        <div className="tutu">
          <Tabs defaultActiveKey="0" renderTabBar={renderTabBar}>
            {title.map((item, index) => {
              return (
                <TabPane tab={item} key={index}>
                  {index === 0 ? <MySwiper /> : ""}
                </TabPane>
              );
            })}
          </Tabs>
        </div>
      </StickyContainer>
      ,
    </div>
  );
}
