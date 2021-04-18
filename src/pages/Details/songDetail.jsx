import React, { useEffect, useState } from "react";
import { Image } from "antd";
import { useDispatch } from "react-redux";
import { Button, Radio, Table, Tag, Space, Tabs, Input } from "antd";
import { DownloadOutlined } from "@ant-design/icons";
import { SmileOutlined } from "@ant-design/icons";
import actions from "../../redux/actions";
import { useDetail, requestList } from "../../my-hooks/_request";
import Api_ from '../../api/foundMusic'
import CommentItem from "../../components/comment/comment";
import moment from "moment";
import "./songDetail.scss";
const { TabPane } = Tabs;
const { TextArea } = Input;
export default function SongDetail(props) {
  const {
      match: { params },
  } = props;
  const dispatch = useDispatch();
  const { songList, comment } = useDetail(params.id);
  const [myList, setMyList] = useState([]);
  const [value, setValue] = useState('');
  const [comList, setComList] = useState([1, 2, 3, 4, 5]);
  useEffect(() => {
    dispatch(actions.goDetail(false));
  }, []);
  useEffect(() => {
    
      if (Object.keys(songList).length > 0) {
        const { tracks } = songList;
        setMyList((myList) => {
          return tracks.map((item) => {
            return {
              title: item.name,
              singer: item.ar[0].name,
              album: item.al.name,
              time: moment(item.dt).format("MM:SS"),
            };
          });
        });
    }
    
  }, [songList]);
  const columns = [
    {
      title: "序号",
      render: (text, record, index) => `${index + 1}`,
    },
    {
      title: "音乐标题",
      dataIndex: "title",
    },
    {
      title: "歌手",
      dataIndex: "singer",
    },
    {
      title: "专辑",
      dataIndex: "album",
    },
    {
      title: "时长",
      dataIndex: "time",
    },
  ];
  const commentList = (data) => {
    return data.map((item,index) => {
      return <CommentItem {...item} key={index }/>;
    });
  };
  //回复评论
  const replyComment = async () => {
    console.log("value", value);
    const res = await requestList({
      ...Api_.replyComment,
      params: { t: 1, tpye: 2, id: params.id, content: value,cookie:sessionStorage.getItem('cookie') },
    });
    console.log('发送评论',res);
  };
  const onChange = ({ target: { value } }) => {
    setValue(value);
  };
  return (
    <div className="songDetail">
      <div className="song-top">
        <div className="img-right">
          <Image width={210} src={songList.coverImgUrl} />
        </div>
        <div className="song-left">
          <div className="title">
            <div>歌单</div>
            <div>{songList.name}</div>
          </div>
          <div className="time">
            <Image
              width={40}
              src={songList.creator ? songList.creator.avatarUrl : ""}
            />
            <div className="auth-info">
              {songList.creator ? songList.creator.nickname : ""}
              <span>
                {moment(songList.createTime).format("yyyy-MM-DD")}创建
              </span>
            </div>
          </div>
          <div className="btn-group">
            <Button type="primary" shape="round" icon={<DownloadOutlined />}>
              播放全部
            </Button>
            <Button type="primary" shape="round" icon={<DownloadOutlined />}>
              收藏
            </Button>
            <Button type="primary" shape="round" icon={<DownloadOutlined />}>
              分享
            </Button>
            <Button type="primary" shape="round" icon={<DownloadOutlined />}>
              下载全部
            </Button>
          </div>
          <div className="tips">
            标签 :{" "}
            {songList.tags &&
              songList.tags.map((item, index) => {
                return <span key={index}>{" " + item + " "}</span>;
              })}
          </div>
          <div className="tips-song">
            <div>
              歌曲:<span>{songList.trackCount}</span>
            </div>
            <div>
              播放:<span>{" " + songList.playCount}</span>
            </div>
          </div>
          <div className="tips-desc">
            简介 : <span>{songList.description}</span>
          </div>
        </div>
      </div>
      <div className="song-tabs">
        <Tabs defaultActiveKey="1">
          <TabPane tab="歌曲列表" key="1">
            <Table columns={columns} dataSource={myList} />;
          </TabPane>
          <TabPane tab={"评论" + "(" + songList.commentCount + ")"} key="2">
            <div className="comment">
              <TextArea
                value={value}
                onChange={onChange}
                placeholder="请输入评论"
                autoSize={{ minRows: 3, maxRows: 5 }}
              />
              <div className="c-item">
                <SmileOutlined />
                <Button onClick={replyComment}>评论</Button>
              </div>
              <div className="comment-conent">
                <h3>最新评论(36)</h3>
                {comment.comments ? commentList(comment.comments) : ""}
                {/* <CommentItem /> */}
              </div>
            </div>
          </TabPane>
          <TabPane tab="收藏者" key="3">
            敬请期待...^-^
          </TabPane>
        </Tabs>
      </div>
    </div>
  );
}
