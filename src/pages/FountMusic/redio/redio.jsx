import React, { useRef, useState } from "react";
import { Carousel } from "antd";
import { RightOutlined, LeftOutlined } from "@ant-design/icons";
import MySwiper from "../../../components/MySwiper";
import SquarePriture from "../../../components/picture/square-priture";
import { useWidth } from "../../../my-hooks/_width";
import "./redio.scss";
export default function Redio() {
  const [currentW, width] = useWidth();
  const SwipeRef = useRef();
  const [listen, setListen] = useState([
    {
      id: 1,
    },
    {
      id: 2,
    },
    {
      id: 3,
    },
    {
      id: 4,
    },
    {
      id: 5,
    },
  ]);
  const contentStyle = {
    height: "160px",
    color: "#fff",
    lineHeight: "160px",
    textAlign: "center",
    background: "#364d79",
  };

  const toNext = () => {
    SwipeRef.current.next();
  };
  const toPre = () => {
    SwipeRef.current.prev();
  };
  return (
    <div className="redio">
      <MySwiper></MySwiper>
      <div className="icon-list">
        <div className="swiper-box" style={{ width: currentW }}>
          <Carousel ref={SwipeRef}>
            <div>
              <h3 style={contentStyle}>1</h3>
            </div>
            <div>
              <h3 style={contentStyle}>2</h3>
            </div>
          </Carousel>
          <RightOutlined className="icon-right" onClick={toNext} />
          <LeftOutlined className="icon-left" onClick={toPre} />
        </div>
      </div>
      <div className="listen">
        <h2 style={{ width: currentW }}>
          听听
          <RightOutlined />
          <div className="listen-list">
            {listen.map((item, index) => {
              return (
                <SquarePriture
                  sty={index + 1 === 5 ? "0" : "3%"}
                  curw={"17%"}
                />
              );
            })}
          </div>
        </h2>
      </div>
    </div>
  );
}
