# Duel - 手势游戏
## 简介
一个基于`Vue`、`Express`和`MongoDB`的`PWA游戏应用`。
该游戏基于中国青少年广传的回合制“手”游，基本玩法定义如下：
> 该游戏由两方或三方以上参加。
> 每回合所有玩家同时打出一种手势，手势需符合规则。
> 手势一共三种：攻击手势、防御手势和积攒能量手势。
> 攻击手势消耗0或不等的能量，对应不同等级的攻击，高等级攻击胜低等级攻击。
> 防御手势消耗0或不等的能量，能抵御不同等级以下攻击，对积攒能量则无效果。
> 积攒能量手势使玩家在本回合获得1点能量，积攒能量时被攻击则告负。
> 三方以上对战时，只要有一个对手出了胜己的手势亦告负，告负的回合自己的手势仍可以战胜他人。
> 玩家告负的回合立刻退出游戏。
> 当剩余最后一个玩家未负则宣告该玩家的胜利，游戏机制保证不存在平局情况。
*由于各地玩法繁杂，详细规则可能会与用户以前玩的有所不同，将简单测试平衡采取合适玩法。*

## 预定功能
> 网页账户注册
> 在线游戏对战
> 游戏成绩记录

## 更新记录
### 2018.6.8
数据库存储每个用户的账号密码，对局胜率，段位，历史对局记录
桌面端和PC端页面分离
'/': 展示分数榜: ID、积分，未登录时唯一可访问的位置。展示个人信息（如果登录了的话）:ID、胜率、胜场、负场、积分、段位。

### 2018.6.1
儿童节更新

### 2018.5.14
token功能测试
MongoDB功能构建
修改token签发位置

### 2018.5.9
增添游戏定义。
划分功能模块：
Vue负责非游戏部分的前端交互，颁发token
Express负责后端API和游戏时数据处理，及游戏部分的渲染和交互
MongoDB存储用户非游戏时数据。

### 2018.5.8
创建 README.md
