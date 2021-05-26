import {
  useState,
  useEffect
} from "react";
import request from "../api/request";
import fontMusic from "../api/foundMusic.js";

import {
  useRequest
} from "ahooks";
const requestList = async (datas) => {
  const {
    url,
    method = "get",
    data,
    params
  } = datas;
  const parasms = {
    url,
    method,
    data,
    params,
  };
  if (method === "post") {
    delete parasms.params;
  }
  if (method === "get") {
    delete parasms.data;
  }
  return request(parasms);
};
const useDashboard = () => {
  const {
    run,
    refresh
  } = useRequest("", {
    manual: true,
    requestMethod: (param) =>
      Promise.all([
        requestList(fontMusic.banner), //请求轮播图
        requestList(fontMusic.personalized), //请求每日推荐
        requestList(fontMusic.privatecontent), //获取独家放送
        requestList(fontMusic.personalizedNewsong), //获取最新音乐
        requestList(fontMusic.personalizedMv), //获取推荐MV
      ]),
  });
  return {
    run,
    refresh,
  };
};

const useSongList = () => {
  const {
    run,
    refresh
  } = useRequest((p) => p, {
    manual: true,
    requestMethod: (param) =>
      requestList({
        ...fontMusic.highquality,
        params: {
          cat: param,
        },
      }), //获取全部歌单
  });
  const {
    data
  } = useRequest("", {
    requestMethod: (param) => requestList(fontMusic.playlistHot),
  });
  return {
    runSong: run,
    refreshSong: refresh,
    tabs: () => data,
  };
};
const useDetail = (params) => {
  const {
    data
  } = useRequest('', {
    requestMethod: p => Promise.all([
      requestList({
        ...fontMusic.songDetail,
        params
      }),
      requestList({
        ...fontMusic.commentList,
        params
      })
    ])
  })
  return {
    fnDetail: () => data
  }

};
const useEveryDay = (cookie) => {
  const [songList, setSongList] = useState([]);
  useEffect(() => {
    requestList({
      ...fontMusic.recommend,
      params: {
        cookie,
      },
    }).then((res) => {
      setSongList(res.data.dailySongs);
    });
  }, [cookie]);
  return {
    songList,
  };
};
export {
  requestList,
  useDashboard,
  useSongList,
  useDetail,
  useEveryDay
};