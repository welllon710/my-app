import React, { useRef, useState, useEffect } from "react";
import { Tabs } from "antd";
import "./index.scss";

import { Recommed } from "../FountMusic/recommend";
import { SongList } from "../FountMusic/songList/songList";
import Redio from "../FountMusic/redio/redio";
import Rank from "../FountMusic/rank/rank";
import Singer from "../FountMusic/singer/singer";
import NewMusic from "../FountMusic/newMusic/newMusic";

import { useDashboard, useSongList } from "../../my-hooks/_request.js";
const { TabPane } = Tabs;

export default function FoundMusic() {
  const [count, setCount] = useState(0);
  const [title, setTitle] = useState([
    "个性推荐",
    "歌单",
    "主播电台",
    "排行榜",
    "歌手",
    "最新音乐",
  ]);
  const [tags,setTags] = useState([])
  const { run, refresh } = useDashboard();
  const { runSong, refreshSong, tabs } = useSongList();
  const componentsRender = (i) => {
    switch (i) {
      case 0:
        return <Recommed run={run} />;
      case 1:
        return <SongList run={runSong} tabs={tags} />;
      case 2:
        return <Redio />;
      case 3:
        return <Rank />;
      case 4:
        return <Singer />;
      case 5:
        return <NewMusic />;
    }
  };
  const cllback = (key, event) => {
    switch (Number(key)) {
      case 0:
        refresh();
      case 1:
        const t =  tabs();
        setTags(t.tags);
        refreshSong();
        break;
    }
  };

  return (
    <div className="fount-music">
      <div className="tutu">
        <Tabs defaultActiveKey="0" onTabClick={cllback}>
          {title.map((item, index) => {
            return (
              <TabPane tab={item} key={index}>
                {componentsRender(index)}
              </TabPane>
            );
          })}
        </Tabs>
      </div>
      <div style={{ height: "65px" }}></div>
    </div>
  );
}
