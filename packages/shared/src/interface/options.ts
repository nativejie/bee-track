export type ProxyType = 'dom' | 'http' | 'console' | 'route';
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
   * 代理的事件
   */
  proxyEvent: ProxyType[];

  /**
   * 拦截http请求的白名单
   */
  httpWhiteList: string[];

  /**
   * 最大存储条数
   */
  maxRecords?: number;
}
