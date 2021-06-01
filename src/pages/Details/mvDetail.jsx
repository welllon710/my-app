import react from "react";
import {
  LeftOutlined,
  RightSquareOutlined,
  DownloadOutlined,
} from "@ant-design/icons";
import { useHeight } from "../../my-hooks/useHeight";
import { Image, Tag, Button } from "antd";
import "./mvDetail.scss";
export const MvDetail = () => {
  useHeight();
  return (
    <div className="mv-detail">
      <div className="mv-box">
        <div className="left">
          <div className="title">
            <LeftOutlined />
            <h3>MV详情</h3>
          </div>
          <div className="mv-video">
            <video src="" height={"60%"} width={"95%"} controls></video>
          </div>
          <div className="singer-info">
            <Image
              width={60}
              height={60}
              preview={false}
              src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
            />
            <span>邓紫棋</span>
          </div>
          <div className="song-info">
            <h1>光年之外</h1>
                      <div className="second" >
              <span>发布:2016-12-30</span>
              <span>播放:2222万</span>
            </div>
            <div className="third">
              <Tag color="magenta">MV</Tag>
              <Tag color="magenta">流行</Tag>
              <Tag color="magenta">音乐</Tag>
            </div>
            <div className="fourth">
              <Button
                type="primary"
                shape="round"
                icon={<DownloadOutlined />}
                >
                Download
              </Button>
            </div>
          </div>
        </div>
        <div className="right">
          <h3>相关推荐</h3>
          <MvCard />
          <MvCard />
          <MvCard />
          <MvCard />
          <MvCard />
        </div>
      </div>
    </div>
  );
};
const MvCard = () => {
  return (
    <div className="mv-card">
      <div className="card-left">
        <Image
          width={150}
          height={80}
          preview={false}
          src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
        />
        <div className="card-play">
          <RightSquareOutlined />
          {/* <span>{Math.floor(item.playCount / 10000) + "万"}</span> */}
          <span>500万</span>
        </div>
        <div className="card-time">
          {/* {moment(item.duration).format("MM:SS")} */}
          03:22
        </div>
      </div>
      <div className="card-right">
        <p>
          邓紫棋邓紫棋邓奥术大师多紫邓紫棋邓紫棋棋邓紫棋邓紫棋邓紫棋邓紫棋邓紫棋
        </p>
        <div>by-音乐诊疗书</div>
      </div>
    </div>
  );
};
