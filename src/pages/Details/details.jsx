import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import actions from "../../redux/actions";
import { Button, Radio, Table, Tag, Space, Image } from "antd";

import { CaretRightOutlined } from "@ant-design/icons";
import { useEveryDay } from "../../my-hooks/_request";
import { CalendarOutlined } from "@ant-design/icons";
import moment from "moment";
import "./details.scss";
export default function Details(props) {
  const {
    match: { params },
  } = props;
  const dispatch = useDispatch();
  const { songList } = useEveryDay(sessionStorage.getItem('cookie'));
  const [myList, setMyList] = useState([]);
  const [day] = useState(() => new Date().getDate());
  useEffect(() => {
    dispatch(actions.goDetail(false));
  }, []);
  useEffect(() => {
    if (songList.length > 0) {
       setMyList((myList) => {
         return songList.map(item => {
           return {
             title: item.name,
             singer: item.ar[0].name,
             album: item.al.name,
             time: moment(item.dt).format("MM:SS"),
           };
         });
       });
    }
  }, [songList]);
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
        <Table columns={columns} dataSource={myList} />
      </div>
    </div>
  );
}
