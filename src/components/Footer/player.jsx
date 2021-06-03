import React, { useState, useRef, useEffect, useMemo } from "react";
import { Image, Drawer, Divider, Table } from "antd";
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
  CaretRightOutlined,
  PlusSquareOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import moment from "moment";
import "./player.scss";
import { useHistory } from 'react-router';
export default function Player() {
  const [show, setShow] = useState(true);
  const [endOffsetX, setEndOffsetX] = useState(0);
  const [visible, setVisible] = useState(true);
  const [currentTime, setCurrentTime] = useState(0);
   const isOpen = useSelector((state) => state.isOpen);
  const [minute, setMinute] = useState({
    mm: '00',
    ss: '00'
  })
  const bgRef = useRef();
  const audioRef = useRef();
  const dispatch = useDispatch();
  const history = useHistory()
  let currentMusic = useSelector((state) => state.currentMusic);
  let { data: playList, i: playIndex } = useSelector(
      (state) => state.playList
  );
  let bgW;
  const columns = [
        {
          dataIndex: "title",
          render: (text, record, index) => (
            <div className="song-name">
              {/* <PauseOutlined /> */}
              <CaretRightOutlined
                style={{
                  display: playIndex == index ? "block" : "none",
                }}
              />
              {record.name}
            </div>
          ),
        },
        {
          dataIndex: "singer",
          render: (text, record, index) => record.ar[0].name,
        },
        {
          dataIndex: "time",
          render: (text, record, index) => moment(record.dt).format("MM:SS"),
        },
      ];
  useEffect(() => {
    //  bgW = bgRef.current.clientWidth;
    if (currentMusic.isPlay) {
      setShow(!currentMusic.isPlay);
      audioRef.current.play();
      setInterval(() => {
        setCurrentTime(audioRef.current.currentTime);
      }, 100);
    }
  }, [currentMusic]);

  useEffect(() => {
    bgW = bgRef.current.clientWidth;
    setMinute({
      mm:
        Math.floor(currentTime / 60) >= 10
          ? Math.floor(currentTime / 60)
          : "0" + Math.floor(currentTime / 60),
      ss:
        Math.floor(currentTime % 60) >= 10
          ? Math.floor(currentTime % 60)
          : "0" + Math.floor(currentTime % 60),
    });
    setEndOffsetX((bgW * currentTime) / currentMusic.timestamp);
  }, [currentTime]);
  //播放暂停
  const changePlayer = (status) => {
    setShow((pre) => {
      if (pre) {
        //true 播放
        audioRef.current.play();
      } else {
        //false 暂停
        audioRef.current.pause();
      }
      return !status;
    });
  };
  const onClose = () => {
      dispatch(actions.close(false));
  };
  const rowClick = (record, index) => {
      //点击播放列表，添加播放
      console.log("record", record);
      console.log("playIndex", playIndex);
  };
  const mouseDown = ($event) => {
    let startX = $event.nativeEvent.clientX;
    let startOffsetX = $event.nativeEvent.layerX;
    let endx = 0;
    // let bgW = bgRef.current.clientWidth; //容器宽度
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
    };
    document.onmouseup = function (event) {
      document.onmousemove = null;
      document.onmouseup = null;
    };
  };
  const setBar = ($event) => {
    let { layerX } = $event.nativeEvent;
    setEndOffsetX(layerX);
  };
  const openDrawer = () => {
    setVisible((pre) => {
      visible ? dispatch(actions.open(true)) : dispatch(actions.close(false));
      return !pre;
    });
  };
  const handleLyric = () => {
     history.push(`/fount-music/lyric/1231`);
  }
  return (
    <div className="player">
      <audio
        ref={audioRef}
        id="audio"
        src={
          currentMusic.id
            ? `https://music.163.com/song/media/outer/url?id=${currentMusic.id}.mp3`
            : ""
        }></audio>
      <div className="left">
        <Image width={60} height={60} src={currentMusic.picUrl} preview={false} style={{ cursor: 'pointer' }} onClick={handleLyric }/>
        <div className="left-text">
          <p>
            {currentMusic.name} <HeartOutlined />
          </p>
          <p>
            {currentMusic.auth}
            {show}
          </p>
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
          <span className="start-time">
            {minute.mm}:{minute.ss}
          </span>
          <div className="bg-bar" ref={bgRef} onClick={setBar}>
            <div className="jd-bar" style={{ width: endOffsetX + "px" }}></div>
            <SmileOutlined
              className="ball"
              onMouseDown={mouseDown}
              style={{ transform: `translateX(${endOffsetX + "px"})`,transition:'width 50ms' }}
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
      <Drawer
        className="drawer"
        placement="right"
        closable={false}
        onClose={onClose}
        visible={isOpen}
        mask={false}
        width={500}
        style={{
          position: "absolute",
          top: "64px",
          height: `calc(100vh - 64px - 70px )`,
        }}>
        <div className="play-list">
          <div className="title">
            <Tabs />
            <div className="count">
              <span className="total">
                总{(playList && playList.length) || 0}首
              </span>
              <div className="c-r">
                <div>
                  <PlusSquareOutlined />
                  <span>收藏全部</span>
                </div>
                <div>
                  <DeleteOutlined />
                  <span>清空</span>
                </div>
              </div>
            </div>
          </div>
          <Divider />
          <div className="list">
            <Table
              dataSource={playList}
              pagination={false}
              showHeader={false}
              rowKey={(record) => record.id}
              columns={columns}
              onRow={(record, index) => ({
                onDoubleClick: (event) => rowClick(record, index),
              })}
            />
          </div>
        </div>
      </Drawer>
      ;
    </div>
  );
}
const Tabs = () => {
  const [cur, setCur] = useState(0);
  const isShow = useMemo(() => {
    return cur === 0 ? true : false;
  }, [cur]);
  const handleTabs = (i) => {
    setCur(i);
  };
  return (
    <div className="tabs-box">
      {["播放列表", "历史记录"].map((item, index) => {
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
  );
};