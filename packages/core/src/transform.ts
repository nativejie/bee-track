import {
  formatHttpStatus,
  HttpMessageEnum,
  _global,
  getTrackId,
  getLocationHref,
  isEmptyObject,
} from '@bee/track-utils';
import {
  IHttpReportData,
  IReportData,
  IHttpTack,
  IDomEventTrack,
} from '@bee/track-shared';

const getBasicData = (): IReportData => {
  const curPage = getLocationHref();
  const pageTitle = 'document' in _global ? document.title : '';
  return {
    trackId: getTrackId(),
    trackTime: Date.now(),
    extra: {
      curPage,
      pageTitle,
    },
  };
};

export const domEventTransform = (data: IDomEventTrack): IReportData => {
  if (isEmptyObject(data) || !data) {
    return {};
  }
  const basciData = getBasicData();
  const { point, xpath, params, event } = data;
  return {
    ...basciData,
    event,
    extra: {
      point,
      xpath,
      params,
      ...basciData.extra,
    },
  };
};

export const httpTransform = (data: IHttpTack): IHttpReportData => {
  if (isEmptyObject(data) || !data) {
    return {};
  }
  const curPage = getLocationHref();
  const basicData = getBasicData();
  const {
    method,
    endTime,
    startTime,
    time,
    status,
    responseText,
    url,
    params,
    type,
  } = data;
  let message = '';
  if (status === 0) {
    message =
      'http请求失败，可能失败原因：1. 跨域 2.服务器限制 3. 防火墙限制 4. 网络出现问题 等';
  } else {
    message = formatHttpStatus(status);
  }
  message = message === HttpMessageEnum.Ok ? message : `${message} ${url}`;
  return {
    event: 'http',
    time,
    startTime,
    endTime,
    message,
    extra: {
      curPage,
      ...basicData.extra,
    },
    request: {
      httpType: type,
      method,
      url,
      data: params || '',
    },
    response: {
      status,
      responseText,
    },
    ...basicData,
  };
};
