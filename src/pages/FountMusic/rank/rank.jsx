import React, { useState } from "react";
import { useWidth } from "../../../my-hooks/_width";
import RankList from "../../../components/RankList/rankList";
import SquarePriture from "../../../components/picture/square-priture/square-priture";
import "./rank.scss";
export default function Rank() {
  const [currentW, width] = useWidth(); //动态长度22
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
  return (
    <div className="rank">
      <h2 style={{ width: currentW }}>官方版</h2>
      <div className="rank-lists" style={{ width: currentW }}>
        <RankList />
      </div>
      <h2 style={{ width: currentW }}>全球版</h2>
      <div className="global" style={{ width: currentW }}>
        {songList.map((item, index) => {
          return (index + 1) % 5 === 0 ? (
            <SquarePriture
              key={item.id}
              text={item.id}
              sty={"0px"}
              curw={"18%"}
            />
          ) : (
            <SquarePriture text={item.text} sty={"2%"} curw={"18%"} />
          );
        })}
      </div>
    </div>
  );
}
