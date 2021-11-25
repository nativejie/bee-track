export enum RequestMethod {
  POST = 'POST',
  GET = 'GET',
  DELETE = 'DELETE',
  PUT = 'PUT',
}

export enum HttpType {
  XHR = 'xhr',
  FETCH = 'fetch',
}

export enum TrackEventType {
  HTTP = 'http',
  CLICK = 'click',
  ROUTE = 'route',
  CONSOLE = 'console',
}

export type DocumentEvent = 'click' | 'blur' | 'focus';
