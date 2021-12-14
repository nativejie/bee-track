import { HttpType } from '..';

export interface IResponseData {
  status: number;
  responseText: string;
}
export interface IRequestData {
  httpType?: HttpType;
  url?: string;
  method?: string;
  data: any;
  startTime: number;
  endTime: number;
}

export interface IReportElementData {
  elementId?: string;
  elementStyle?: string;
  elementClassName?: string;
  elementName?: string;
  elementContent?: string;
}

export interface IReportWebStayData {
  entryTime?: number;
  closedTime?: number;
  stayTime?: number;
  aliveTime?: number;
}

export interface IReportComponentData {
  componentName?: string;
  componentStayTime?: number;
  componentAliveTime?: number;
  componentClassName?: number;
  componentVisible?: string;
  componentStyle?: string;
}

export interface IReportConsoleData {
  logType?: string;
  logArgs?: string;
}

export interface IReportExtraData
  extends IReportElementData,
    IReportWebStayData,
    IReportComponentData,
    IReportConsoleData {
  prevPage?: string;
  curPage?: string;
  pageTitle?: string;
  pointParams?: any;
  point?: string;
  xpath?: string;
  rtt?: number;
  networkType?: string;
}
export interface IReportData {
  distinctId?: string;
  trackId?: number;
  event?: string;
  trackTime?: number;
  extra?: IReportExtraData;
  appKey?: string;
  libVersion?: string;
  parentTrackId?: number;
}

export interface IHttpReportData extends IReportData {
  message?: string;
  startTime?: number;
  endTime?: number;
  time?: number;
  request?: IRequestData;
  response?: IResponseData;
}
