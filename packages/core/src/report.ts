import {
  ITackOptions,
  IReportData,
  RequestMethod,
  IHttpReportData,
  LIB_VERSION,
} from '@bee/track-shared';
import {
  logger,
  isBrowserEnv,
  _global,
  isString,
  _extra,
  AES,
  isObject,
} from '@bee/track-utils';

export class Report {
  private reportUrl = '';
  private appKey = '';
  private distinctId = '';

  // 后期多链接 需要改成域名判断
  isReportUrl(traget: string) {
    if (traget === this.reportUrl) {
      return true;
    }
    return false;
  }

  async setting(options: ITackOptions) {
    const { reportUrl, appKey, user } = options;
    this.reportUrl = reportUrl;
    this.appKey = appKey;
    this.distinctId = AES(isObject(user) ? JSON.stringify(user) : user);
  }

  imgSend(data: IReportData): void {
    let img = new Image();
    img.src = `${this.reportUrl}?data=${encodeURIComponent(
      JSON.stringify(data),
    )}`;
    img = null;
  }

  xhrPost(data: IReportData): void {
    const xhr = new XMLHttpRequest();
    xhr.open(RequestMethod.POST, this.reportUrl);
    xhr.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');
    xhr.withCredentials = true;
    xhr.send(JSON.stringify(data));
  }

  browserPost(data: IReportData): void {
    const stringifyData = !isString(data) ? JSON.stringify(data) : data;
    if (
      'navigator' in _global &&
      'sendBeacon' in navigator &&
      stringifyData.length < 65536
    ) {
      const blob = new Blob([stringifyData], {
        type: 'application/json',
      });
      navigator.sendBeacon(this.reportUrl, blob);
    } else {
      this.xhrPost(data);
    }
  }

  beforeSend(data: IReportData) {
    data.distinctId = this.distinctId;
    data.appKey = this.appKey;
    data.libVersion = LIB_VERSION;
    return data;
  }

  send(data: IReportData | IHttpReportData): void {
    if (!this.reportUrl) {
      logger.error('report url can not be empty');
      return;
    }
    if (!this.appKey) {
      logger.error('appkey can not be empty');
      return;
    }
    const result = this.beforeSend(data);
    if (isBrowserEnv) {
      return this.browserPost(result);
    }
  }
}

const report = (_extra.report || (_extra.report = new Report())) as Report;

export { report };
