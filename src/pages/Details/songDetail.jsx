import React, { useState, memo, useEffect, useMemo } from "react";
import { Image } from "antd";
import { Button, Table, Tabs, Input } from "antd";
import { DownloadOutlined } from "@ant-design/icons";
import { SmileOutlined } from "@ant-design/icons";
import { useDetail, requestList } from "../../my-hooks/_request";
import { useHeight } from "../../my-hooks/useHeight";
import Api_ from "../../api/foundMusic";
import CommentItem from "../../components/comment/comment";
import moment from "moment";
import "./songDetail.scss";
import actions from "../../redux/actions";
import { useDispatch } from "react-redux";
const { TabPane } = Tabs;
const { TextArea } = Input;
export default memo(function SongDetail(props) {
  const {
    match: { params },
  } = props;
  useHeight();
  const dispatch = useDispatch();
  const { run } = useDetail({ id: params.id });
  const [songD, setSongD] = useState({})
  const [songL, setSongL] = useState([]);
  const [comList, setComList] = useState({
    hot: [],
    coms:[]
  });
  useEffect(() => {
    run().then(res => {
      console.log('res',res);
      setSongD(res[0].playList.playlist);
      setSongL(res[0].songList.songs);
      setComList({
        hot: res[1].hotComments,
        coms: res[1].comments,
      });
    });
   
  }, [])
  const [value, setValue] = useState("");
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
      render: (text, record, index) => moment(record.dt).format("mm:ss"),
    },
  ];
  const commentList = (data) => {
    return data.map((item, index) => {
      return <CommentItem {...item} key={index} />;
    });
  };
  //回复评论
  const replyComment = async () => {
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
  };
  const onChange = ({ target: { value } }) => {
    setValue(value);
  };
  //点击当前行
  const rowClick = (row, i) => {
    dispatch(actions.savePlayList({ data: songL, i })); // 传到redux
    dispatch(actions.currentMusic(row));
  };
  return (
    <div className="songDetail">
      <div className="song-top">
        <div className="img-right">
          <Image width={210} src={songD.coverImgUrl} />
        </div>
        <div className="song-left">
          <div className="title">
            <div>歌单</div>
            <div>{songD.name}</div>
          </div>
          <div className="time">
            <Image
              width={40}
              src={songD.creator ? songD.creator.avatarUrl : ""}
            />
            <div className="auth-info">
              {songD.creator ? songD.creator.nickname : ""}
              <span>{moment(songD.createTime).format("yyyy-MM-DD")}创建</span>
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
            {songD.tags &&
              songD.tags.map((item, index) => {
                return <span key={index}>{" " + item + " "}</span>;
              })}
          </div>
          <div className="tips-song">
            <div>
              歌曲:<span>{songD.trackCount}</span>
            </div>
            <div>
              播放:<span>{" " + songD.playCount}</span>
            </div>
          </div>
          <div className="tips-desc">
            简介 : <span>{songD.description}</span>
          </div>
        </div>
      </div>
      <div className="song-tabs">
        <Tabs defaultActiveKey="1">
          <TabPane tab="歌曲列表" key="1">
            <Table
              columns={columns}
              rowKey={(record) => record.id}
              dataSource={songL}
              onRow={(record, index) => ({
                onDoubleClick: (event) => rowClick(record, index),
              })}
            />
          </TabPane>
          <TabPane tab={"评论" + "(" + songD.commentCount + ")"} key="2">
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
                {commentList(comList.coms)}
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
   
  
});
