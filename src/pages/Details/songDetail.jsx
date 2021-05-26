import React, { useEffect, useState, useMemo } from "react";
import { Image } from "antd";
import { useDispatch } from "react-redux";
import { Button, Table, Tabs, Input } from "antd";
import { DownloadOutlined } from "@ant-design/icons";
import { SmileOutlined } from "@ant-design/icons";
import actions from "../../redux/actions";
import { useDetail, requestList } from "../../my-hooks/_request";
import Api_ from "../../api/foundMusic";
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

  const { lists } = useDetail({ id: params.id });
  const [value, setValue] = useState("");

  useEffect(() => {
    dispatch(actions.goDetail(false));
  }, []);


  const columns = [
    {
      title: "序号",
      render: (text, record, index) => `${index + 1}`,
    },
    {
      title: "音乐标题",
      dataIndex: "title",
      render: (text, record, index) => record.name,
    },
    {
      title: "歌手",
      dataIndex: "singer",
      render: (text, record, index) => record.ar[0].name,
    },
    {
      title: "专辑",
      dataIndex: "album",
      render: (text, record, index) => record.al.name,
    },
    {
      title: "时长",
      dataIndex: "time",
      render: (text, record, index) => moment(record.dt).format("MM:SS"),
    },
  ];
  const commentList = (data) => {
    return data.map((item, index) => {
      return <CommentItem {...item} key={index} />;
    });
  };
  //回复评论
  const replyComment = async () => {
    console.log("value", value);
    const res = await requestList({
      ...Api_.replyComment,
      params: {
        t: 1,
        tpye: 2,
        id: params.id,
        content: value,
        cookie: sessionStorage.getItem("cookie"),
      },
    });
    console.log("发送评论", res);
  };
  const onChange = ({ target: { value } }) => {
    setValue(value);
  };
  return (
    <div className="songDetail">
      <div className="song-top">
        <div className="img-right">
          <Image width={210} src={lists.songList.coverImgUrl} />
        </div>
        <div className="song-left">
          <div className="title">
            <div>歌单</div>
            <div>{lists.songList.name}</div>
          </div>
          <div className="time">
            <Image
              width={40}
              src={
                lists.songList.creator ? lists.songList.creator.avatarUrl : ""
              }
            />
            <div className="auth-info">
              {lists.songList.creator ? lists.songList.creator.nickname : ""}
              <span>
                {moment(lists.songList.createTime).format("yyyy-MM-DD")}创建
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
            {lists.songList.tags &&
              lists.songList.tags.map((item, index) => {
                return <span key={index}>{" " + item + " "}</span>;
              })}
          </div>
          <div className="tips-song">
            <div>
              歌曲:<span>{lists.songList.trackCount}</span>
            </div>
            <div>
              播放:<span>{" " + lists.songList.playCount}</span>
            </div>
          </div>
          <div className="tips-desc">
            简介 : <span>{lists.songList.description}</span>
          </div>
        </div>
      </div>
      <div className="song-tabs">
        <Tabs defaultActiveKey="1">
          <TabPane tab="歌曲列表" key="1">
            <Table columns={columns} dataSource={lists.songList.tracks} />;
          </TabPane>
          <TabPane
            tab={"评论" + "(" + lists.songList.commentCount + ")"}
            key="2">
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
                {lists.comment.comments
                  ? commentList(lists.comment.comments)
                  : ""}
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
