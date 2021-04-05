import React, { useState, useEffect, memo } from "react";
import { Image, Pagination } from "antd";
import { BulbOutlined, RightOutlined } from "@ant-design/icons";
import { useWidth } from "../../../my-hooks/_width";
import { requestList, useSongList } from "../../../my-hooks/_request";
import fontMusic from "../../../api/foundMusic";
import SquarePriture from "../../../components/picture/square-priture/square-priture";
import "./songList.scss";
export default memo(function SongList() {
  const [currentW, width] = useWidth();
  const { tabs, songLists, setCatVal } = useSongList();
  // useEffect(() => {
  //   console.log("重复执行");
  //   requestList(fontMusic.playlistHot).then((res) => {
  //     const { tags } = res;
  //     console.log("res", res);
  //   });
  // }, []);
  const [songList, setSongList] = useState([
    { id: 1 },
    { id: 2 },
    { id: 3 },
    { id: 4 },
    { id: 5 },
    { id: 6 },
    { id: 7 },
    { id: 8 },
    { id: 9 },
    { id: 10 },
    { id: 11 },
    { id: 12 },
    { id: 13 },
    { id: 14 },
    { id: 15 },
  ]);
  const onShowSizeChange = (current, pageSize) => {
    console.log(current, pageSize);
  };
  //根据标签获取列表
  const changeTabs = (name) => {
    setCatVal(name);
  };
  const setOffsetW = (item, index) => {
    if (currentW >= 900) {
      //每行5个
      return index % 5 === 0 ? (
        <SquarePriture
          key={item.id}
          text={item.id}
          sty={"0px"}
          curw={currentW >= 900 ? "18%" : "22%"}
        />
      ) : (
        <SquarePriture
          key={item.id}
          text={item.id}
          sty={"2%"}
          curw={currentW >= 900 ? "18%" : "22%"}
        />
      );
    } else {
      return index % 4 === 0 ? (
        <SquarePriture
          key={item.id}
          text={item.id}
          sty={"0px"}
          curw={currentW >= 900 ? "18%" : "22%"}
        />
      ) : (
        <SquarePriture
          key={item.id}
          text={item.id}
          sty={"2%"}
          curw={currentW >= 900 ? "18%" : "22%"}
        />
      );
    }
  };
  return (
    <div className="song-list">
      <div className="song-list-header" style={{ width: currentW }}>
        <div className="img-box">
          <Image
            width={172}
            height={172}
            src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
          />
        </div>
        <div className="img-text">
          <div className="title">
            <BulbOutlined />
            精品歌单
          </div>
          <p>国产纯音集|八百位音乐人，一人一区</p>
          <p>老一辈配乐大师和明乐大师的经典作品</p>
        </div>
      </div>
      <div className="song-tabs" style={{ width: currentW }}>
        <div className="tabs-left">
          全部歌单
          <RightOutlined />
        </div>
        <div className="tabs-right">
          <ul>
            {tabs.map((item) => {
              return <li onClick={() => changeTabs(item.name)}>{item.name}</li>;
            })}
          </ul>
        </div>
      </div>
      <div className="song-content" style={{ width: currentW }}>
        <div className="song-content-list">
          {songList.map((item, index) => {
            return setOffsetW(item, index + 1);
          })}
        </div>
        <Pagination
          showSizeChanger
          onShowSizeChange={onShowSizeChange}
          defaultCurrent={3}
          total={500}
        />
      </div>
    </div>
  );
});
