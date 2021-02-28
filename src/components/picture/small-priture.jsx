import React from "react";
import { Image } from "antd";
import "./small-priture.scss";
export default function SmallPriture(props) {
  const { text, curw } = props;
  return (
    <div className="small-priture" style={{ width: curw }}>
      <div className="list-box">
        <Image
          width={50}
          height={50}
          src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
        />
        <div className="right-text">
          <p>形容</p>
          <p>沈以诚</p>
        </div>
      </div>
    </div>
  );
}
