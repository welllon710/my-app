import React, { useState } from "react";
import { Image } from "antd";
import { RightOutlined } from "@ant-design/icons";
import "./rankList.scss";
export default function RankList() {
  const [musicList, setMusicList] = useState([
    "one",
    "two",
    "three",
    "four",
    "five",
  ]);
  return (
    <div className="rank-list">
      <div className="rank-left">
        <Image
          width={210}
          preview={false}
          src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
        />
      </div>
      <div className="rank-right">
        <ul>
          {musicList.map((item, index) => {
            return (
              <li key={index}>
                <div>
                  <span className={index + 1 <= 3 ? "active" : ""}>
                    {index + 1}
                  </span>
                  <span>-</span>
                  <span> {item}</span>
                </div>
                <div>张小斐</div>
              </li>
            );
          })}
        </ul>
        <div className="seeAll">
          查看全部
          <RightOutlined />
        </div>
      </div>
    </div>
  );
}
