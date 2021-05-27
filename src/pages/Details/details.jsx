import React, { useState } from "react";
import { Button, Table } from "antd";
import { CaretRightOutlined } from "@ant-design/icons";
import { useEveryDay } from "../../my-hooks/_request";
import { useHeight } from "../../my-hooks/useHeight";
import { CalendarOutlined } from "@ant-design/icons";
import moment from "moment";
import "./details.scss";
export default function Details(props) {
  const {
    match: { params },
  } = props;
  useHeight();
  const { lists } = useEveryDay({
    cookie: sessionStorage.getItem("cookie"),
  });
  const [day] = useState(() => new Date().getDate());
  const columns = [
    {
      title: "序号",
      render: (text, record, index) => `${index + 1}`,
    },
    {
      title: "音乐标题",
      dataIndex: "title",
      render: (text, record, index) => record.name,
    },
    {
      title: "歌手",
      dataIndex: "singer",
      render: (text, record, index) => record.ar[0].name,
    },
    {
      title: "专辑",
      dataIndex: "album",
      render: (text, record, index) => record.al.name,
    },
    {
      title: "时长",
      dataIndex: "time",
      render: (text, record, index) => moment(record.dt).format("MM:SS"),
    },
  ];
  return (
    <div className="music-details">
      <div className="music-recommend">
        <div className="top">
          <div className="day-info">
            <CalendarOutlined />
            <span className="day">{day}</span>
          </div>
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
        <Table columns={columns} dataSource={lists} />
      </div>
    </div>
  );
}
