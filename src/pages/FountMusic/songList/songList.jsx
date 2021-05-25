import React, { useState, useEffect, memo } from "react";
import { Image, Pagination } from "antd";
import { BulbOutlined, RightOutlined } from "@ant-design/icons";
import { useWidth } from "../../../my-hooks/_width";
import SquarePriture from "../../../components/picture/square-priture/square-priture";

import "./songList.scss";
export const SongList = memo(({ run, tabs}) => {
  const [currentW, width] = useWidth();
  const [lists, setLists] = useState({
    list: [],
    titImg: {},
    total: 0,
  });
  const fnRun = (param) => {
    run(param).then((res) => {
      setLists((pre) => {
        return {
          ...pre,
          list: res.playlists,
          titImg: res.playlists[0],
          total: res.total,
        };
      });
    });
  };

  useEffect(() => {
    fnRun("全部");
  }, []);
  //根据标签获取列表
  const changeTabs = (name) => {
    fnRun(name);
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
          <Image width={172} height={172} src={lists.titImg.coverImgUrl} />
        </div>
        <div className="img-text">
          <div className="title">
            <BulbOutlined />
            精品歌单
          </div>
          <p>{lists.titImg.name}</p>
          <p>{lists.titImg.copywriter}</p>
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
              return (
                <li onClick={() => changeTabs(item.name)} key={item.id}>
                  {item.name}
                </li>
              );
            })}
          </ul>
        </div>
      </div>
      <div className="song-content" style={{ width: currentW }}>
        <div className="song-content-list">
          {lists.list.map((item, index) => {
            return setOffsetW(item, index + 1);
          })}
        </div>
        <Pagination showSizeChanger defaultCurrent={1} total={lists.total} />
      </div>
    </div>
  );
});
