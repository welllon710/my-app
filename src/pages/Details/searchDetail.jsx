import React, { useEffect } from "react";
import { useHeight } from "../../my-hooks/useHeight";
import { Tabs } from "antd";
import "./searchDetail.scss";
const { TabPane } = Tabs;
export const SearchDetail = () => {
  useHeight();
  return (
    <div className="search-detail">
      <div className="top">
        <h2>找到713首单曲</h2>
        <TopTabs />
      </div>
    </div>
  );
};

const TopTabs = () => {
  const callback = () => {
    console.log("点我");
  };
  return (
    <Tabs defaultActiveKey="1" onChange={callback}>
      <TabPane tab="单曲" key="1">
        Content of Tab Pane 1
      </TabPane>
      <TabPane tab="歌手" key="2">
        歌手
      </TabPane>
      <TabPane tab="专辑" key="3">
        专辑
      </TabPane>
    </Tabs>
  );
};
