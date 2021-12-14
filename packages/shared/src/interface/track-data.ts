import { DocumentEvent, HttpType } from '..';

export interface IHttpTack {
  method: string;
  url: string;
  params?: string | Record<string, any> | ReadableStream<Uint8Array>;
  startTime: number;
  endTime?: number;
  status?: number;
  time?: number;
  responseText?: string;
  type?: HttpType;
}

export interface IDomEventTrack {
  event: DocumentEvent;
  point: string;
  xpath: string;
  params: string;
  elementProperties: Record<string, any>;
}

export interface IRouteEventTrack {
  from: string;
  to: string;
}

export interface IConsoleEventTrack {
  logType: string;
  logArgs: string;
}
