import React, { useState } from "react";
import { Space, Typography, Divider } from "antd";
import "./singer.scss";
export default function Singer() {
  const [language, setLanguage] = useState([
    "华语",
    "欧美",
    "日本",
    "韩国",
    "其他",
  ]);
  const [cate, setCate] = useState(["男歌手", "女歌手", "乐队组合"]);

  return (
    <div className="singer">
      <div className="header">
        <Space split={<Divider type="vertical" />}>
          {language.map((item) => {
            <Typography.Link>{item}</Typography.Link>;
          })}
        </Space>
      </div>
    </div>
  );
}
