import {
  useState,
  useEffect
} from "react";
import request from "../api/request";
import fontMusic from "../api/foundMusic.js";
import API_lyric from "../api/lyric";
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
  const [lists, setLists] = useState({
    songList: {},
    playList: {},
    comment: {},
  })
  async function test() {
    const p = await requestList({
      ...fontMusic.songDetail,
      params,
    })
    let ps = p.playlist.trackIds.map(item => item.id).join()
    const c = await requestList({
      ...fontMusic.songDetailed,
      params: {
        ids: ps
      },
    });
    return {
      playList: p,
      songList: c
    }
  }
  const {
    run
  } = useRequest("", {
    manual: true,
    requestMethod: (p) =>
      Promise.all([
        test(),
        requestList({
          ...fontMusic.commentList,
          params,
        }),
      ]),
    onSuccess: (data, params) => {
      setLists((pre) => {
        return {
          ...pre,
          playList: data[0].playList,
          songList: data[0].songList,
          comment: data[1],
        };
      });
    }
  });
  return {
    run,
  };
};
const useEveryDay = (params) => {
  const [lists, setLists] = useState([])
  const {
    data
  } = useRequest('', {
    requestMethod: () => requestList({
      ...fontMusic.recommend,
      params,
    }),
    onSuccess: (data, params) => {
      setLists(data.data.dailySongs)
    }
  })
  return {
    lists
  }

};
const useHot = () => {
  const [lists, setLists] = useState([])
  const {
    run
  } = useRequest('', {
    requestMethod: () => request(fontMusic.hotSearch),
    onSuccess: (data, params) => {
      setLists(data.data)
    }
  })
  return {
    lists
  }

}
const useSearch = (isDetail = false, isD = true, pms = {}) => {
  const [slists, setsLists] = useState([]);
  const {
    run,
    cancel
  } = useRequest(({
    keyword,
    type = 1
  }) => ({
    ...fontMusic.search,
    params: {
      keywords: keyword,
      type: type
    }
  }), {
    manual: true,
    debounceInterval: isD ? 1000 : 50,
    requestMethod: (param) => requestList({
      ...param,
      ...pms
    }),
    onSuccess: (data, params) => {
      setsLists((pre) => {
        return isDetail ? data.result.songs.filter((item, index) => index <= 5) :
          data.result
      })
    },
  })
  return {
    run,
    cancel,
    slists,
    setsLists
  }
}
const useLyric = (id) => {
  //getSongComment request({ ...API_lyric.getLyric, params: { id } })
  const {
    run
  } = useRequest("", {
    manual: true,
    requestMethod: () => Promise.all([request({
      ...API_lyric.getLyric,
      params: {
        id
      }
    }), request({
      ...API_lyric.getSongComment,
      params: {
        id
      }
    })]),
  });
  return {
    run
  };
}
export {
  requestList,
  useDashboard,
  useSongList,
  useDetail,
  useEveryDay,
  useHot,
  useSearch,
  useLyric,
};