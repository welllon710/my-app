import React, { useMemo, useRef } from "react";
import { Image } from "antd";
import { useSize } from "ahooks";
import { useHistory } from "react-router";
import { RightSquareOutlined } from "@ant-design/icons";
import moment from "moment";
import "./index.scss";
export const Mv = ({ w,item }) => {
  const ref = useRef();
  const size = useSize(ref);
  const history = useHistory();
  let h = useMemo(() => {
    return Math.floor(size.width / 2) + 40 - 0;
  }, [size.width]);

  return (
    <div className="mv-2" style={{ width: w, marginRight: "1%" }} ref={ref}>
      <div className="mv-img" onClick={() => history.push(`/fount-music/mv/${item.id}`)}>
        <Image
          width={"100%"}
          height={h - 40 + "px"}
          src={item.cover}
          preview={false}
        />
        <div className="right-play">
          <RightSquareOutlined />
          <span>{Math.floor(item.playCount / 10000) + "万"}</span>
        </div>
        <div className="right-time">
          {moment(item.duration).format("MM:SS")}
        </div>
      </div>
      <div className="mv-name">
        <div>{item.name}</div>
        <p>{item.artistName}</p>
      </div>
    </div>
  );
};
