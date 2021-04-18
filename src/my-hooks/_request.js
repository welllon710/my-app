import {
  useState,
  useEffect
} from "react";
import request from '../api/request'
import fontMusic from "../api/foundMusic.js";

const requestList = async (datas) => {
  const {
    url,
    method = 'get',
    data,
    params
  } = datas
  const parasms = {
    url,
    method,
    data,
    params
  }
  if (method === 'post') {
    delete parasms.params
  }
  if (method === 'get') {
    delete parasms.data
  }
  return request(parasms)

}
const useDashboard = (actived) => {

  const [bannerList, setBannerList] = useState([]),
    [list, setList] = useState([]),
    [exclusive, setExclusive] = useState([]),
    [NewSong, setNewSong] = useState([]),
    [mvList, setMvList] = useState([]),
    [state, setState] = useState(true)
  useEffect(() => {
    if (!state) {
      return false
    }
    //请求轮播图
    requestList(fontMusic.banner).then((res) => {
      const {
        banners
      } = res;
      setBannerList(banners);

    });
    //请求每日推荐
    requestList(fontMusic.personalized).then((res) => {
      const {
        result
      } = res;
      setList(result);
    });
    //获取独家放送
    requestList(fontMusic.privatecontent).then((res) => {
      const {
        result
      } = res;
      setExclusive(result);

    });
    //获取最新音乐
    requestList(fontMusic.personalizedNewsong).then((res) => {
      const {
        result
      } = res;
      setNewSong(result);

    });
    //获取推荐MV
    requestList(fontMusic.personalizedMv).then((res) => {
      const {
        result
      } = res;
      setMvList(result);

    });

  }, [state]);
  return {
    bannerList,
    list,
    exclusive,
    NewSong,
    mvList,
    setState
  }
}

const useSongList = () => {
  const [tabs, setTabs] = useState([]),
    [songLists, setSongLists] = useState(null), //
    [catVal, setCatVal] = useState('全部'), //分类
    [before, setBefore] = useState('') //上下页
  useEffect(() => {
    //获取标签
    requestList(fontMusic.playlistHot).then((res) => {
      const {
        tags
      } = res;
      setTabs(tags)
    });
  }, [])
  useEffect(() => {
    //获取全部歌单
    requestList({
      ...fontMusic.highquality,
      params: {
        cat: catVal,
        before
      }
    }).then((res) => {
      setSongLists(res)

    });
  }, [catVal])
  return {
    tabs,
    songLists,
    setCatVal,
    setBefore
  }
}
const useDetail = (id) => {
  const [songList, setSongList] = useState({})
  const [comment, setComment] = useState({})
  useEffect(() => {
    requestList({
      ...fontMusic.songDetail,
      params: {
        id
      }
    }).then((res) => {
      setSongList(res.playlist)
    });
    requestList({
      ...fontMusic.commentList,
      params: {
        id
      }
    }).then(res => {
      setComment({
        comments: res.comments,
        hotComments: res.hotComments
      })
    })
  }, [id])
  return {
    songList,
    comment
  }
}
const useEveryDay = (cookie) => {
  const [songList, setSongList] = useState([])
    useEffect(() => {
      requestList({
        ...fontMusic.recommend,
        params: {
          cookie
        }
      }).then((res) => {
        setSongList(res.data.dailySongs)

      });
    }, [cookie])
   return {
     songList
   }
}
export {
  requestList,
  useDashboard,
  useSongList,
  useDetail,
  useEveryDay

}