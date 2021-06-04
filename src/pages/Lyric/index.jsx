import react, { useEffect, useState,memo, useRef } from 'react';
import { useHeight } from "../../my-hooks/useHeight";
import { Image, Tag } from "antd";
import { useLyric } from "../../my-hooks/_request";
import './index.scss'
import { useSelector } from 'react-redux';
export const Lyric = memo((props) => {
  const {
    match: { params },
  } = props;
  useHeight();
  const boxRef = useRef()
  const reg = /^\[(\w+\:\w+\.\w+)\](.*)/;
  const [isP, setIsp] = useState("running");
  const [lyricData, setLyricData] = useState({
    lrc: [],
    // tlyric: {},
  });
  const currentMusic = useSelector((state) => state.currentMusic);
  const currentStatus = useSelector((state) => state.currentStatus);
  const currentTime = useSelector((state) => state.currentTime);
  const { run } = useLyric(params.id);
  useEffect(() => {
    run().then(res => {
      const { lrc, tlyric } = res;
      let e = lrc.lyric.split("\n").map((item) => {
        let a = item.match(reg);
        if (a) {
          let min = a[1].split(':')[0]
          let sec = a[1].split(":")[1];
          return {
            lyric: a[2],
            time: Math.floor(Number(min * 60) + Number(sec)),
          };
        }
      });
      // time: "00:30.94"
      // let c = tlyric.lyric.split("\n");
      // console.log('e',e);
      setLyricData({
        lrc: e,
        // tlyric: c,
      });
    });
  }, [])
  console.log("lyricData--", lyricData);
  useEffect(() => { 
    if (currentStatus == 'end') {
      setIsp("paused");
    }
  }, [currentStatus]);
  return (
    <div className="lyric">
      <div className="lyric-box">
        <div className="left">
          <div className="img-box" style={{ animationPlayState: isP }}>
            <Image
              width={300}
              height={300}
              src="/assets/lyric.png"
              preview={false}
              className="bg-img"
            />
            <Image
              width={200}
              height={210}
              src={currentMusic.picUrl}
              preview={false}
              className="midle-img"
            />
          </div>
        </div>
        <div className="right">
          <div className="song-title">
            <div className="row-first">
              <h2>{currentMusic.name}</h2>
              <Tag color="magenta">极高音质</Tag>
            </div>
            <div className="row-second">
              <div>
                <p>专辑</p>
                <span>光年之外</span>
              </div>
              <div>
                <p>歌手</p>
                <span>{currentMusic.auth}</span>
              </div>
              <div>
                <p>来源</p>
                <span>搜索页</span>
              </div>
            </div>
          </div>
          <div className="lyric" ref={boxRef}>
            {lyricData.lrc.map((item, index) => {
              return item ? (
                <div
                  key={index}
                  className={`l-item ${
                    Math.floor(currentTime) >= item.time ? "is-show" : ""
                  }`}
                >
                  {item.lyric}
                </div>
              ) : (
                ""
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
})
; 