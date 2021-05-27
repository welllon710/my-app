import React, { useEffect } from "react";
import { useHeight } from "../../my-hooks/useHeight";
import { Single } from "./com/Single";
import { Singer } from "./com/Singer";
import { Mv } from "./com/Mv";
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
        <Single />
      </TabPane>
      <TabPane tab="歌手" key="2">
        <Singer />
      </TabPane>
      <TabPane tab="专辑" key="3">
        <Singer isS={true}>
          <div>你好</div>
        </Singer>
      </TabPane>
      <TabPane tab="视频" key="4">
        <div className="mv-item">
          <Mv w={"23%"}  />
          <Mv w={"23%"}  />
          <Mv w={"23%"}  />
          <Mv w={"23%"}  />
          <Mv w={"23%"}  />
        </div>
      </TabPane>
    </Tabs>
  );
};
