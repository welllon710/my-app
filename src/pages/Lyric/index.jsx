import react, { useEffect, useState, memo, useRef } from "react";
import { useHeight } from "../../my-hooks/useHeight";
import { Image, Tag, Button, Modal,Input  } from "antd";
import { useLyric } from "../../my-hooks/_request";
import LyricComment from '../../components/comment/comment'
import { EditOutlined } from "@ant-design/icons";
import useUrlState from "@ahooksjs/use-url-state";
// import { useScroll } from "ahooks";
import "./index.scss";
import { useSelector } from "react-redux";
const { TextArea } = Input;
export const Lyric = memo((props) => {
  useHeight();
  const boxRef = useRef();
  const ref = useRef();
  const [urlData, setUrlData] = useUrlState({ id: "" });
  const reg = /^\[(\w+\:\w+\.\w+)\](.*)/;
  const [isP, setIsp] = useState("running");
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [lyricData, setLyricData] = useState({
    lrc: [],
    // tlyric: {},
  });
  const [com, setCom] = useState({
    hot: [],
    comment:[]
  })
  // const scroll = useScroll(ref);
  const currentMusic = useSelector((state) => state.currentMusic);
  const currentStatus = useSelector((state) => state.currentStatus);
  const currentTime = useSelector((state) => state.currentTime);
  const [curentRow, setCurrentRow] = useState(0);
  const { run } = useLyric(urlData.id);
  useEffect(() => {
    run().then((res) => {
      const { lrc, tlyric } = res[0];
      const { comments, hotComments } = res[1];
      let e = lrc.lyric.split("\n").map((item) => {
        let a = item.match(reg);
        if (a) {
          let min = a[1].split(":")[0];
          let sec = a[1].split(":")[1];
          return {
            lyric: a[2],
            time: Math.floor(Number(min * 60) + Number(sec)),
          };
        }
      });
      // time: "00:30.94"
      // let c = tlyric.lyric.split("\n");
      //
      setLyricData({
        lrc: e,
        // tlyric: c,
      });
      setCom({
        hot: hotComments,
        comment: comments,
      });
    });
  }, [urlData]);
  useEffect(() => {
    if (currentStatus == "end") {
      setIsp("paused");
    } else {
       setIsp("running");
    }
  }, [currentStatus]);
  useEffect(() => {
    lyricData.lrc.map((item, index) => {
      if (item && item.time == Math.floor(currentTime)) {
        setCurrentRow(index);
        if (index >= 3) {
          boxRef.current.scrollTop = 42 * (index - 3);
        }
      }
    });
  }, [currentTime]);
  const handleOk = () => {
      setIsModalVisible(false);
  };
  const handleCancel = () => {
      setIsModalVisible(false);
  };
  const onChange = (e) => {
    console.log("Change:", e.target.value);
  };
  return (
    <div className="lyric" ref={ref}>
      <div className="lyric-box">
        <div className="top">
          <div className="song-title">
            <div className="row-first">
              <h2>{currentMusic.name}</h2>
              <Tag color="magenta">MV</Tag>
            </div>
          </div>
        </div>
        <div className="bottom">
          <div className="left">
            <div
              className="bg-top"
              style={{
                transform: isP == "running" ? "rotate(30deg)" : "rotate(0deg)",
              }}>
              <Image
                width={300}
                height={80}
                src="/assets/lyric-top.png"
                preview={false}
              />
            </div>
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
          <div className="lyric" ref={boxRef}>
            <ul>
              {lyricData.lrc.map((item, index) => {
                return item ? (
                  <li
                    key={index}
                    className={`l-item ${curentRow == index ? "is-show" : ""}`}>
                    {item.lyric}
                  </li>
                ) : (
                  ""
                );
              })}
            </ul>
          </div>
          <div className="tips">
            <div>播放来源:每日歌曲推荐</div>
            <h3>包含这首歌的歌单</h3>
            <ul>
              <li>
                <Image
                  width={30}
                  height={30}
                  src="/assets/sun.jpg"
                  preview={false}
                />
                <span>一边散步一边听会感觉自己帅炸</span>
              </li>
              <li>
                <Image
                  width={30}
                  height={30}
                  src="/assets/sun.jpg"
                  preview={false}
                />
                <span>一边散步一边听会感觉自己帅炸</span>
              </li>
              <li>
                <Image
                  width={30}
                  height={30}
                  src="/assets/sun.jpg"
                  preview={false}
                />
                <span>一边散步一边听会感觉自己帅炸</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="lyric-com">
        <h3>全部评论(15049)</h3>
        {com.hot.map((item, index) => (
          <LyricComment key={index} {...item} />
        ))}
        <h3>最新评论</h3>
        {com.comment.map((item, index) => (
          <LyricComment key={index} {...item} />
        ))}
        {/* <LyricComment/> */}
      </div>
      <div className="com-btn">
        <Button
          type="primary"
          shape="round"
          icon={<EditOutlined />}
          size={"large"}
          onClick={() => setIsModalVisible(true)}>
          发表我的音乐评论 
        </Button>
      </div>
      <Modal
        title={`歌曲:${currentMusic.name}`}
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        okText="评论"
        cancelText="取消">
        <div>
          <TextArea showCount maxLength={100} onChange={onChange} />
        </div>
      </Modal>
    </div>
  );
});
