import React, { useEffect, useMemo,useState } from "react";
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
export const SearchDetail = (props) => {
  const [keyword, setKeyword] = useUrlState({ keyword: "" });
  const { slists, run } = useSearch(false, false);
  const [active,setActive] = useState('1')
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
        <h2 style={{ display: active == '1'?'block':'none' }}>找到{slists.songCount}首单曲</h2>
        <TopTabs w={w} slists={slists} run={run} keyword={keyword} setActive={ setActive}/>
      </div>
    </div>
  );
};
const TopTabs = ({ w, slists, run, keyword,setActive }) => {
  const callback = (val) => {
    setActive(val);
    run({ keyword: keyword.keyword, type: val });
    console.log("slists", slists);
  };
  return (
    <Tabs defaultActiveKey="1" onChange={callback}>
      <TabPane tab="单曲" key="1">
        <Single single={slists} />
      </TabPane>
      <TabPane tab="歌手" key="100">
        {slists.artists &&
          slists.artists.map((item) => <Singer key={item.id} item={item} />)}
      </TabPane>
      <TabPane tab="专辑" key="10">
        {slists.albums &&
          slists.albums.map((item) => (
            <Singer key={item.id} item={item} isS={true}>
              <div>{item.artist.name}</div>
            </Singer>
          ))}
      </TabPane>
      <TabPane tab="视频" key="1004">
        <div className="mv-item">
          {slists.mvs &&
            slists.mvs.map((item, index) => {
              return <Mv w={w} item={item} key={item.id} />;
            })}
        </div>
      </TabPane>
    </Tabs>
  );
};

