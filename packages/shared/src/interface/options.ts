export interface ITackOptions {
  /**
   * appKey 项目唯一标识
   */
  appKey: string;

  /**
   * 上报地址
   */
  reportUrl: string;

  /**
   * 是否打印调试信息
   */
  debug?: boolean;

  /**
   * 是否禁用
   */
  disable?: boolean;

  /**
   * 用户信息
   */
  user?: string;

  /**
   * 代理路由
   */
  routeProxy?: boolean;

  /**
   * 代理DOM事件
   */
  domEventProxy?: boolean;

  /**
   * 代理http请求
   */
  httpProxy?: boolean;
}
