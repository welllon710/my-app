import React, { useState,useRef } from "react";
import { Image, Progress } from "antd";
import {
  HeartOutlined,
  RetweetOutlined,
  StepBackwardOutlined,
  PlayCircleOutlined,
  StepForwardOutlined,
  SendOutlined,
  PauseCircleOutlined,
  AimOutlined
} from "@ant-design/icons";
import "./player.scss";
export default function Player() {
   const [show,setShow] = useState(true) 
   const ballRef = useRef()
  const changePlayer = (status)=>{
    setShow(!status)
  }  
  const mouseDown = ($event)=>{
    console.log($event);
    mouseMove()
    mouseUp()
  }
  const mouseMove = ($event)=>{
    console.log('move',$event);
    const mouseMove = ()=>{
      
    }
    const mouseUp = ()=>{
      
    }
  }

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
            {
               show ?  <PlayCircleOutlined onClick={()=>changePlayer(true)}/>
                :<PauseCircleOutlined onClick={()=>changePlayer(false)}/>
            }
            <StepForwardOutlined />
            <SendOutlined />
          </div>
        </div>
        <div className="progress-bar">
          <span className="start-time">0.00</span>
          <div className="bg-bar">
            <div className="jd-bar"></div> 
              <AimOutlined className="ball" ref={ballRef} 
              onMouseDown={mouseDown} 
              onMouseMove={mouseMove}
              onMouseUp={mouseUp}
              />
          </div>    
        </div>
      </div>
      <div className="right"></div>
    </div>
  );
}
