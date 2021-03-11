import React, { useState, useMemo } from "react";
import { Image } from "antd";
import "./newMusic.scss";
import { useWidth } from "../../../my-hooks/_width";
export default function NewMusic() {
  const [currentW, width] = useWidth(); //动态长度22
  const [tabs, setTabs] = useState(["新歌速递", "新碟上架"]);
  const [countryCate, setCountryCate] = useState([
    "全部",
    "华语",
    "欧美",
    "韩国",
    "日本",
  ]);
  const [newM, setNewM] = useState([{}, {}, {}]);
  const [cur, setCur] = useState(0);
  const [tabCur, setTabCur] = useState(0);
  const isShow = useMemo(() => {
    return cur === 0 ? true : false;
  }, [cur]);
  const handleTabs = (i) => {
    setCur(i);
  };
  const handleClick = (i) => {
    setTabCur(i);
  };
  return (
    <div className="new-music">
      <div className="music-tabs" style={{ width: currentW }}>
        <div className="tabs-box">
          {tabs.map((item, index) => {
            return (
              <div
                className={index === cur ? "active" : ""}
                key={index}
                onClick={() => handleTabs(index)}>
                {item}
              </div>
            );
          })}
        </div>
      </div>
      <div className="music-list" style={{ width: currentW }}>
        <div className="country-cate">
          {countryCate.map((item, index) => {
            return (
              <div
                key={index}
                className={index === tabCur ? "active" : ""}
                onClick={() => handleClick(index)}>
                {item}
              </div>
            );
          })}
          <div className="right-tabs"></div>
        </div>
        <div
          className="picture-list"
          style={{ display: isShow ? "block" : "none" }}>
          <ul>
            {newM.map((item, index) => {
              return (
                <li>
                  <div className="li-left">
                    <span className="serial">
                      {index < 10 ? "0" + (index + 1) : index + 1}
                    </span>
                    <Image
                      width={70}
                      src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
                    />
                    <div className="music-name">
                      <span>primise</span>
                    </div>
                  </div>
                  <div className="li-right">
                    <div className="auth">马尾苏</div>
                    <div className="time">03:27</div>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
        <div
          className="picture-list"
          style={{ display: !isShow ? "block" : "none" }}>
          1111
        </div>
      </div>
    </div>
  );
}
