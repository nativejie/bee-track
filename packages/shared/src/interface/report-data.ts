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
}

export interface IReportExtraData {
  formPage?: string;
  curPage?: string;
  pageTitle?: string;
  params?: any;
  point?: string;
  xpath?: string;
}
export interface IReportData {
  distinctId?: string;
  trackId?: number;
  event?: string;
  trackTime?: number;
  extra?: IReportExtraData;
  appKey?: string;
}

export interface IHttpReportData extends IReportData {
  message?: string;
  startTime?: number;
  endTime?: number;
  time?: number;
  request?: IRequestData;
  response?: IResponseData;
}
