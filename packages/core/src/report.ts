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
  isObject,
  getCookie,
  uuid,
} from '@bee/track-utils';
import { record } from '.';

export class Report {
  private reportUrl = '';
  private appKey = '';
  private distinctId = '';
  private user = '';
  private httpWhiteList = [];

  // 后期多链接 需要改成域名判断
  isReportUrl(traget: string) {
    if (traget === this.reportUrl) {
      return true;
    }
    return false;
  }

  isWhiteList(url: string) {
    if (this.httpWhiteList.length >>> 0 === 0) {
      return true;
    }
    const domain = (url.split('/') || [])[2];
    if (domain && this.httpWhiteList.includes(domain)) {
      return true;
    }
    return false;
  }

  async setting(options: ITackOptions) {
    const { reportUrl, appKey, user, httpWhiteList } = options;
    this.reportUrl = reportUrl;
    this.appKey = appKey;
    this.user = user;
    this.httpWhiteList = httpWhiteList || [];
    this.distinctId = this.getDistinctId();
  }

  getDistinctId(): string {
    if (this.user) {
      return isObject(this.user) ? JSON.stringify(this.user) : this.user;
    }
    const eid = getCookie('EID');
    if (eid) {
      return eid;
    }
    const storeDistinctId = localStorage.getItem('distinct_id');
    if (storeDistinctId) {
      return storeDistinctId;
    } else {
      const uid = uuid();
      localStorage.setItem('distinct_id', uid);
      return uid;
    }
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
    data.parentTrackId = record.getParentId(data.trackId);
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
