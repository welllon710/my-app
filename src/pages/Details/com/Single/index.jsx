import React from 'react'
import { Image, Table } from "antd";
import { RightOutlined } from "@ant-design/icons";
import moment from "moment";
import './index.scss'
export const Single = () => {
    const  columns = [
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
      <div className="single">
        <div className="top">
          <h3>最佳匹配</h3>
          <div className="card">
            <Card />
          </div>
        </div>
        <div className="contnet">
          <Table columns={columns} dataSource={[]} />
        </div>
      </div>
    );
}
const Card = ()=>{
    return (
      <div className="card-item">
        <div className="left">
          <Image
                    width={80}
                    height={80}
            src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
          />
        </div>
        <div className="right">
          <span>歌手:G.E.M邓紫棋</span>
          <RightOutlined />
        </div>
      </div>
    );
}
