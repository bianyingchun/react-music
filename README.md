# Reack +Hooks + Redux + Typescript 高仿网易云音乐 WebApp

## 前言

这里还有 [Vue3.0 版本](https://github.com/bianyingchun/vue3-music)

## 项目介绍

本项目将会持续维护开发中，目前实现了以下模块:

### 主题切换

通过 css 变量和 sass mixin 的结合，实现了明暗主题的切换，当然你可以定义不同的主题。

<img src="https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/407efbddb7354843adb4056c688c7326~tplv-k3u1fbpfcp-watermark.image" width="300px" alt="亮色主题">
<img src="https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/cb52079c81c54d918c5377a5fa878b46~tplv-k3u1fbpfcp-watermark.image" width="300px" alt="亮色主题">

### 登录

通过登录以体验更丰富的功能，如发表评论，点赞，关注用户，歌手，收藏歌曲，创建歌单等。在未登录状态下触及到这些功能时会自动显示登录界面，登录成功后会返回到当前页面，刷新当前用户状态。
为了共享用户状态，我将用户状态保存到 store 中，并抽离出公共逻辑 useAuth.ts

<img src="https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/7630a1ebf234440bb5c34f25165e1c9f~tplv-k3u1fbpfcp-watermark.image" width="300px" alt="亮色主题">

### 个人中心
在用户登录成功，个人中心会显示用户信息，以及个人创建和收藏的歌单， 用户可以创建、删除、编辑歌单、取消收藏的歌单。

<img src="https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/c5c024d3bf0e4cadb3ceaa1c7b3bbd63~tplv-k3u1fbpfcp-watermark.image" width="300px" alt="个人中心" ><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/ec718fabb36a45a6b5fd358961e57dae~tplv-k3u1fbpfcp-watermark.image" width="300px" alt="创建歌单">

### 播放器
播放器算是此项目中最核心的模块了。实现了一个播放器应该有的基本功能。
- 列表播放
- 插入歌曲
- 切换歌曲
- 从播放列表中删除歌曲
- 清空播放列表
- 切换播放模式
- 歌词同步
- 调整播放进度
- 添加到歌单
<img src="https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/cf13802fe9b648d3a4ce710ea50f7e2f~tplv-k3u1fbpfcp-watermark.image" width="300px">
<img src="https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/e6a4c7bceb8a44bb9af7677446f8ec0d~tplv-k3u1fbpfcp-watermark.image" width="300px" >
<img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/3948f9b150a84051a352a01a4c18c4c1~tplv-k3u1fbpfcp-watermark.image" width="300px">
<img src="https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/808c839b5e234e31aa192b2c1d10c555~tplv-k3u1fbpfcp-watermark.image" width="300px">

### 搜索
搜索页面中，实现功能的功能有
+ 搜索歌手、歌单、歌曲、用户
+ 搜索提示（函数防抖）
+ 热门搜索、历史搜索

<img src="https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/cb1298a2074049508167e407e53fa6bc~tplv-k3u1fbpfcp-watermark.image" width="300px"><img src="https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/7a253e10361a45e1ae4a2e45945a043c~tplv-k3u1fbpfcp-watermark.image" width="300px" >

### 歌单详情
在歌单页面中，可以收藏和取消收藏其他用户的歌单，点击歌曲可以播放整个歌单歌曲列表，如果是自己的歌单可以将歌曲从歌单中删除。补充：排行榜的详情页以及每日推荐其实也是歌单，只是歌曲样式稍有不同。

<img src="https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/38f1dc27c49945f5ad6a42f254636b4c~tplv-k3u1fbpfcp-watermark.image" width="300px">

### 评论
歌曲和歌单的评论是同一个组件，只是传入的参数不同。

实现的功能有
- 评论列表
- 发布评论
- 回复评论
- 查看回复列表
- 点赞评论
- 删除自己发布的评论

<img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/295b10bc5878451a8a1fba80d83615c2~tplv-k3u1fbpfcp-watermark.image" width="300px"><img src="https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/08e15f4766b448209d83b3d94d1d552c~tplv-k3u1fbpfcp-watermark.image" width="300px">

### 用户主页
<img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/3e574fb3614e4bbcbacb6ba60ad02864~tplv-k3u1fbpfcp-watermark.image" width="300px" >

### 关注/粉丝列表

<img src="https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/c966d025a23b498a89518c8d7fa16fbb~tplv-k3u1fbpfcp-watermark.image" width="300px" >

### 歌手主页
歌手主页和用户主页使用的是同一个布局组件。

<img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/404dba10e33c49288fd908601ae06229~tplv-k3u1fbpfcp-watermark.image" width="300px">

### 歌手分类
<img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/50be853ac3634f66b8bc20c7fe74f2cd~tplv-k3u1fbpfcp-watermark.image" width="300px">

### 歌单广场
 <img src="https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/ebec13ac679c4f059b97f864980a32c5~tplv-k3u1fbpfcp-watermark.image"  width="300px">

### 排行榜
 <img src="https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/22fc83be43fb4180b8801d6328f162de~tplv-k3u1fbpfcp-watermark.image" width="300px">

## 项目运行

1. 克隆到本地
   git clone https://github.com/bianyingchun/react-music.git

2. 安装依赖
   yarn install

3. 运行
   yarn serve

4. 打包
   yarn build


