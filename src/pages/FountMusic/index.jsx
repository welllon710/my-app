import React, { useState } from "react";
import { Tabs } from "antd";
import "./index.scss";

import Recommed from "../FountMusic/recommend";
import SongList from "../FountMusic/songList/songList";
import Redio from "../FountMusic/redio/redio";
const { TabPane } = Tabs;

export default function FoundMusic() {
  const [title, setTitle] = useState([
    "个性推荐",
    "歌单",
    "主播电台",
    "排行榜",
    "歌手",
    "最新音乐",
  ]);
  const componentsRender = (i) => {
    switch (i) {
      case 0:
        return <Recommed />;
      case 1:
        return <SongList />;
      case 2:
        return <Redio />;
    }
  };

  return (
    <div className="fount-music">
      <div className="tutu">
        <Tabs defaultActiveKey="0">
          {title.map((item, index) => {
            return (
              <TabPane tab={item} key={index}>
                {componentsRender(index)}
              </TabPane>
            );
          })}
        </Tabs>
      </div>
      ,
    </div>
  );
}
