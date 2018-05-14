const Router = require('koa-router');
const router = new Router();
const art = require('art-template');
const path = require('path');
const config = require('./config');
const logger = require('./utils/logger');

router.get('/', async (ctx) => {
    ctx.set({
        'Content-Type': 'text/html; charset=UTF-8',
    });
    ctx.body = art(path.resolve(__dirname, './views/welcome.art'), {});
});

// bilibili
router.get('/bilibili/user/video/:uid', require('./routes/bilibili/video'));
router.get('/bilibili/user/fav/:uid', require('./routes/bilibili/fav'));
router.get('/bilibili/user/coin/:uid', require('./routes/bilibili/coin'));
router.get('/bilibili/user/dynamic/:uid', require('./routes/bilibili/dynamic'));
router.get('/bilibili/user/followers/:uid', require('./routes/bilibili/followers'));
router.get('/bilibili/user/followings/:uid', require('./routes/bilibili/followings'));
router.get('/bilibili/partion/:tid', require('./routes/bilibili/partion'));
router.get('/bilibili/bangumi/:seasonid', require('./routes/bilibili/bangumi'));
router.get('/bilibili/video/reply/:aid', require('./routes/bilibili/reply'));
router.get('/bilibili/link/news/:product', require('./routes/bilibili/linkNews'));
router.get('/bilibili/live/room/:roomID', require('./routes/bilibili/liveRoom'));
router.get('/bilibili/live/search/:key/:order', require('./routes/bilibili/liveSearch'));
router.get('/bilibili/live/area/:areaID/:order', require('./routes/bilibili/liveArea'));

// 微博
router.get('/weibo/user/:uid', require('./routes/weibo/user'));
router.get('/weibo/user2/:uid', require('./routes/weibo/user2'));
router.get('/weibo/keyword/:keyword', require('./routes/weibo/keyword'));

// 网易云音乐
router.get('/ncm/playlist/:id', require('./routes/ncm/playlist'));
router.get('/ncm/user/playlist/:uid', require('./routes/ncm/userplaylist'));
router.get('/ncm/artist/:id', require('./routes/ncm/artist'));

// 掘金
router.get('/juejin/category/:category', require('./routes/juejin/category'));

// 自如
router.get('/ziroom/room/:city/:iswhole/:room/:keyword', require('./routes/ziroom/room'));

// 快递
router.get('/express/:company/:number', require('./routes/express/express'));

// 简书
router.get('/jianshu/home', require('./routes/jianshu/home'));
router.get('/jianshu/trending/weekly', require('./routes/jianshu/weekly'));
router.get('/jianshu/trending/monthly', require('./routes/jianshu/monthly'));
router.get('/jianshu/collection/:id', require('./routes/jianshu/collection'));
router.get('/jianshu/user/:id', require('./routes/jianshu/user'));

// 知乎
router.get('/zhihu/collection/:id', require('./routes/zhihu/collection'));
router.get('/zhihu/people/activities/:id', require('./routes/zhihu/activities'));
router.get('/zhihu/people/answers/:id', require('./routes/zhihu/answers'));
router.get('/zhihu/zhuanlan/:id', require('./routes/zhihu/zhuanlan'));

// 贴吧
router.get('/tieba/forum/:kw', require('./routes/tieba/forum'));

// 妹子图
router.get('/mzitu', require('./routes/mzitu/category'));
router.get('/mzitu/tags', require('./routes/mzitu/tags'));
router.get('/mzitu/category/:category', require('./routes/mzitu/category'));
router.get('/mzitu/post/:id', require('./routes/mzitu/post'));
router.get('/mzitu/tag/:tag', require('./routes/mzitu/tag'));

// pixiv
if (config.pixiv && config.pixiv.client_id && config.pixiv.client_secret && config.pixiv.username && config.pixiv.password) {
    router.get('/pixiv/user/bookmarks/:id', require('./routes/pixiv/bookmarks'));
    router.get('/pixiv/user/:id/', require('./routes/pixiv/user'));
    router.get('/pixiv/ranking/:mode/:date?', require('./routes/pixiv/ranking'));
} else {
    logger.warn('pixiv RSS is disabled for lacking config.');
}

// 豆瓣
router.get('/douban/movie/playing', require('./routes/douban/playing'));
router.get('/douban/movie/playing/:score', require('./routes/douban/playing'));
router.get('/douban/movie/playing/:score/:city', require('./routes/douban/playing'));
router.get('/douban/movie/later', require('./routes/douban/later'));
router.get('/douban/movie/ustop', require('./routes/douban/ustop'));

// 煎蛋
router.get('/jandan/pic', require('./routes/jandan/pic'));

// 喷嚏
router.get('/dapenti/tugua', require('./routes/dapenti/tugua'));

// Dockone
router.get('/dockone/weekly', require('./routes/dockone/weekly'));

// 腾讯吐个槽
router.get('/tucaoqq/post/:project/:key', require('./routes/tucaoqq/post'));

// 笔趣阁
router.get('/biquge/novel/latestchapter/:id', require('./routes/biquge/chapter'));

// 开发者头条
router.get('/toutiao/today', require('./routes/toutiao/today'));
router.get('/toutiao/user/:id', require('./routes/toutiao/user'));

// Disqus
if (config.disqus && config.disqus.api_key) {
    router.get('/disqus/posts/:forum', require('./routes/disqus/posts'));
} else {
    logger.warn('Disqus RSS is disabled for lacking config.');
}

// Twitter
if (config.twitter && config.twitter.consumer_key && config.twitter.consumer_secret && config.twitter.access_token && config.twitter.access_token_secret) {
    router.get('/twitter/user/:id', require('./routes/twitter/user'));
} else {
    logger.warn('Twitter RSS is disabled for lacking config.');
}

// Instagram
router.get('/instagram/user/:id', require('./routes/instagram/user'));

// Youtube
if (config.youtube && config.youtube.key) {
    router.get('/youtube/user/:username', require('./routes/youtube/user'));
    router.get('/youtube/channel/:id', require('./routes/youtube/channel'));
} else {
    logger.warn('Youtube RSS is disabled for lacking config.');
}

// 即刻
router.get('/jike/topic/:id', require('./routes/jike/topic'));
router.get('/jike/user/:id', require('./routes/jike/user'));

module.exports = router;