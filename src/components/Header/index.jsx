import React from "react";
import { Input, Space, Avatar } from "antd";
import {
  AudioOutlined,
  RightCircleOutlined,
  UserOutlined,
  LeftCircleOutlined,
} from "@ant-design/icons";
import "./index.scss";
export default function Header() {
  const { Search } = Input;
  const onSearch = () => {};

  return (
    <div className="wyy-header">
      <div className="header-left">
        <img src="/assets/wyylogo.jpg" alt="logo" />
        <div className="fnc-cpm">
          <LeftCircleOutlined className="left-icon" />
          <RightCircleOutlined className="right-icon" />
          <Search placeholder="搜索内容" onSearch={onSearch} />
        </div>
      </div>
      <div className="header-right">
        <div className="user-info">
          <Avatar icon={<UserOutlined />} />
          <span className="user-status">未登录</span>
          <span className="user-status">开通vip</span>
        </div>
      </div>
    </div>
  );
}
