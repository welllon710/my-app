import React, { useEffect, useMemo } from "react";
import { useHeight } from "../../my-hooks/useHeight";
import { Single } from "./com/Single";
import { Singer } from "./com/Singer";
import { Mv } from "./com/Mv";
import { useWidth } from "../../my-hooks/_width";
import { useSearch } from "../../my-hooks/_request";
import useUrlState from "@ahooksjs/use-url-state";
import { Tabs } from "antd";
import "./searchDetail.scss";
const { TabPane } = Tabs;
const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
export const SearchDetail = (props) => {
  const [keyword, setKeyword] = useUrlState({ keyword: "" });
  const { slists, run } = useSearch(false, true);
  useEffect(() => {
    if (keyword.keyword) {
      run({ keyword: keyword.keyword, type: 1 });
    }
  }, [keyword.keyword]);
  const [currentW, width] = useWidth(); //动态长度22
  console.log("currentW", currentW);
  let w = useMemo(() => {
    if (currentW < 1100 && currentW > 800) {
      return "32%";
    } else if (currentW >= 1100) {
      return "24%";
    } else if (currentW < 800) {
      return "22%";
    }
  }, [currentW]);
  useHeight();
  return (
    <div className="search-detail">
      <div className="top">
        <h2>找到{slists.songCount}首单曲</h2>
        <TopTabs w={w} slists={slists} run={run} keyword={keyword} />
      </div>
    </div>
  );
};
const TopTabs = ({ w, slists, run, keyword }) => {
  const callback = (val) => {
    run({ keyword: keyword.keyword, type: val });
    console.log("slists", slists);
  };
  return (
    <Tabs defaultActiveKey="1" onChange={callback}>
      <TabPane tab="单曲" key="1">
        <Single single={slists} />
      </TabPane>
      <TabPane tab="歌手" key="100">
        {slists.artistCount}
        {slists.artists && slists.artists.map((item) => (
          <Singer />
        ))}
      </TabPane>
      <TabPane tab="专辑" key="10">
        <Singer isS={true}>
          <div>你好</div>
        </Singer>
      </TabPane>
      <TabPane tab="视频" key="1004">
        <div className="mv-item">
          {arr.map((item, index) => {
            return <Mv w={w} />;
          })}
        </div>
      </TabPane>
    </Tabs>
  );
};

