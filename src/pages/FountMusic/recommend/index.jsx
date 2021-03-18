import React, { useState, useMemo, useEffect, memo, useRef } from "react";
import { useHistory } from "react-router-dom";
import { RightOutlined } from "@ant-design/icons";
import MySwiper from "../../../components/MySwiper";
import SquarePriture from "../../../components/picture/square-priture";
import RectanglePriture from "../../../components/picture/rectangle-priture";
import SmallPriture from "../../../components/picture/small-priture";
import { useWidth } from "../../../my-hooks/_width";
import myRequest from "../../../my-hooks/_request";
import fontMusic from "../../../api/foundMusic.js";
import "./index.scss";
export default memo(function Recommed() {
  const [list, setList] = useState([]);
  const [exclusive, setExclusive] = useState([]);
  const [mv, setMv] = useState([
    {
      text: "mv8号",
    },
    {
      text: "mv9号",
    },
    {
      text: "mv10号",
    },
  ]);
  const [newMusic, setNewMusic] = useState([
    {
      text: "mv10号",
    },
    {
      text: "mv8号",
    },
    {
      text: "mv9号",
    },
    {
      text: "mv10号",
    },
  ]);
  //简化版请求 --参考vue minix

  const [currentW, width] = useWidth(); //动态长度22
  let history = useHistory();
  const newMusic_ = JSON.parse(JSON.stringify(newMusic)); //不改变原数组
  let _newList = useMemo(() => {
    if (currentW <= 900) {
      newMusic_.splice(-1, 1);
      return newMusic_;
    } else {
      return newMusic;
    }
  }, [currentW]);
  const [bannerList, setBannerList] = useState([]);
  useEffect(() => {
    //请求轮播图
    myRequest(fontMusic.banner).then((res) => {
      const { banners } = res;
      setBannerList(banners);
    });
    //请求每日推荐
    myRequest(fontMusic.personalized).then((res) => {
      const { result } = res;
      setList(result);
    });
    //获取独家放送
    myRequest(fontMusic.privatecontent).then((res) => {
      const { result } = res;
      setExclusive(result);
    });
  }, []);
  let _newListLength = _newList.length;
  const _length = list.length;
  const goDetail = (data) => {
    //路由跳转
    console.log("我是父亲", history);
    history.push("/dashboard/details");
  };
  return (
    <div className="recommend">
      <MySwiper list={bannerList}></MySwiper>
      <div className="recommend-song-list">
        <h2 style={{ width: currentW }}>
          推荐歌单
          <RightOutlined />
        </h2>
        <div className="list-box" style={{ width: currentW }}>
          <SquarePriture sty={"2%"} curw={"18%"} goDetails={goDetail} />
          {list.map((item, index) => {
            {
              return index + 2 === 5 ? (
                <SquarePriture
                  key={index}
                  item={item}
                  sty={"0px"}
                  curw={"18%"}
                  goDetails={goDetail}
                />
              ) : (
                <SquarePriture
                  key={index}
                  item={item}
                  sty={"2%"}
                  curw={"18%"}
                  goDetails={goDetail}
                />
              );
            }
          })}
        </div>
      </div>
      <div className="exclusive-list">
        <h2 style={{ width: currentW }}>
          独家放送
          <RightOutlined />
        </h2>
        <div className="list-box" style={{ width: currentW }}>
          {exclusive.map((item, index) => {
            return (
              <RectanglePriture
                key={index}
                item={item}
                sty={"3%"}
                curw={"32%"}
                _length={3}></RectanglePriture>
            );
          })}
        </div>
      </div>
      {/* <div className="new-music-list">
        <h2 style={{ width: currentW }}>
          最新音乐
          <RightOutlined />
        </h2>
        <div className="list-box" style={{ width: currentW }}>
          {list.map((item, index) => {
            return (
              <SmallPriture
                text={item.text}
                curw={"33%"}
                key={index}></SmallPriture>
            );
          })}
        </div>
      </div> */}
      {/* <div className="mv-list">
        <h2 style={{ width: currentW }}>
          推荐MV
          <RightOutlined />
        </h2>
        <div className="list-box" style={{ width: currentW }}>
          {_newList.map((item, index) => {
            return (
              <RectanglePriture
                key={index}
                text={item.text}
                sty={"3%"}
                curw={_newListLength === 3 ? "33%" : "22%"}
                _length={_newListLength}></RectanglePriture>
            );
          })}
        </div>
      </div> */}
    </div>
  );
});
