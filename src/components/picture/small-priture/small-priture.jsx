import React from "react";
import { Image } from "antd";
import "./small-priture.scss";
export default function SmallPriture(props) {
  const { item, curw } = props;
  const setAuthor = (i) => {
    return i.song.artists[0].name;
  };
  return (
    <div className="small-priture" style={{ width: curw }}>
      <div className="list-box">
        <Image
          preview={false}
          width={50}
          height={50}
          src={
            item
              ? item.picUrl
              : "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
          }
        />
        <div className="right-text">
          <p>{item.name}</p>
          <p>{setAuthor(item)}</p>
        </div>
      </div>
    </div>
  );
}
