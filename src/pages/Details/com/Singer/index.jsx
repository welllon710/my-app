import React from "react";
import { Image } from "antd";
import { WifiOutlined } from "@ant-design/icons";
import './index.scss'
export const Singer = ({ children, isS=false }) => {
  return (
    <div className="singer-2">
      <div className="left">
        <Image
          width={80}
          height={80}
          src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
        />
      </div>
      <div className="right">
        <span>一光年之外</span>
        <WifiOutlined style={{ display: isS ? "none" : "block" }} />
      </div>
      <div className="right" style={{ display: isS ? "block" : "none" }}>
        {children}
      </div>
    </div>
  );
};
