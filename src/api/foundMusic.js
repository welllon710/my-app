export default {
    banner: {
        url: '/banner',
        method: 'get'
    }, //请求轮播图
    personalized: {
        url: '/personalized?limit=9',
        method: 'get'
    }, //获取每日推荐
    privatecontent: {
        url: '/personalized/privatecontent',
        method: 'get'
    }, //获取独家放松
    personalizedNewsong: {
        url: '/personalized/newsong?limit=9',
        method: 'get'
    }, //获取最新音乐
    personalizedMv: {
        url: '/personalized/mv',
        method: 'get'
    }, //获取推荐MV

    //歌单页
    //获取歌单分类
    playlistHot: {
        url: '/playlist/hot',
        method: 'get'
    },
    highquality: {
        url: '/top/playlist/highquality?limit=50',
        method: 'get'
    },
    //获取歌单详情
    songDetail: {
        url: '/playlist/detail',
        method: 'get'
    },
    //每日歌单详情
    recommend:{
        url: '/recommend/songs'
    },
    //歌单评论
    commentList: {
        url: '/comment/playlist'
    },
    //回复评论
    replyComment: {
        url: '/comment'
    }

}