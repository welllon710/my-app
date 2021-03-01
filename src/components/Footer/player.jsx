import React, { useState, useRef } from "react";
import { Image, Progress } from "antd";
import {
  HeartOutlined,
  RetweetOutlined,
  StepBackwardOutlined,
  PlayCircleOutlined,
  StepForwardOutlined,
  SendOutlined,
  PauseCircleOutlined,
  SmileOutlined,
} from "@ant-design/icons";
import "./player.scss";
export default function Player() {
  const [show, setShow] = useState(true);
  const ballRef = useRef();
  const bgRef = useRef();
  const changePlayer = (status) => {
    setShow(!status);
  };
  const mouseDown = ($event) => {
    let { target } = $event;

    let startX = $event.nativeEvent.clientX;
    let startOffsetX = $event.nativeEvent.layerX;

    let endx = 0;
    let endOffsetX = 0;
    let bgW = bgRef.current.clientWidth; //容器宽度
    document.onmousemove = function (event) {
      event.preventDefault();
      endx = event.clientX;

      let moveX = endx - startX;
      let distancemove = moveX + startOffsetX - 0;

      if (moveX > 0) {
        endOffsetX = distancemove > bgW ? bgW : distancemove;
      } else {
        endOffsetX = distancemove <= 0 ? 0 : distancemove;
      }

      target.style.transform = `translateX(${endOffsetX + "px"})`;
    };
    document.onmouseup = function (event) {
      // target.style.transform = `translateX(${endOffsetX + "px"})`;

      document.onmousemove = null;
      document.onmouseup = null;
    };
  };

  return (
    <div className="player">
      <audio id="audio"></audio>
      <div className="left">
        <Image
          width={60}
          height={60}
          src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
        />
        <div className="left-text">
          <p>
            玩具(吉他版) <HeartOutlined />
          </p>
          <p>就是南方凯</p>
        </div>
      </div>
      <div className="centre">
        <div className="icon-btn">
          <div className="btn-box">
            <RetweetOutlined />
            <StepBackwardOutlined />
            {show ? (
              <PlayCircleOutlined onClick={() => changePlayer(true)} />
            ) : (
              <PauseCircleOutlined onClick={() => changePlayer(false)} />
            )}
            <StepForwardOutlined />
            <SendOutlined />
          </div>
        </div>
        <div className="progress-bar">
          <span className="start-time">0.00</span>
          <div className="bg-bar" ref={bgRef}>
            <div className="jd-bar"></div>
            <SmileOutlined
              className="ball"
              ref={ballRef}
              onMouseDown={mouseDown}
            />
          </div>
        </div>
      </div>
      <div className="right"></div>
    </div>
  );
}
