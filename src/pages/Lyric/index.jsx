import react from 'react';
import { useHeight } from "../../my-hooks/useHeight";
import { Image, Tag } from "antd";
import './index.scss'
export const Lyric = () => {
    useHeight();
    return (
      <div className="lyric">
        <div className="lyric-box">
          <div className="left">
            <div className="img-box">
              <Image
                width={300}
                src="/assets/lyric.png"
                preview={false}
                className="bg-img"
              />
              <Image
                width={200}
                height={210}
                src="/assets/sun.jpg"
                preview={false}
                className="midle-img"
              />
            </div>
          </div>
          <div className="right">
            <div className="song-title">
              <div className="row-first">
                <h2>光年之外</h2>
                <Tag color="magenta">极高音质</Tag>
              </div>
              <div className="row-second">
                <div>
                  <p>专辑</p>
                  <span>光年之外</span>
                </div>
                <div>
                  <p>歌手</p>
                  <span>邓紫棋</span>
                </div>
                <div>
                  <p>来源</p>
                  <span>搜索页</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
}