import { DocumentEvent, HttpType } from '..';

export interface IHttpTack {
  method: string;
  url: string;
  params?: string | ReadableStream<Uint8Array>;
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
}
