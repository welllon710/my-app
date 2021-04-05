import React, { useState } from "react";
import { Space, Typography, Divider } from "antd";
import { useWidth } from "../../../my-hooks/_width";
import SquarePriture from "../../../components/picture/square-priture/square-priture";
import "./singer.scss";
export default function Singer() {
  const [language, setLanguage] = useState([
    "华语",
    "欧美",
    "日本",
    "韩国",
    "其他",
  ]);
  const [currentW, width] = useWidth(); //动态长度22
  const [cate, setCate] = useState(["男歌手", "女歌手", "乐队组合"]);
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
  const setOffsetW = (item, index) => {
    if (currentW >= 900) {
      return index % 6 === 0 ? (
        <SquarePriture
          key={item.id}
          text={item.id}
          sty={"0px"}
          curw={currentW >= 900 ? "14%" : "22%"}
        />
      ) : (
        <SquarePriture
          key={item.id}
          text={item.id}
          sty={"2%"}
          curw={currentW >= 900 ? "14%" : "22%"}
        />
      );
    } else {
      return index % 5 === 0 ? (
        <SquarePriture
          key={item.id}
          text={item.id}
          sty={"0px"}
          curw={currentW >= 900 ? "16%" : "18%"}
        />
      ) : (
        <SquarePriture
          key={item.id}
          text={item.id}
          sty={"2%"}
          curw={currentW >= 900 ? "16%" : "18%"}
        />
      );
    }
  };
  return (
    <div className="singer">
      <div className="header" style={{ width: currentW }}>
        <Space split={<Divider type="vertical" />}>
          <span>语种:</span>
          <span className="all">全部</span>
          {language.map((item) => {
            return <Typography.Link>{item}</Typography.Link>;
          })}
        </Space>
        <Space split={<Divider type="vertical" />}>
          <span>分类:</span>
          <span className="all">全部</span>
          {cate.map((item) => {
            return <Typography.Link>{item}</Typography.Link>;
          })}
        </Space>
      </div>
      <div className="list" style={{ width: currentW }}>
        {songList.map((item, index) => {
          return setOffsetW(item, index + 1);
        })}
      </div>
    </div>
  );
}
