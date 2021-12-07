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
