import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import actions from "../../redux/actions";
import { Button, Radio } from "antd";

import { CaretRightOutlined } from "@ant-design/icons";
import "./details.scss";
export default function Details() {
  const dispatch = useDispatch();
  useEffect(() => {
    console.log("来到了详情");
    dispatch(actions.goDetail(false));
  }, []);
  return (
    <div className="music-details">
      <div className="top">
        <img src="/assets/day.png" alt="" />
        <div className="text">
          <h2>每日歌曲推荐</h2>
          <div>根据你的音乐口味生成,每天6:00更新</div>
        </div>
      </div>
      <div className="bottom">
        <Button type="primary" shape="round" icon={<CaretRightOutlined />}>
          Download
        </Button>
      </div>
    </div>
  );
}
