import React, {
  useState,
  useMemo,
  useEffect,
  useCallback,
} from "react";
import { useHistory } from "react-router-dom";
import { RightOutlined } from "@ant-design/icons";
import MySwiper from "../../../components/MySwiper";
import SquarePriture from "../../../components/picture/square-priture/square-priture";
import RectanglePriture from "../../../components/picture/rectangle-priture/rectangle-priture";
import SmallPriture from "../../../components/picture/small-priture/small-priture";
import { useWidth } from "../../../my-hooks/_width";

import "./index.scss";
export const Recommed = ({ run}) => {
  const [lists, setLists] = useState({
    bannerList: [],
    list: [],
    exclusive: [],
    NewSong: [],
    mvList: [],
  });
  let history = useHistory();
  useEffect(() => {
    run().then((res) => {
      setLists((pre) => {
        return {
          ...pre,
          bannerList: res[0].banners,
          list: res[1].result,
          exclusive: res[2].result,
          NewSong: res[3].result,
          mvList: res[4].result,
        };
      });
    });
  }, []);

  const [currentW, width] = useWidth(); //动态长度22
  const newMusic_ = JSON.parse(JSON.stringify(lists.mvList)); //不改变原数组
  const [time] = useState(() => new Date().getDate());
  let _newList = useMemo(() => {
    if (currentW <= 900) {
      newMusic_.splice(-1, 1);
      return newMusic_;
    } else {
      return lists.mvList;
    }
  }, [currentW]);

  const setMvList = () => {
    if (_newList.length > 0) {
      return _newList;
    } else {
      if (currentW <= 900) {
        newMusic_.splice(-1, 1);
        return newMusic_;
      } else {
        return lists.mvList;
      }
    }
  };
  let _newListLength = setMvList().length;

  const goDetail = useCallback((id) => {
    //推荐歌单详情
    history.push(`/dashboard/fount-music/detail/${id}`);
  }, []);
  const goEveryDay = useCallback(() => {
    //每日歌单
    history.push(`/dashboard/fount-music/every-day`);
  });
  return (
    <div className="recommend">
      <MySwiper list={lists.bannerList}></MySwiper>
      <div className="recommend-song-list">
        <h2 style={{ width: currentW }}>
          推荐歌单
          <RightOutlined />
        </h2>
        <div className="list-box" style={{ width: currentW }}>
          <SquarePriture sty={"2%"} curw={"18%"} goEveryDay={goEveryDay}>
            {time}
          </SquarePriture>
          {lists.list.map((item, index) => {
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
          {lists.exclusive.map((item, index) => {
            return (
              <RectanglePriture
                key={index}
                item={item}
                sty={"3%"}
                curw={"32%"}
                _length={3}
              />
            );
          })}
        </div>
      </div>
      {
        <div className="new-music-list">
          <h2 style={{ width: currentW }}>
            最新音乐
            <RightOutlined />
          </h2>
          <div className="list-box" style={{ width: currentW }}>
            {lists.NewSong.map((item, index) => {
              return <SmallPriture item={item} curw={"33%"} key={index} />;
            })}
          </div>
        </div>
      }
      <div className="mv-list">
        <h2 style={{ width: currentW }}>
          推荐MV
          <RightOutlined />
        </h2>
        <div className="list-box" style={{ width: currentW }}>
          {setMvList().map((item, index) => {
            return (
              <RectanglePriture
                key={index}
                item={item}
                sty={"3%"}
                curw={_newListLength === 3 ? "33%" : "22%"}
                _length={_newListLength}></RectanglePriture>
            );
          })}
        </div>
      </div>
    </div>
  );
};
