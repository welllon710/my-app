export default {
    banner: { url: '/banner', method: 'get' }, //请求轮播图
    personalized: { url: '/personalized?limit=9', method: 'get' }, //获取每日推荐
    privatecontent:{ url:'/personalized/privatecontent', method: 'get'} //获取独家放松
}