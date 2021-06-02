import React, { useState, useRef, useEffect } from "react";
import { Image, Progress, Drawer } from "antd";
import { useDispatch, useSelector } from "react-redux";
import actions from "../../redux/actions";
import {
  HeartOutlined,
  RetweetOutlined,
  StepBackwardOutlined,
  PlayCircleOutlined,
  StepForwardOutlined,
  SendOutlined,
  PauseCircleOutlined,
  SmileOutlined,
  UnorderedListOutlined,
} from "@ant-design/icons";
import "./player.scss";
export default function Player() {
  const [show, setShow] = useState(true);
  const [jdW, setJdw] = useState(0);
  const [endOffsetX, setEndOffsetX] = useState(0);
  const [visible, setVisible] = useState(true);
  const bgRef = useRef();
  const audioRef = useRef()
  const dispatch = useDispatch();
  let currentMusic = useSelector((state) => state.currentMusic);
  useEffect(() => {
    console.log("audioRef", audioRef);

  }, [])
  const changePlayer = (status) => {
    setShow(pre => {
      console.log("pre", pre);
      if (pre) {
        audioRef.current.play();
      } else {
        audioRef.current.pause();
      }
      return !status;
    });

  };
  const mouseDown = ($event) => {
    let { target } = $event;
    let startX = $event.nativeEvent.clientX;
    let startOffsetX = $event.nativeEvent.layerX;
    let endx = 0;
    let bgW = bgRef.current.clientWidth; //容器宽度
    document.onmousemove = function (event) {
      event.preventDefault();
      endx = event.clientX;
      let moveX = endx - startX;
      let distancemove = moveX + startOffsetX - 0;
      if (moveX > 0) {
        setEndOffsetX(distancemove > bgW ? bgW : distancemove);
      } else {
        setEndOffsetX(distancemove <= 0 ? 0 : distancemove);
      }
      setEndOffsetX((endOffsetX) => {
        setJdw(endOffsetX);
      });
    };
    document.onmouseup = function (event) {
      document.onmousemove = null;
      document.onmouseup = null;
    };
  };
  const setBar = ($event) => {
    let { layerX } = $event.nativeEvent;
    setJdw(layerX);
    setEndOffsetX(layerX);
  };
  const openDrawer = () => {
    setVisible((pre) => {
      console.log('pre', pre);
      visible ? dispatch(actions.open(true)) : dispatch(actions.close(false));
      return !pre;
    });
    
    // dispatch(actions.open(true));
    console.log('点我');
    // visible ? dispatch(actions.open(true)) : dispatch(actions.close(false));
  };
  return (
    <div className="player">
      <audio
        ref={audioRef}
        id="audio"
        src={`https://music.163.com/song/media/outer/url?id=${currentMusic.id}.mp3`}></audio>
      <div className="left">
        <Image
          width={60}
          height={60}
          src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
        />
        <div className="left-text">
          <p>
            {currentMusic.name} <HeartOutlined />
          </p>
          <p>{currentMusic.auth}</p>
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
          <div className="bg-bar" ref={bgRef} onClick={setBar}>
            <div className="jd-bar" style={{ width: jdW + "px" }}></div>
            <SmileOutlined
              className="ball"
              onMouseDown={mouseDown}
              style={{ transform: `translateX(${endOffsetX + "px"})` }}
            />
          </div>
          <span className="end-time">{currentMusic.time}</span>
        </div>
      </div>
      <div className="right">
        <div className="f-zone">
          <UnorderedListOutlined className="drawer" onClick={openDrawer} />
        </div>
      </div>
    </div>
  );
}
