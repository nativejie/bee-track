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
}
