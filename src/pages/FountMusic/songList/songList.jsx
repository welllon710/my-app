import React, { useState, useEffect, memo, useMemo } from "react";
import { Image, Pagination } from "antd";
import { BulbOutlined, RightOutlined } from "@ant-design/icons";
import { useWidth } from "../../../my-hooks/_width";
import { requestList, useSongList } from "../../../my-hooks/_request";
import SquarePriture from "../../../components/picture/square-priture/square-priture";
import "./songList.scss";
export default memo(function SongList() {
  const [currentW, width] = useWidth();
  const { tabs, songLists, setCatVal, setBefore } = useSongList();
  const [titImg, setTitImg] = useState({});
  const [imgList, setImgList] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(0);
  useEffect(() => {
    if (songLists) {
      const { playlists, lasttime, total } = songLists;
      setImgList(playlists);
      setTitImg(playlists[0]);
      setTotal(total);
      setPage(lasttime);
    }
  }, [songLists]);

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
          item={item}
          sty={"0px"}
          curw={currentW >= 900 ? "18%" : "22%"}
        />
      ) : (
        <SquarePriture
          key={item.id}
          item={item}
          sty={"2%"}
          curw={currentW >= 900 ? "18%" : "22%"}
        />
      );
    } else {
      return index % 4 === 0 ? (
        <SquarePriture
          key={item.id}
          item={item}
          sty={"0px"}
          curw={currentW >= 900 ? "18%" : "22%"}
        />
      ) : (
        <SquarePriture
          key={item.id}
          item={item}
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
          <Image width={172} height={172} src={titImg.coverImgUrl} />
        </div>
        <div className="img-text">
          <div className="title">
            <BulbOutlined />
            精品歌单
          </div>
          <p>{titImg.name}</p>
          <p>{titImg.copywriter}</p>
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
          {imgList.map((item, index) => {
            return setOffsetW(item, index + 1);
          })}
        </div>
        <Pagination showSizeChanger defaultCurrent={1} total={total} />
      </div>
    </div>
  );
});
