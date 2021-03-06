import {
  formatHttpStatus,
  HttpMessageEnum,
  _global,
  getTrackId,
  getLocationHref,
  isEmptyObject,
  getWindowScreen,
} from '@bee/track-utils';
import {
  IHttpReportData,
  IReportData,
  IHttpTack,
  IDomEventTrack,
  IRouteEventTrack,
  IConsoleEventTrack,
} from '@bee/track-shared';

const getBasicData = (): IReportData => {
  const curPage = getLocationHref();
  const pageTitle = 'document' in _global ? document.title : '';
  const screenInfo = getWindowScreen();
  let networkType = '';
  let rtt: number;
  if ('navigator' in _global && 'connection' in _global['navigator']) {
    rtt = (_global.navigator.connection as any).rtt;
    networkType = (_global.navigator.connection as any).effectiveType;
  }
  return {
    trackId: getTrackId(),
    trackTime: Date.now(),
    extra: {
      curPage,
      pageTitle,
      ...screenInfo,
      rtt,
      networkType,
    },
  };
};

export const consoleEventTransform = (
  data: IConsoleEventTrack,
): IReportData => {
  if (isEmptyObject(data) || !data) {
    return {};
  }
  const basicData = getBasicData();
  const { logType, logArgs } = data;
  return {
    ...basicData,
    event: 'console',
    extra: {
      ...basicData.extra,
      logType,
      logArgs,
    },
  };
};

export const routeTransform = (data: IRouteEventTrack): IReportData => {
  if (isEmptyObject(data) || !data) {
    return {};
  }
  const basicData = getBasicData();
  const { from, to } = data;
  return {
    ...basicData,
    event: 'route',
    extra: {
      ...basicData.extra,
      prevPage: from,
      curPage: to,
    },
  };
};

export const domEventTransform = (data: IDomEventTrack): IReportData => {
  if (isEmptyObject(data) || !data) {
    return {};
  }
  const basciData = getBasicData();
  const { point, xpath, params: pointParams, event, elementProperties } = data;
  return {
    ...basciData,
    event,
    extra: {
      point,
      xpath,
      pointParams,
      ...basciData.extra,
      ...elementProperties,
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
      'http????????????????????????????????????1. ?????? 2.??????????????? 3. ??????????????? 4. ?????????????????? ???';
  } else {
    message = formatHttpStatus(status);
  }
  message = message === HttpMessageEnum.Ok ? message : `${message} ${url}`;
  return {
    event: 'http',
    time,
    message,
    extra: {
      curPage,
      ...basicData.extra,
    },
    request: {
      startTime,
      endTime,
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
