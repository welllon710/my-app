import React from 'react'
import { Image } from "antd";
import { RightSquareOutlined } from "@ant-design/icons";
import './index.scss'
export const Mv = ({ w }) => {
    let h = Math.floor(parseInt(w) / 2) + '%'
    return (
      <div className="mv-2" style={{width:w,height:'180px'}} >
        <div className="mv-img">
          <Image
            width={'100%'}
            height={'100%'}
            src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
          />
          <div className="right-play">
                    <RightSquareOutlined />
                    <span>2221万</span>
          </div>
          <div className="right-time">03:56</div>
        </div>
        <div className="mv-name">
          <div>光年之外</div>
          <p>G.E.M邓紫棋</p>
        </div>
      </div>
    );
}
