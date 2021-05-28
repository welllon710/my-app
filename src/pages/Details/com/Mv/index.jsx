import React, { useMemo, useRef } from "react";
import { Image } from "antd";
import { useSize } from "ahooks";
import { RightSquareOutlined } from "@ant-design/icons";
import "./index.scss";
export const Mv = ({ w }) => {
  const ref = useRef();
  const size = useSize(ref);
  let h = useMemo(() => {
    return Math.floor(size.width / 2) + 40 - 0;
  }, [size.width]);
  console.log("h", h);
  return (
    <div
      className="mv-2"
      style={{ width: w, height: h + "px", marginRight: "20px" }}
      ref={ref}
    >
      <div className="mv-img">
        <Image
          width={"100%"}
          height={h - 40 + "px"}
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
};
