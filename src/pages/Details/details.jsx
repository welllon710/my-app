import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import actions from "../../redux/actions";
import { Button, Radio, Table, Tag, Space } from "antd";

import { CaretRightOutlined } from "@ant-design/icons";
import "./details.scss";
export default function Details() {
  const dispatch = useDispatch();
  useEffect(() => {
    console.log("来到了详情");
    dispatch(actions.goDetail(false));
  }, []);
  const columns = [
    {
      title: "序号",
      render: (text, record, index) => `${index + 1}`,
    },
    {
      title: "音乐标题",
      dataIndex: "title",
    },
    {
      title: "歌手",
      dataIndex: "singer",
    },
    {
      title: "专辑",
      dataIndex: "album",
    },
    {
      title: "时长",
      dataIndex: "time",
    },
  ];
  return (
    <div className="music-details">
      <div className="music-recommend">
        <div className="top">
          <img src="/assets/day.png" alt="" />
          <div className="text">
            <h2>每日歌曲推荐</h2>
            <div>根据你的音乐口味生成,每天6:00更新</div>
          </div>
        </div>
        <div className="bottom">
          <Button shape="round" icon={<CaretRightOutlined />}>
            播放全部
          </Button>
        </div>
      </div>
      <div className="music-table">
        <Table columns={columns} />
      </div>
    </div>
  );
}
