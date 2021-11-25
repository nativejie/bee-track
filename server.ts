import express from 'express';

const TEST_SERVER_PORT = 5500;
const app = express();
// 当路由url匹配为'/'时，执行function，返回Hello World

// (app as any).use(express.static(__dirname + '/examples'));
(app as any).use('/web', express.static(__dirname + '/examples/web'));

(app as any).post('/track/report', (req, res) => {
  res.send({
    code: 2000,
    message: '上报成功',
    data: true,
  });
});
(app as any).listen(5500, () => {
  console.log(`测试服务已启动：http://[::1]:${TEST_SERVER_PORT}`);
});
