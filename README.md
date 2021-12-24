<div align="center">
    <h2>Bee Track</h2>
    <p>前端埋点SDK</p>
  </div>

[![NPM](https://img.shields.io/badge/npm-7.4.0-blue)](https://https://www.npmjs.com/)
[![Code style](https://img.shields.io/badge/code%20style-prettier-ff69b4)](https://github.com/prettier/prettier)
[![build status](https://img.shields.io/badge/build-passing-brightgreen)](https://img.shields.io/badge/build-passing-brightgreen)

### 功能
+ ✅ `console`拦截
+ ✅ 路由跳转拦截
+ ✅ `http`请求拦截
+ ✅ `click`全局拦截
+ ✅ 单元测试`>70%`（待完善）
+ ✅ 浏览器`e2e`测试（待完善）


### `Web`端使用
```bash
$ yarn add @bee/track-web
```
代码引入
```javascript
import { init } from '@bee/track-web'

init({
  reportUrl: 'http://localhost:9999/track/post-data',
    appKey: 'uuid-uuid',
    debug: true,
    user: 'xxxx',
});
```
Vue引入
```javascript
import { init, VueTrack } from '@bee/track-web'

init({
  reportUrl: 'http://localhost:9999/track/post-data',
    appKey: 'uuid-uuid',
    debug: true,
    user: 'xxxx',
});

Vue.use(VueTrack)
```
可使用指令：`v-bee-track:exposure`：曝光指令，曝光范围`75%`,`v-bee-track:click`：点击指令

### 配置项

|  属性   | 类型  | 必填  | 描述  |
|  ----  | ----  | ----  | ----  |
| appKey  | string | 是  | appKey 项目唯一标识 |
| reportUrl  | string | 是 | 数据上报地址 |
| debug | boolean | 否 | 是否打印调试信息 默认`false` |
| disable | boolean | 否 | 是否禁用埋点 默认`false` |
| user | boolean | 否 | 用户相关信息 默认空|
|proxyEvent | string[]|否|代理的事件，可选`console`、`http`、`route`、`dom`, 默认不填就是所有|
|httpWhiteList | string[]| 否|拦截http请求的白名单 默认空|
|maxRecords|number|否|最大可储存的条数 - 暂时没用|

