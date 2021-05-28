import React, { useEffect, useMemo } from "react";
import { useHeight } from "../../my-hooks/useHeight";
import { Single } from "./com/Single";
import { Singer } from "./com/Singer";
import { Mv } from "./com/Mv";
import { useWidth } from "../../my-hooks/_width";
import { Tabs } from "antd";
import "./searchDetail.scss";
const { TabPane } = Tabs;
const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
export const SearchDetail = () => {
  const [currentW, width] = useWidth(); //动态长度22
  console.log("currentW", currentW);
  let w = useMemo(() => {
    if (currentW < 1100 && currentW > 800) {
      return "32%";
    } else if (currentW >= 1100) {
      return "24%";
    } else if (currentW < 800) {
      return "24%";
    }
  }, [currentW]);
  useHeight();
  return (
    <div className="search-detail">
      <div className="top">
        <h2>找到713首单曲</h2>
        <TopTabs w={w} />
      </div>
    </div>
  );
};
const TopTabs = ({ w }) => {
  const callback = () => {};
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
          {arr.map((item, index) => {
            return setMv(index);
          })}
        </div>
      </TabPane>
    </Tabs>
  );
};
const setMv = () => {
  return <div></div>;
};
